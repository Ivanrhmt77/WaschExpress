-- ====================================================
-- WaschExpress Database Schema
-- ====================================================

-- UUID extension
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
-- Machines
-- -------------------------
create table if not exists machines (
  id uuid primary key default gen_random_uuid(),
  machine_type text not null check (machine_type in ('washer','dryer')),
  name text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- -------------------------
-- Jobs (Main queue table)
-- -------------------------
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,

  kilos numeric(6,1) not null,
  service_type text not null check (service_type in ('regular','express')),

  arrival_time timestamptz not null default now(),
  status text not null check (status in ('queued','processing','done','cancelled')) default 'queued',

  assigned_machine_id uuid references machines(id) on delete set null,

  started_at timestamptz,
  finished_at timestamptz,

  processing_slot_min integer,
  estimated_wash_time_min integer,
  actual_wash_time_min integer,
  post_process_min integer,

  priority integer default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- update timestamp
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger trg_jobs_updated_at before update on jobs for each row execute procedure set_updated_at();

-- -------------------------
-- Predictions
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
-- Weather logs
-- -------------------------
create table if not exists weather_logs (
  id uuid primary key default gen_random_uuid(),
  recorded_at timestamptz default now(),
  location text,
  weather text,
  raw jsonb
);

-- -------------------------
-- Helper: check staff role
-- -------------------------
create or replace function is_staff() returns boolean language sql immutable as $$
  select coalesce(current_setting('request.jwt.claim.role', true), '') = 'staff';
$$;

-- -------------------------
-- Remaining time function
-- -------------------------
create or replace function job_remaining_minutes(j jobs) returns integer language sql immutable as $$
  select case
    when j.status = 'processing' and j.started_at is not null then
      greatest(0, (j.processing_slot_min - floor(extract(epoch from (now() - j.started_at))/60))::int)
    when j.status = 'queued' then
      coalesce(j.processing_slot_min, 0)::int
    else 0 end;
$$;

-- -------------------------
-- Views
-- -------------------------
create or replace view public.current_queue as
select
  id,
  customer_id,
  kilos,
  service_type,
  status,
  assigned_machine_id,
  started_at,
  processing_slot_min,
  priority,
  created_at,
  job_remaining_minutes(jobs.*) as remaining_minutes
from jobs
where status in ('queued','processing')
order by priority desc, created_at asc;

create or replace view public.queue_summary as
select
  count(*) filter (where status in ('queued','processing')) as queue_length,
  round(avg(processing_slot_min)::numeric,0) as avg_processing_slot,
  coalesce(min(job_remaining_minutes(jobs.*)) filter (where status='processing'), 0) as current_job_remaining,
  now() as snapshot_at
from jobs
where status in ('queued','processing');

-- -------------------------
-- RLS Enable
-- -------------------------
alter table customers enable row level security;
alter table jobs enable row level security;
alter table predictions enable row level security;
alter table weather_logs enable row level security;

-- -------------------------
-- RLS: Customers
-- -------------------------
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

-- -------------------------
-- RLS: Jobs
-- -------------------------
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

-- -------------------------
-- RLS: Predictions
-- -------------------------
create policy "staff_all_predictions" on predictions
for all
using (is_staff())
with check (is_staff());

create policy "service_insert_predictions" on predictions
for insert
to service_role
with check (true);

-- -------------------------
-- RLS: Weather Logs
-- -------------------------
create policy "public_read_weather" on weather_logs
for select
using (true);

create policy "staff_manage_weather" on weather_logs
for all
using (is_staff())
with check (is_staff());

-- DONE
