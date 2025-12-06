# WaschExpress backend

Minimal Express server exposing:
- `GET /health` — liveness check
- `GET /queue` — sample queue data (mock)
- `POST /predict` — echoes a simple total using `processing_slot_min + wait_min + 100`

## Scripts
- `npm install`
- `npm run dev` (with nodemon)
- `npm start`

Port defaults to `4001` (override with `PORT`).
