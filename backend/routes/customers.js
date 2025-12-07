const express = require("express");
const { supabaseAdmin } = require("../supabaseClient");
const router = express.Router();

// List all customers
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Map to frontend structure
    const customers = data.map(c => ({
      id: c.id,
      name: c.name,
      whatsapp: c.phone, // Map phone to whatsapp
      address: c.email || "", // Map email to address for now, or empty
      totalOrders: 0, // Need to count jobs if we want this
      createdAt: c.created_at
    }));

    return res.json(customers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Create new customer
router.post("/", async (req, res) => {
  try {
    const { name, whatsapp, address } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from("customers")
      .insert([{ 
        name, 
        phone: whatsapp, 
        email: address // Storing address in email field as requested/implied workaround or just ignoring
      }])
      .select()
      .single();

    if (error) throw error;

    return res.json({
      id: data.id,
      name: data.name,
      whatsapp: data.phone,
      address: data.email,
      totalOrders: 0,
      createdAt: data.created_at
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
