"use client";

import React, { useEffect } from "react";
import PricingCarousel from "../ui/pricing-carousel";

const pricingServices = [
  {
    title: "Cuci Kering Lipat",
    price: "Rp 6.000",
    unit: "kg",
    description:
      "Pakaian dicuci, dikeringkan, dan dilipat rapi dengan pewangi premium.",
    features: ["Pewangi premium", "Pengering modern", "Lipatan rapi"],
    popular: false,
  },
  {
    title: "Cuci & Setrika",
    price: "Rp 7.000",
    unit: "kg",
    description:
      "Perawatan lengkap: dicuci bersih dan disetrika dengan uap profesional.",
    features: ["Anti kusut maksimal", "Setrika uap", "Wangi tahan lama"],
    popular: true,
  },
  {
    title: "Setrika Saja",
    price: "Rp 4.000",
    unit: "kg",
    description: "Pakaian Anda disetrika menggunakan setrika uap profesional.",
    features: ["Anti kusut", "Rapi & mengkilap", "Cepat selesai"],
    popular: false,
  },
  {
    title: "Antar Jemput",
    price: "Rp 5.000",
    unit: "trip",
    description:
      "Layanan pickup dan delivery untuk memudahkan Anda tanpa repot.",
    features: ["Free pickup*", "Tracking real-time", "Jadwal fleksibel"],
    popular: false,
  },
  {
    title: "Laundry Express",
    price: "Rp 9.000",
    unit: "kg",
    description:
      "Layanan cepat selesai dalam 3–5 jam untuk kebutuhan mendesak.",
    features: ["Prioritas", "Hanya 3–5 jam", "Pewangi premium"],
    popular: true,
  },
  {
    title: "Dry Cleaning",
    price: "Rp 15.000",
    unit: "pcs",
    description:
      "Perawatan khusus tanpa air untuk bahan premium seperti jas, kebaya, dan gaun.",
    features: [
      "Aman untuk bahan sensitif",
      "Tidak merusak warna",
      "Noda minyak hilang",
    ],
    popular: false,
  },
];

export default function Pricing() {
  useEffect(() => {
    if (window.location.hash === "#pricing") {
      requestAnimationFrame(() => {
        const el = document.getElementById("pricing");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <section
      id="pricing"
      className="py-16 md:py-24 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-semibold text-blue-600">
              HARGA TRANSPARAN
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Harga Jujur, Kualitas Terjamin
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Satu harga untuk semua kemudahan, tanpa biaya tersembunyi.
          </p>
        </div>
        <PricingCarousel services={pricingServices} />
      </div>
    </section>
  );
}
