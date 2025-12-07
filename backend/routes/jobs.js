const express = require("express");
const { supabaseAdmin } = require("../supabaseClient");
const { processingSlotFromKilos } = require("../utils/featureBuilder");
const router = express.Router();

// Get pending jobs (queued)
router.get("/pending", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("jobs")
      .select(`
        *,
        customers (
          name,
          phone
        )
      `)
      .eq("status", "queued")
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Transform to match frontend Order type
    const formatted = data.map(job => ({
      id: job.id,
      customerId: job.customer_id,
      customerName: job.customers?.name || "Unknown",
      items: [{
        serviceId: job.service_type === 'express' ? 'SVC-EXPRESS' : 'SVC-REGULAR',
        serviceName: job.service_type === 'express' ? 'Express Wash' : 'Regular Wash',
        quantity: job.kilos,
        price: job.service_type === 'express' ? 10000 : 6000, // Mock price
        unit: 'kg'
      }],
      pickup: !!job.pickup,
      status: job.status === 'queued' ? 'Tertunda' : job.status, // Map status
      total: 0, // To be calculated
      createdAt: job.created_at,
      estimatedCompletion: null,
      isExpress: job.service_type === 'express'
    }));

    return res.json(formatted);
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
