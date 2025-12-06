"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto text-center relative z-10 px-4">
        <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-sm font-semibold">HUBUNGI KAMI</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
          Pesan Sekarang, Tanpa Ribet
        </h2>

        <p className="mt-4 text-xl max-w-2xl mx-auto text-blue-50 leading-relaxed">
          Klik tombol di bawah untuk terhubung dengan kami via WhatsApp dan
          jadwalkan penjemputan laundry Anda hari ini.
        </p>

        <div className="mt-10">
          <Link
            href="https://wa.me/6283187144476"
            target="_blank"
            className="group inline-flex items-center justify-center h-16 px-12 rounded-full bg-white text-blue-600 font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
            prefetch={false}
          >
            <SiWhatsapp className="w-6 h-6 mr-3" />
            Order via WhatsApp
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-blue-100 text-sm flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Atau hubungi kami di:{" "}
            <span className="font-semibold">+62 831-8714-4476</span>
          </p>
        </div>
      </div>
    </section>
  );
}
