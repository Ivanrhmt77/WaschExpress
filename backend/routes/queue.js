const express = require("express");
const { supabaseAdmin } = require("../supabaseClient");

const router = express.Router();

/**
 * GET /api/queue
 * Returns sanitized queue rows using service_role privileges.
 */
router.get("/", async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("current_queue")
      .select("id,kilos,service_type,remaining_minutes,priority,created_at")
      .order("priority", { ascending: false })
      .order("created_at", { ascending: true });

    if (error) {
      return res.status(500).json({ error: "Queue fetch failed", details: error.message });
    }

    return res.json({ queue: data ?? [] });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error", details: err.message });
  }
});

module.exports = router;
