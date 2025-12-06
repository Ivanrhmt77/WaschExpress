import { buildModelFeatures } from "../src/utils/waschexpress.js";
import { predictWithModel } from "../src/api/predict.js";

const API_BASE = "http://localhost:4001";

async function fetchQueue() {
  const res = await fetch(`${API_BASE}/queue`);
  if (!res.ok) throw new Error(`Queue fetch failed: ${res.status}`);
  return await res.json();
}

function updateStatus(message) {
  const el = document.getElementById("status");
  if (el) el.textContent = message;
}

export async function runDemo() {
  updateStatus("Loading queue...");
  try {
    const queue = await fetchQueue();

    const kilosInput = document.getElementById("kilos");
    const serviceInput = document.getElementById("service");
    const weatherInput = document.getElementById("weather");

    const kilos = kilosInput ? parseFloat(kilosInput.value || "8.5") : 8.5;
    const serviceType = (serviceInput?.value) || "regular";
    const weather = weatherInput?.value || "rainy";

    const features = buildModelFeatures({
      kilos,
      serviceType,
      weather,
      queue,
      queueLength: queue.length,
      parallelWorkers: 1,
    });

    updateStatus("Calling model...");
    const prediction = await predictWithModel(features, {
      endpoint: `${API_BASE}/predict`,
    });

    const out = document.getElementById("output");
    if (out) {
      out.textContent = `Predicted total time: ${prediction} minutes`;
    }
    updateStatus("Done");
  } catch (err) {
    updateStatus(err instanceof Error ? err.message : "Unknown error");
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("run-demo");
  if (btn) {
    btn.addEventListener("click", () => {
      void runDemo();
    });
  }
});
