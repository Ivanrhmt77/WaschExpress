"use client";

import React, { useEffect } from "react";
import PricingCarousel from "../ui/pricing-carousel";
import { pricingServices } from "@/lib/data/pricing-services";

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
