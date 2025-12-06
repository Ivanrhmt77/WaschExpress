import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Pricing() {
  return (
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
                  <span className="text-gray-700">Deterjen premium gratis</span>
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
  );
}
