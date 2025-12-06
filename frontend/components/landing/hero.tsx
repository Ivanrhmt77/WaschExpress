import Link from "next/link";
import { ArrowRight, Zap, ClockCheck, LocateFixed, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center p-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 z-0"></div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-20 left-10 w-56 h-56 sm:w-72 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-56 h-56 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-56 h-56 sm:w-72 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-cover bg-center z-10"></div>

      {/* Content */}
      <div className="container mx-auto relative z-20 text-white flex flex-col justify-center items-center min-h-screen px-2 sm:px-4">
        {/* Badge */}
        <div className="inline-block mb-4 px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-xs sm:text-sm md:text-sm font-semibold">
            ✨ Cepat, Mudah, Terjangkau
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4 sm:mb-6 animate-fade-in text-center">
          Laundry cepat & akurat
          <span className="block bg-linear-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            dalam pemantauan
          </span>
        </h1>

        {/* Paragraph */}
        <p className="mt-2 sm:mt-4 md:mt-6 text-sm sm:text-xl md:text-2xl max-w-xs sm:max-w-3xl mx-auto text-blue-50 leading-relaxed text-center">
          Dengan WaschExpress, Anda bisa melacak proses laundry secara{" "}
          <br className="block sm:hidden" />
          real-time. Pengerjaan cepat, transparan, dan tetap ramah di kantong.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            href="#track"
            className="group inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-10 rounded-full bg-white text-blue-600 font-bold text-sm sm:text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
            prefetch={false}
          >
            Cek Status Laundry
            <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#services"
            className="inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-10 rounded-full bg-transparent border-2 border-white text-white font-bold text-sm sm:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            prefetch={false}
          >
            Lihat Layanan
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-8 text-white/90">
          <div className="flex items-center gap-2">
            <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-300" />
            <span className="text-xs sm:text-sm font-medium">
              Express 1–3 Jam
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClockCheck className="w-4 sm:w-5 h-4 sm:h-5 text-green-300" />
            <span className="text-xs sm:text-sm font-medium">
              On-Time Guarantee
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LocateFixed className="w-4 sm:w-5 h-4 sm:h-5 text-blue-300" />
            <span className="text-xs sm:text-sm font-medium">
              Real-Time Tracking
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 sm:w-5 h-4 sm:h-5 text-purple-300" />
            <span className="text-xs sm:text-sm font-medium">
              Pickup & Delivery Cepat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
