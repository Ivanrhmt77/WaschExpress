import { ServiceCard } from "@/components/ui/service-card";
import { ShirtIcon, SparklesIcon, TruckIcon } from "lucide-react";

export default function Services() {
  return (
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
            Dari cuci cepat hingga perawatan premium, kami siap melayani dengan
            standar tertinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ServiceCard
            icon={<ShirtIcon className="h-12 w-12 text-blue-600" />}
            title="Cuci Kering Lipat"
            description="Pakaian bersih, kering, dan terlipat rapi dengan sempurna, siap masuk lemari Anda."
            features={["Pewangi premium", "Pengering modern", "Lipatan rapih"]}
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
            features={["Free pickup", "Tracking real-time", "Jadwal fleksibel"]}
          />
        </div>
      </div>
    </section>
  );
}
