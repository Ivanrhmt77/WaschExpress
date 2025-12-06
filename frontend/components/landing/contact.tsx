import Link from "next/link";

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
  );
}
