const express = require("express");

const router = express.Router();

/**
 * Placeholder prediction runner. Replace with real TensorFlow.js or SavedModel inference.
 * @param {{ processing_slot_min: number; wait_min: number }} features
 * @returns {number}
 */
function runLocalPrediction(features) {
  const processing = Number(features.processing_slot_min) || 0;
  const wait = Number(features.wait_min) || 0;
  // TODO: plug in real model inference (tfjs-node / SavedModel) once available.
  return Math.round(processing + wait + 100);
}

/**
 * POST /api/predict
 * Body: model-ready features { kilos, service_type, weather, processing_slot_min, wait_min }
 */
router.post("/", async (req, res) => {
  try {
    const { kilos, service_type, weather, processing_slot_min, wait_min } = req.body || {};

    if (
      typeof kilos !== "number" ||
      typeof service_type !== "string" ||
      typeof weather !== "string" ||
      typeof processing_slot_min !== "number" ||
      typeof wait_min !== "number"
    ) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const total_time_min = runLocalPrediction({ processing_slot_min, wait_min });
    return res.json({ total_time_min });
  } catch (err) {
    return res.status(500).json({ error: "Prediction failed", details: err.message });
  }
});

module.exports = router;
