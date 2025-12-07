require("dotenv").config();
const express = require("express");
const cors = require("cors");

const queueRouter = require("./routes/queue");
const predictRouter = require("./routes/predict");
const submitJobRouter = require("./routes/submitJob");
const weatherRouter = require("./routes/weather");
const customersRouter = require("./routes/customers");
const jobsRouter = require("./routes/jobs");

const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/queue", queueRouter);
app.use("/api/predict", predictRouter);
app.use("/api/submitJob", submitJobRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/customers", customersRouter);
app.use("/api/jobs", jobsRouter);

app.use((err, _req, res, _next) => {
  // Fallback error handler
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`WaschExpress backend listening on http://localhost:${PORT}`);
});
