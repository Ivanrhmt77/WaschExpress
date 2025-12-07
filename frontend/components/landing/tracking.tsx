"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Tracking() {
  const [trackingCode, setTrackingCode] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (trackingCode.trim() === "") return; // Jangan redirect kalau kosong
    router.push(`/track/${trackingCode.trim()}`);
  };

  return (
    <section id="track" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-sm font-semibold text-blue-800">
                TRACKING SYSTEM
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Lacak Pesanan Anda
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed">
              Masukkan kode unik untuk melihat progres laundry secara real-time,
              lengkap dengan estimasi selesai berbasis AI.
            </p>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Contoh: WEX-12345"
                className="flex-1 text-center sm:text-left text-lg h-16 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 bg-white text-gray-900 placeholder-gray-400"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()} // Enter juga submit
              />
              <Button
                size="lg"
                className="h-16 px-10 rounded-xl font-bold text-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleSubmit}
              >
                Lacak Sekarang
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Status real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">Estimasi AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
