-- ============================================
-- WaschExpress - Minimal Production Schema
-- ============================================

create extension if not exists "pgcrypto";

-- =========================
-- CUSTOMERS
-- =========================
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  created_at timestamptz default now()
);

-- =========================
-- JOBS (QUEUE)
-- =========================
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,

  kilos numeric(6,1) not null,
  service_type text not null check (service_type in ('regular','express')),

  status text not null check (status in ('queued','processing','done','cancelled')) default 'queued',

  started_at timestamptz,
  finished_at timestamptz,

  processing_slot_min integer not null,
  post_process_min integer,

  priority integer not null default 0, -- express handled in code

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================
-- ML PREDICTION LOGS (OPTIONAL)
-- =========================
create table if not exists predictions (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade,
  input jsonb not null,
  output jsonb not null,
  model_version text,
  created_at timestamptz default now()
);

-- =========================
-- AUTO UPDATE TIMESTAMP
-- =========================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_jobs_updated_at on jobs;
create trigger trg_jobs_updated_at
before update on jobs
for each row
execute procedure set_updated_at();

-- =========================
-- STAFF ROLE HELPER
-- =========================
create or replace function is_staff()
returns boolean language sql immutable as $$
  select coalesce(current_setting('request.jwt.claim.role', true), '') = 'staff';
$$;

-- =========================
-- REMAINING TIME CALCULATION
-- =========================
create or replace function job_remaining_minutes(j jobs)
returns integer language sql immutable as $$
  select case
    when j.status = 'processing' and j.started_at is not null then
      greatest(
        0,
        (j.processing_slot_min - floor(extract(epoch from (now() - j.started_at)) / 60))::int
      )
    when j.status = 'queued' then
      j.processing_slot_min
    else 0
  end;
$$;

-- =========================
-- DROP VIEWS (SAFE RESET)
-- =========================
drop view if exists current_queue cascade;
drop view if exists queue_summary cascade;

-- =========================
-- QUEUE VIEWS
-- =========================

-- Full queue for backend
create view current_queue as
select
  id,
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

-- Aggregated queue for public usage
create view queue_summary as
select
  count(*) as queue_length,
  round(avg(processing_slot_min)::numeric, 0) as avg_processing_slot,
  coalesce(
    min(job_remaining_minutes(jobs.*)) filter (where status = 'processing'),
    0
  ) as current_job_remaining,
  now() as snapshot_at
from jobs
where status in ('queued','processing');

-- =========================
-- ENABLE RLS
-- =========================
alter table customers enable row level security;
alter table jobs enable row level security;
alter table predictions enable row level security;

-- =========================
-- RLS CLEAN RESET
-- =========================
drop policy if exists "customer_select_own" on customers;
drop policy if exists "customer_update_own" on customers;
drop policy if exists "staff_insert_customer" on customers;

drop policy if exists "customer_insert_own_job" on jobs;
drop policy if exists "customer_select_own_jobs" on jobs;
drop policy if exists "customer_update_own_jobs" on jobs;
drop policy if exists "staff_all_jobs" on jobs;

drop policy if exists "staff_all_predictions" on predictions;
drop policy if exists "service_insert_predictions" on predictions;

-- =========================
-- CUSTOMERS RLS
-- =========================
create policy "customer_select_own" on customers
for select
using (auth.uid() = id or is_staff());

create policy "customer_update_own" on customers
for update
using (auth.uid() = id or is_staff())
with check (auth.uid() = id or is_staff());

create policy "staff_insert_customer" on customers
for insert
to authenticated
with check (is_staff());

-- =========================
-- JOBS RLS
-- =========================
create policy "customer_insert_own_job" on jobs
for insert
to authenticated
with check (customer_id = auth.uid());

create policy "customer_select_own_jobs" on jobs
for select
using (customer_id = auth.uid() or is_staff());

create policy "customer_update_own_jobs" on jobs
for update
using (customer_id = auth.uid())
with check (customer_id = auth.uid());

create policy "staff_all_jobs" on jobs
for all
using (is_staff())
with check (is_staff());

-- =========================
-- PREDICTIONS RLS
-- =========================
create policy "staff_all_predictions" on predictions
for all
using (is_staff())
with check (is_staff());

create policy "service_insert_predictions" on predictions
for insert
to service_role
with check (true);
