import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceCard } from "@/components/ui/service-card";
import {
  SparklesIcon,
  ShirtIcon,
  TruckIcon,
  CheckCircle,
  Clock,
  Shield,
  ArrowRight,
  Zap,
  ClockCheck,
  LocateFixed,
  Truck,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section - Fully Responsive */}
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

      {/* Services Section - Enhanced */}
      <section
        id="services"
        className="py-24 md:py-32 bg-linear-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-sm font-semibold text-blue-600">
                LAYANAN KAMI
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-4">
              Layanan Profesional Kami
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Dari cuci cepat hingga perawatan premium, kami siap melayani
              dengan standar tertinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ServiceCard
              icon={<ShirtIcon className="h-12 w-12 text-blue-600" />}
              title="Cuci Kering Lipat"
              description="Pakaian bersih, kering, dan terlipat rapi dengan sempurna, siap masuk lemari Anda."
              features={[
                "Pewangi premium",
                "Pengering modern",
                "Lipatan rapih",
              ]}
            />
            <ServiceCard
              icon={<SparklesIcon className="h-12 w-12 text-blue-600" />}
              title="Setrika Uap"
              description="Pakaian bebas kusut dan rapi sempurna dengan teknologi setrika uap profesional."
              features={[
                "Anti kusut maksimal",
                "Hasil mengkilap",
                "Wangi tahan lama",
              ]}
              highlighted={true}
            />
            <ServiceCard
              icon={<TruckIcon className="h-12 w-12 text-blue-600" />}
              title="Antar Jemput"
              description="Kami jemput pakaian kotor dan antar kembali dalam keadaan bersih dan wangi."
              features={[
                "Free pickup",
                "Tracking real-time",
                "Jadwal fleksibel",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section - Enhanced */}
      <section
        id="pricing"
        className="py-24 md:py-32 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-sm font-semibold text-blue-600">
                HARGA TRANSPARAN
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-4">
              Harga Jujur, Kualitas Terjamin
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Satu harga untuk semua kemudahan, tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="mt-16 max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-blue-100 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full -mr-16 -mt-16 opacity-10"></div>

              <div className="relative">
                <div className="inline-block px-4 py-1 bg-linear-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold rounded-full mb-4">
                  PAKET POPULER
                </div>

                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  Mulai Dari
                </h3>

                <div className="my-6 flex items-end justify-center">
                  <span className="text-7xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Rp 8.000
                  </span>
                  <span className="text-2xl font-normal text-gray-500 mb-2">
                    /kg
                  </span>
                </div>

                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  Untuk layanan cuci kering lipat. Cepat, bersih, dan efisien
                  dengan jaminan kualitas terbaik.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">
                      Deterjen premium gratis
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Pewangi pilihan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Tracking real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Garansi uang kembali</span>
                  </div>
                </div>

                <Link
                  href="#contact"
                  className="block w-full h-14 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 items-center justify-center group"
                  prefetch={false}
                >
                  Pesan Sekarang
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Section - Enhanced */}
      <section id="track" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
                <span className="text-sm font-semibold text-blue-600">
                  TRACKING SYSTEM
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-4">
                Lacak Pesanan Anda
              </h2>
              <p className="mt-4 text-xl text-gray-600 leading-relaxed">
                Masukkan kode unik Anda untuk melihat progres laundry secara
                real-time, lengkap dengan estimasi selesai berbasis AI.
              </p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Contoh: WEX-12345"
                  className="flex-1 text-center sm:text-left text-lg h-16 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 bg-white"
                />
                <Button
                  size="lg"
                  className="h-16 px-10 rounded-xl font-bold text-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Lacak Sekarang
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Status real-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Estimasi AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Notifikasi otomatis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced */}
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
              href="https://wa.me/6281234567890"
              target="_blank"
              className="group inline-flex items-center justify-center h-16 px-12 rounded-full bg-white text-blue-600 font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
              prefetch={false}
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Order via WhatsApp
              <svg
                className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-sm">
              Atau hubungi kami di:{" "}
              <span className="font-semibold">+62 812-3456-7890</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
