# WaschExpress backend

Express + Supabase integration for the WaschExpress frontend. Requires environment variables (no hardcoding):

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PORT=4001
```

Install & run:

```bash
cd backend
npm install
npm run dev   # nodemon
# or
npm start
```

## API

- `GET /health` — liveness
- `GET /api/queue` — uses service role to read `current_queue`; returns `id, kilos, service_type, remaining_minutes, priority, created_at`.
- `POST /api/predict` — accepts model-ready features and returns `{ total_time_min }`. Replace the placeholder model call in `routes/predict.js` with real TF.js/SavedModel inference.
- `POST /api/submitJob` — requires `Authorization: Bearer <access_token>`; body `{ kilos: number, service_type: "regular"|"express" }`; inserts into `jobs` honoring RLS.
- `GET /api/weather` — latest weather log entry.

## Files
- `supabaseClient.js` — exports `supabaseClient` (anon) and `supabaseAdmin` (service role).
- `routes/*.js` — queue, predict, submitJob, weather endpoints.
- `utils/featureBuilder.js` — shared feature helpers.
- `tests/featureBuilder.test.js` — Jest coverage for feature helpers.

## Tests

```bash
npm test
```
