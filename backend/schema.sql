-- ============================================
-- Minimal WaschExpress schema (no machines, no weather table)
-- ============================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- -------------------------
-- Customers
-- -------------------------
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  email text,
  created_at timestamptz default now()
);

-- -------------------------
-- Jobs (main queue table)
-- -------------------------
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,

  kilos numeric(6,1) not null,
  service_type text not null check (service_type in ('regular','express')),
  pickup boolean default false,

  arrival_time timestamptz not null default now(),
  status text not null check (status in ('queued','processing','done','cancelled')) default 'queued',

  started_at timestamptz,
  finished_at timestamptz,

  processing_slot_min integer,         -- deterministic from kilos
  estimated_wash_time_min integer,     -- optional, for logging
  actual_wash_time_min integer,        -- optional, for logging
  post_process_min integer,            -- optional, for logging

  priority integer default 0,          -- express > regular

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- updated_at trigger
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_jobs_updated_at on jobs;
create trigger trg_jobs_updated_at
before update on jobs
for each row
execute procedure set_updated_at();

-- -------------------------
-- Predictions (model logs)
-- -------------------------
create table if not exists predictions (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete set null,
  input jsonb not null,
  output jsonb not null,
  model_version text,
  created_at timestamptz default now()
);

-- -------------------------
-- Role helper: is_staff()
-- -------------------------
create or replace function is_staff() returns boolean
language sql immutable as $$
  select coalesce(current_setting('request.jwt.claim.role', true), '') = 'staff';
$$;

-- -------------------------
-- Remaining time helper
-- -------------------------
create or replace function job_remaining_minutes(j jobs) returns integer
language sql immutable as $$
  select case
    when j.status = 'processing' and j.started_at is not null then
      greatest(
        0,
        (j.processing_slot_min - floor(extract(epoch from (now() - j.started_at))/60))::int
      )
    when j.status = 'queued' then
      coalesce(j.processing_slot_min, 0)::int
    else 0
  end;
$$;

-- -------------------------
-- Views
-- -------------------------

-- Ordered queue with remaining minutes
create or replace view public.current_queue as
select
  id,
  customer_id,
  kilos,
  service_type,
  status,
  started_at,
  processing_slot_min,
  priority,
  created_at,
  job_remaining_minutes(jobs.*) as remaining_minutes
from jobs
where status in ('queued','processing')
order by priority desc, created_at asc;

-- Aggregate queue summary
create or replace view public.queue_summary as
select
  count(*) filter (where status in ('queued','processing')) as queue_length,
  round(avg(processing_slot_min)::numeric, 0) as avg_processing_slot,
  coalesce(
    min(job_remaining_minutes(jobs.*)) filter (where status = 'processing'),
    0
  ) as current_job_remaining,
  now() as snapshot_at
from jobs
where status in ('queued','processing');

-- -------------------------
-- Enable RLS
-- -------------------------
alter table customers enable row level security;
alter table jobs enable row level security;
alter table predictions enable row level security;

-- Clean up old policies if they exist (safe to ignore errors)
drop policy if exists "customer_select_own" on customers;
drop policy if exists "customer_update_own" on customers;
drop policy if exists "staff_insert_customer" on customers;
drop policy if exists "customer_insert_own_job" on jobs;
drop policy if exists "customer_select_own_jobs" on jobs;
drop policy if exists "customer_update_own_jobs" on jobs;
drop policy if exists "staff_all_jobs" on jobs;
drop policy if exists "staff_all_predictions" on predictions;
drop policy if exists "service_insert_predictions" on predictions;

-- -------------------------
-- Customers RLS (minimal)
-- -------------------------

-- Customers can read their own profile, staff can read all
create policy "customer_select_own" on customers
for select
using (auth.uid() = id or is_staff());

-- Customers can update their own profile, staff can update all
create policy "customer_update_own" on customers
for update
using (auth.uid() = id or is_staff())
with check (auth.uid() = id or is_staff());

-- Optional: staff can insert customers (for manual registration)
create policy "staff_insert_customer" on customers
for insert
to authenticated
with check (is_staff());

-- -------------------------
-- Jobs RLS (minimal)
-- -------------------------

-- Customers can insert jobs only for themselves
create policy "customer_insert_own_job" on jobs
for insert
to authenticated
with check (customer_id = auth.uid());

-- Customers can read only their own jobs, staff can read all
create policy "customer_select_own_jobs" on jobs
for select
using (customer_id = auth.uid() or is_staff());

-- Customers can update only their own jobs
create policy "customer_update_own_jobs" on jobs
for update
using (customer_id = auth.uid())
with check (customer_id = auth.uid());

-- Staff can do anything with jobs
create policy "staff_all_jobs" on jobs
for all
using (is_staff())
with check (is_staff());

-- -------------------------
-- Predictions RLS (minimal)
-- -------------------------

-- Staff can do anything with predictions
create policy "staff_all_predictions" on predictions
for all
using (is_staff())
with check (is_staff());

-- Backend with service_role can insert prediction logs
create policy "service_insert_predictions" on predictions
for insert
to service_role
with check (true);
