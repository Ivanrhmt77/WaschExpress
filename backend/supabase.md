
# WaschExpress – Smart Laundry ETA System

WaschExpress is an end-to-end system that predicts laundry completion time using machine learning (TensorFlow.js), Supabase as backend storage, and a secure queue management design built around Row Level Security (RLS).

This repository includes:

- Supabase database schema  
- Secure RLS policies  
- Queue handling logic  
- Weather & prediction logging  
- ML model feature builder specification  
- How to run everything locally or in production  

---

# Table of Contents

1. Overview  
2. Architecture  
3. Supabase Setup  
4. Database Schema  
5. Row Level Security (RLS)  
6. Queue System  
7. ML Feature Builder  
8. Backend API Endpoints  
9. Local Development  
10. Deployment Notes  
11. How to Fork This Project  

---

# 1. Overview

WaschExpress predicts laundry ETA based on:

- customer input (kilos, service type)  
- current queue state  
- weather conditions  
- processing slot estimation  
- workload ahead of the customer  

The ML model only needs **processed features**, so the system includes deterministic queue logic and slot mapping.

---

# 2. Architecture

```

Frontend (React/Next)
↓ user input (kilos, service_type)
↓ weather API (OpenWeather)
↓ fetch queue data from backend
↓ compute features
↓ call TensorFlow.js model → ETA output
↓ display ETA to user
Backend (Node/Next API)
↓ uses service_role key
↓ queries full queue securely
↓ returns sanitized queue JSON

Supabase
→ tables (jobs, customers, predictions, machines, weather_logs)
→ RLS-secured
→ views (current_queue, queue_summary)
→ job_remaining_minutes() function

````

---

# 3. Supabase Setup

### 3.1 Create a new Supabase project  

Get:

- `SUPABASE_URL`  
- `SUPABASE_ANON_KEY` (for frontend)  
- `SUPABASE_SERVICE_ROLE_KEY` (backend only; keep secret)

### 3.2 Run schema.sql  

Open Supabase Dashboard → SQL Editor → paste and run `schema.sql`.

This will:

- Create tables  
- Setup views  
- Add queue logic  
- Add RLS policies  
- Add admin role helpers  

### 3.3 Assign Staff Role  

In Authentication → Users → Edit user → Add:

```json
{ "role": "staff" }
````

Or run the admin script:

```ts
supabaseAdmin.auth.admin.updateUserById(userId, {
  app_metadata: { role: "staff" }
});
```

---

# 4. Database Schema

### Main tables

| Table                | Purpose                              |
| -------------------- | ------------------------------------ |
| customers            | laundry customers                    |
| jobs                 | laundry orders / queue elements      |
| machines             | washer/dryer definitions             |
| weather_logs         | weather snapshots                    |
| predictions          | ML prediction logs                   |
| current_queue (view) | ordered queue with remaining minutes |
| queue_summary (view) | safe aggregated queue info           |

See full definitions in `schema.sql`.

---

# 5. Row Level Security (RLS)

### Goals

- Customers only see their own jobs
- Staff can see/manage everything
- Queue view protects private data
- Predictions accessible only by backend
- Weather logs can be public or restricted

Policies cover:

- SELECT / INSERT / UPDATE for each table
- Role checking via `is_staff()` helper
- Staff override policies
- No customer DELETE permissions

---

# 6. Queue System

Queue is maintained by priority:

```
express → priority = 10
regular → priority = 0
```

Then ordered:

```
priority DESC, created_at ASC
```

Remaining minutes is computed via:

```
processing_slot_min - elapsed_minutes
```

A view `current_queue` exposes:

- ordered queue
- predicted remaining time per job

A fallback `queue_summary` ensures frontend can compute ETA without exposing job details.

---

# 7. ML Feature Builder

The frontend prepares model-ready features:

```
{
  kilos,
  service_type,
  weather,
  processing_slot_min,
  wait_min
}
```

### Required utility functions (frontend or backend)

```
processingSlotFromKilos(k)
computeWaitFromQueueArray(queue, queueLength)
computeWaitFromAggregates(queueLength, avgProcessingSlot, currentJobRemaining)
```

A detailed example is in `/client/featureBuilder.ts`.

---

# 8. Backend API Endpoints

Recommended structure:

```
/api/queue      → uses service_role key to fetch full queue
/api/predict    → runs TensorFlow.js model server-side
/api/submitJob  → customers submit job to queue
```

Example `/api/queue`:

```ts
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const { data } = await supabase
  .from("current_queue")
  .select("id,kilos,service_type,remaining_minutes,priority,created_at");
```

Backend must:

- Sanitize queue output
- NOT expose service_role key to frontend

---

# 9. Local Development

### Requirements

- Node 18+
- Supabase CLI (optional)
- TensorFlow.js runtime

Run:

```
npm install
npm run dev
```

Backend environment variables:

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
```

Frontend environment:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

# 10. Deployment Notes

- Deploy backend on Vercel/Render/Cloudflare Workers
- Store keys in environment variables
- Service role key must **never** hit the client
- Use RLS + policies defined here to protect data
- Refresh `queue_snapshot` if heavy load requires caching

---

# 11. Forking the Project

Anyone who forks this repo should:

1. Run `schema.sql` in a fresh Supabase project
2. Set environment variables according to `.env.example`
3. Deploy backend using provided API routes
4. Build TensorFlow.js model or download existing weights
5. Use `/client/featureBuilder.ts` for ETA predictions

For feature requests or improvements, open an issue or pull request.

---

# schema.sql

See `schema.sql` in the root directory for the full database setup.

```
