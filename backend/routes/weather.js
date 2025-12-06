const express = require("express");
const { supabaseAdmin } = require("../supabaseClient");

const router = express.Router();

/**
 * GET /api/weather
 * Returns the latest weather log entry.
 */
router.get("/", async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("weather_logs")
      .select("weather,location,recorded_at,raw")
      .order("recorded_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      return res.status(500).json({ error: "Weather fetch failed", details: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "No weather data" });
    }

    return res.json({ weather: data });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error", details: err.message });
  }
});

module.exports = router;
