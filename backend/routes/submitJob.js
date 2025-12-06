const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_ANON_KEY } = require("../supabaseClient");
const { processingSlotFromKilos } = require("../utils/featureBuilder");

const router = express.Router();

/**
 * Build an authenticated Supabase client using the caller's access token.
 * @param {string} accessToken
 */
function getAuthedClient(accessToken) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

/**
 * POST /api/submitJob
 * Requires Authorization: Bearer <access_token>
 * Body: { kilos: number; service_type: "regular"|"express" }
 */
router.post("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.toString().toLowerCase().startsWith("bearer ")) {
      return res.status(401).json({ error: "Missing bearer token" });
    }

    const accessToken = authHeader.toString().slice(7).trim();
    const client = getAuthedClient(accessToken);

    const { data: userData, error: userError } = await client.auth.getUser(accessToken);
    if (userError || !userData?.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const { kilos, service_type } = req.body || {};
    if (typeof kilos !== "number" || !["regular", "express"].includes(service_type)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const processing_slot_min = processingSlotFromKilos(kilos);

    const { data, error } = await client
      .from("jobs")
      .insert({
        kilos,
        service_type,
        status: "queued",
        processing_slot_min,
        customer_id: userData.user.id,
      })
      .select("id,kilos,service_type,processing_slot_min,status,created_at")
      .single();

    if (error) {
      return res.status(400).json({ error: "Insert failed", details: error.message });
    }

    return res.status(201).json({ job: data });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error", details: err.message });
  }
});

module.exports = router;
