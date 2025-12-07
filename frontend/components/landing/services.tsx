import ServiceCard from "@/components/ui/service-card";
import { services } from "@/lib/data/services";

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-linear-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block mb-5 px-5 py-2.5 bg-blue-100 rounded-full">
            <span className="text-sm font-semibold text-blue-600 tracking-wide">
              LAYANAN KAMI
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
            Layanan Profesional Kami
          </h2>

          <p className="mt-2 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Dari cuci cepat hingga perawatan premium, kami siap memberikan
            layanan terbaik dengan standar kualitas tertinggi untuk kenyamanan
            Anda.
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
