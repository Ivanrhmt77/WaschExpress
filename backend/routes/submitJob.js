const express = require("express");
const { supabaseAdmin } = require("../supabaseClient");
const { processingSlotFromKilos } = require("../utils/featureBuilder");

const router = express.Router();

/**
 * POST /api/submitJob
 * Public endpoint for submitting orders.
 * Body: { name: string, phone: string, service_type: "regular"|"express" }
 */
router.post("/", async (req, res) => {
  try {
    const { name, phone, service_type, pickup } = req.body || {};

    if (!name || !phone || !["regular", "express"].includes(service_type)) {
      return res.status(400).json({ error: "Invalid payload. Name, phone, and valid service_type are required." });
    }

    // 1. Find or Create Customer
    let customerId;
    
    // Check if customer exists by phone
    const { data: existingCustomer, error: findError } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("phone", phone)
      .single();

    if (findError && findError.code !== 'PGRST116') { // PGRST116 is "Row not found"
      console.error("Error finding customer:", findError);
      return res.status(500).json({ error: "Database error checking customer" });
    }

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      // Create new customer
      const { data: newCustomer, error: createError } = await supabaseAdmin
        .from("customers")
        .insert([{ name, phone }])
        .select("id")
        .single();

      if (createError) {
        console.error("Error creating customer:", createError);
        return res.status(500).json({ error: "Failed to create customer" });
      }
      customerId = newCustomer.id;
    }

    // 2. Create Job (Order)
    // Kilos is 0 initially, status is 'queued' (or we could use a different status if schema allowed)
    // We use 0 kilos to indicate it needs weighing.
    const { data: job, error: jobError } = await supabaseAdmin
      .from("jobs")
      .insert([
        {
          customer_id: customerId,
          service_type,
          kilos: 0, // Placeholder until admin weighs it
          status: "queued",
          processing_slot_min: 0, // Will be updated when kilos are updated
          pickup: pickup === true || pickup === "true"
        }
      ])
      .select()
      .single();

    if (jobError) {
      console.error("Error creating job:", jobError);
      return res.status(500).json({ error: "Failed to create order" });
    }

    return res.status(201).json({ 
      message: "Order created successfully", 
      orderId: job.id,
      customerId: customerId 
    });

  } catch (err) {
    console.error("Submit job error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;
