## WaschExpress feature builder + TF.js prediction

This frontend module prepares model features for WaschExpress and calls a TensorFlow.js-serving endpoint.

### Core pieces
- `src/utils/waschexpress.ts`: feature builder helpers (`processing_slot_min`, `wait_min`, etc.).
- `src/api/predict.ts`: `predictWithModel` wrapper for `POST /predict`.
- `examples/`: browser demo (`usage.html` + bundled `usage.bundle.js`) and `mock-server.js` for local testing.
- `tests/waschexpress.test.ts`: Jest coverage for mapping, wait logic, feature building, and network helper.

### Feature mapping
- Processing slot: kilos ∈ [0.5, 35] → minutes ∈ [60, 150] via linear interpolation, rounded.
- Wait from queue details: sum `remaining_minutes` when present, otherwise derive from kilos; take the first `queueLength` jobs (clamped to the array); divide by `parallelWorkers` (ceil, min 1 worker).
- Wait from aggregates: `ceil((queueLength * avgProcessingSlot + currentJobRemaining) / max(1, parallelWorkers))`.
- If no queue and no aggregates, `wait_min = 0`.

### API contract
`predictWithModel` posts JSON:

```json
{
	"kilos": 8.5,
	"service_type": "regular",
	"weather": "rainy",
	"processing_slot_min": 95,
	"wait_min": 1320
}
```

and expects `{ "total_time_min": number }`.

### Running the demo
1) Install deps: `pnpm install`
2) Start the mock API: `pnpm run mock-server` (serves `/queue` and `/predict` on `http://localhost:4001`).
3) In another terminal, build + serve the example: `pnpm run start-example` (esbuild bundle + static server on `http://localhost:4173`).
4) Open `http://localhost:4173/examples/usage.html`, tweak form values, click **Run demo**.

### Using the helpers in app code

```ts
import { buildModelFeatures } from "@/src/utils/waschexpress";
import { predictWithModel } from "@/src/api/predict";

const features = buildModelFeatures({
	kilos: 8.5,
	serviceType: "regular",
	weather: "rainy",
	queueLength: 10,
	avgProcessingSlot: 95,
	currentJobRemaining: 30,
	parallelWorkers: 1,
});

const total = await predictWithModel(features);
```

### Scripts
- `pnpm test` — run Jest (ts-jest).
- `pnpm lint` — lint TypeScript/TSX.
- `pnpm build` — Next.js build.
- `pnpm build:example` — bundle `examples/usage.ts` → `examples/dist/usage.bundle.js`.
- `pnpm start-example` — bundle then serve `/examples` via `http-server` (port 4173).
- `pnpm mock-server` — start the demo API server (port 4001).

### Notes
- Keep `parallelWorkers >= 1`; the code enforces this.
- If the server re-orders the queue for express priority, supply the array in processing order; the helper assumes the order is faithful.
- The mock server is for local testing only; replace `/predict` with your real TF.js-serving endpoint in production.
