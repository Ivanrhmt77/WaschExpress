const express = require("express");
const axios = require("axios");
const { supabaseAdmin } = require("../supabaseClient");
const { processingSlotFromKilos, computeWaitFromQueueArray } = require("../utils/featureBuilder");

const router = express.Router();

/**
 * Fetch current weather from OpenMeteo (Jakarta coordinates).
 * @returns {Promise<string>}
 */
async function fetchWeather() {
  try {
    // Jakarta coordinates: -6.2088, 106.8456
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current=weather_code";
    const response = await axios.get(url);
    const code = response.data.current.weather_code;
    
    // Map WMO codes to simple strings
    if (code === 0) return "Cerah";
    if (code >= 1 && code <= 3) return "Berawan";
    if (code >= 51 && code <= 67) return "Hujan";
    if (code >= 80 && code <= 82) return "Hujan";
    if (code >= 95) return "Badai Petir";
    
    return "Cerah"; // Default
  } catch (error) {
    console.error("Weather fetch failed:", error.message);
    return "Cerah"; // Fallback
  }
}

/**
 * Placeholder prediction runner. Replace with real TensorFlow.js or SavedModel inference.
 * @param {{ processing_slot_min: number; wait_min: number; weather: string }} features
 * @returns {number}
 */
function runLocalPrediction(features) {
  const processing = Number(features.processing_slot_min) || 0;
  const wait = Number(features.wait_min) || 0;
  const weather = features.weather || "Cerah";
  
  let weatherFactor = 0;
  if (weather.toLowerCase().includes("hujan") || weather.toLowerCase().includes("rain")) {
    weatherFactor = 30; // Add 30 mins for rain (drying takes longer)
  }

  // TODO: plug in real model inference (tfjs-node / SavedModel) once available.
  return Math.round(processing + wait + weatherFactor);
}

/**
 * Get operational hours for a specific date.
 * Senin - Jumat = 08:00 - 20:00
 * Sabtu = 08:00 - 18:00
 * Minggu = 10:00 - 16:00
 */
function getOperationalHours(date) {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...
  let openHour, closeHour;

  if (day === 0) { // Sunday
    openHour = 10;
    closeHour = 16;
  } else if (day === 6) { // Saturday
    openHour = 8;
    closeHour = 18;
  } else { // Mon-Fri
    openHour = 8;
    closeHour = 20;
  }

  const openTime = new Date(date);
  openTime.setHours(openHour, 0, 0, 0);

  const closeTime = new Date(date);
  closeTime.setHours(closeHour, 0, 0, 0);

  return { openTime, closeTime };
}

/**
 * Calculate completion time respecting operational hours.
 * @param {Date} startTime 
 * @param {number} durationMinutes 
 * @returns {Date}
 */
function calculateCompletionTime(startTime, durationMinutes) {
  let currentTime = new Date(startTime);
  let remainingMinutes = durationMinutes;
  let iterations = 0;
  const MAX_ITERATIONS = 100; // Safety break

  while (remainingMinutes > 0 && iterations < MAX_ITERATIONS) {
    iterations++;
    const { openTime, closeTime } = getOperationalHours(currentTime);

    // If current time is before opening, jump to opening
    if (currentTime < openTime) {
      currentTime = new Date(openTime);
    }

    // If current time is after closing, jump to next day 00:00
    if (currentTime >= closeTime) {
      currentTime.setDate(currentTime.getDate() + 1);
      currentTime.setHours(0, 0, 0, 0);
      continue;
    }

    // Calculate time available today
    const timeUntilClose = (closeTime - currentTime) / 60000; // ms to minutes

    if (timeUntilClose >= remainingMinutes) {
      // Can finish today
      currentTime = new Date(currentTime.getTime() + remainingMinutes * 60000);
      remainingMinutes = 0;
    } else {
      // Finish what we can today, then move to next day
      remainingMinutes -= timeUntilClose;
      currentTime.setDate(currentTime.getDate() + 1);
      currentTime.setHours(0, 0, 0, 0);
    }
  }
  
  return currentTime;
}

/**
 * POST /api/predict
 * Body: { kilos, service_type } (optional: processing_slot_min, wait_min)
 */
router.post("/", async (req, res) => {
  try {
    let { kilos, service_type, processing_slot_min, wait_min } = req.body || {};

    if (typeof kilos !== "number") {
      return res.status(400).json({ error: "Invalid payload: kilos is required" });
    }

    // 1. Calculate processing slot if missing
    if (processing_slot_min === undefined) {
      processing_slot_min = processingSlotFromKilos(kilos);
    }

    // 2. Calculate wait time if missing
    if (wait_min === undefined) {
      const { data: queueData } = await supabaseAdmin
        .from("current_queue")
        .select("*")
        .order("priority", { ascending: false })
        .order("created_at", { ascending: true });
      
      // Assuming 2 machines/workers for now
      wait_min = computeWaitFromQueueArray(queueData || [], (queueData || []).length, 2);
    }

    // 3. Fetch weather dynamically
    const weather = await fetchWeather();

    const total_time_min = runLocalPrediction({ processing_slot_min, wait_min, weather });
    
    // Calculate estimated completion time respecting operational hours
    const now = new Date();
    const completionTime = calculateCompletionTime(now, total_time_min);

    return res.json({ 
      total_time_min,
      weather_condition: weather,
      estimated_completion: completionTime.toISOString(),
      details: {
        processing_min: processing_slot_min,
        wait_min: wait_min
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Prediction failed", details: err.message });
  }
});

module.exports = router;
