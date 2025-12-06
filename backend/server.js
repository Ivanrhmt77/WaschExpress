const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;
const app = express();

app.use(cors());
app.use(express.json());

const sampleQueue = [
  { kilos: 15, remaining_minutes: 40 },
  { kilos: 12 },
  { kilos: 9, remaining_minutes: 0 },
  { kilos: 20 },
];

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/queue", (_req, res) => {
  res.json(sampleQueue);
});

app.post("/predict", (req, res) => {
  const { processing_slot_min = 0, wait_min = 0 } = req.body || {};
  const processing = Number(processing_slot_min) || 0;
  const wait = Number(wait_min) || 0;
  const total_time_min = Math.round(processing + wait + 100);
  res.json({ total_time_min });
});

app.listen(PORT, () => {
  console.log(`WaschExpress backend listening on http://localhost:${PORT}`);
});
