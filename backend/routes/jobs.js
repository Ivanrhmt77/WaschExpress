const express = require("express");
const { supabaseAdmin } = require("../supabaseClient");
const { processingSlotFromKilos } = require("../utils/featureBuilder");
const router = express.Router();

// Map backend job status to frontend OrderStatus
const statusMapToFrontend = (status) => {
  switch (status) {
    case "queued":
      return "Tertunda";
    case "processing":
      return "Dicuci";
    case "done":
      return "Selesai"; // Frontend shows done as Selesai
    case "cancelled":
      return "Tertunda"; // fallback; adjust as needed
    default:
      return "Tertunda";
  }
};

// Helper to convert job row to frontend Order shape
const toFrontendOrder = (job) => {
  const isExpress = job.service_type === "express";
  const pricePerKg = isExpress ? 10000 : 6000; // TODO: replace with real pricing
  const total = Math.round((Number(job.kilos) || 0) * pricePerKg);

  // Compute estimated completion: start from started_at if processing, else created_at
  const baseTs = job.started_at || job.created_at;
  let estimatedCompletion = baseTs;
  if (baseTs && job.processing_slot_min) {
    const base = new Date(baseTs);
    // Add processing_slot_min minutes
    estimatedCompletion = new Date(base.getTime() + Number(job.processing_slot_min) * 60 * 1000).toISOString();
  }

  return {
    id: job.id,
    customerId: job.customer_id,
    customerName: job.customers?.name || "Unknown",
    customer: {
      id: job.customers?.id || null,
      name: job.customers?.name || null,
      phone: job.customers?.phone || null,
    },
    items: [
      {
        serviceId: isExpress ? "SVC-EXPRESS" : "SVC-REGULAR",
        serviceName: isExpress ? "Express Wash" : "Regular Wash",
        quantity: Number(job.kilos) || 0,
        price: pricePerKg,
        unit: "kg",
      },
    ],
    pickup: !!job.pickup,
    status: statusMapToFrontend(job.status),
    total,
    createdAt: job.created_at,
    estimatedCompletion,
  };
};

// Get pending jobs (queued)
router.get("/pending", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("jobs")
        .select(`
          *,
          customers (
            id,
            name,
            phone
          )
        `)
      .eq("status", "queued")
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Transform to match frontend Order type
    const formatted = data.map(toFrontendOrder);

    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get job history (all jobs, newest first)
router.get("/history", async (req, res) => {
  try {
    const { status } = req.query; // optional filter e.g., done|processing|queued

    let query = supabaseAdmin
      .from("jobs")
      .select(`
        *,
        customers (
          id,
          name,
          phone
        )
      `)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw error;

    const formatted = data.map(toFrontendOrder);
    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get single job by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from("jobs")
      .select(`
        *,
        customers (
          id,
          name,
          phone
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Not found" });

    const order = toFrontendOrder(data);
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update job (Admin sets weight/details/status)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { kilos, status, service_type } = req.body;

    // Fetch existing job to protect immutable fields (like original service_type)
    const { data: existing, error: fetchErr } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchErr) throw fetchErr;

    const updates = {};
    if (kilos !== undefined) {
      updates.kilos = kilos;
      updates.processing_slot_min = processingSlotFromKilos(kilos);
    }
    if (status) {
      // Map frontend status to backend status
      const statusMap = {
        'Tertunda': 'queued',
        'Dicuci': 'processing',
        'Siap Diambil': 'done',
        'Selesai': 'done',
        'cancelled': 'cancelled'
      };
      updates.status = statusMap[status] || status;
    }
    // Do not allow changing service_type if job already has one (customer choice)
    if (service_type && !existing.service_type) updates.service_type = service_type;

    const { data, error } = await supabaseAdmin
      .from("jobs")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Create new job (Admin walk-in)
router.post("/", async (req, res) => {
  try {
    const { customerId, service_type, kilos } = req.body;
    
    const processing_slot_min = processingSlotFromKilos(kilos || 0);

    const { data, error } = await supabaseAdmin
      .from("jobs")
      .insert([{
        customer_id: customerId,
        service_type,
        kilos: kilos || 0,
        status: 'queued', // Default to queued
        processing_slot_min
      }])
      .select()
      .single();

    if (error) throw error;

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete job (hard delete)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
