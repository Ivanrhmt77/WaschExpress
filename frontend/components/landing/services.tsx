import ServiceCard from "@/components/ui/service-card";
import {
  WashingMachineIcon,
  ShirtIcon,
  Layers,
  TruckIcon,
  TimerIcon,
  DropletIcon,
} from "lucide-react";

const services = [
  {
    icon: <WashingMachineIcon className="h-12 w-12 text-blue-600" />,
    title: "Cuci Kering Lipat",
    description:
      "Pakaian dicuci, dikeringkan, dan dilipat rapi dengan pewangi premium.",
    features: ["Pewangi premium", "Pengering modern", "Lipatan rapi"],
    highlighted: false,
  },
  {
    icon: <ShirtIcon className="h-12 w-12 text-blue-600" />,
    title: "Cuci & Setrika",
    description:
      "Perawatan lengkap: dicuci bersih dan disetrika dengan uap profesional.",
    features: ["Anti kusut maksimal", "Setrika uap", "Wangi tahan lama"],
    highlighted: true,
  },
  {
    icon: <Layers className="h-12 w-12 text-blue-600" />,
    title: "Setrika Saja",
    description: "Pakaian Anda disetrika menggunakan setrika uap profesional.",
    features: ["Anti kusut", "Rapi & mengkilap", "Cepat selesai"],
    highlighted: false,
  },
  {
    icon: <TruckIcon className="h-12 w-12 text-blue-600" />,
    title: "Antar Jemput",
    description:
      "Layanan pickup dan delivery untuk memudahkan Anda tanpa repot.",
    features: ["Free pickup*", "Tracking real-time", "Jadwal fleksibel"],
    highlighted: false,
  },
  {
    icon: <TimerIcon className="h-12 w-12 text-blue-600" />,
    title: "Laundry Express",
    description:
      "Layanan cepat selesai dalam 3–5 jam untuk kebutuhan mendesak.",
    features: ["Prioritas", "Hanya 3–5 jam", "Pewangi premium"],
    highlighted: true,
  },
  {
    icon: <DropletIcon className="h-12 w-12 text-blue-600" />,
    title: "Dry Cleaning",
    description:
      "Perawatan khusus tanpa air untuk bahan premium seperti jas, kebaya, dan gaun.",
    features: [
      "Aman untuk bahan sensitif",
      "Tidak merusak warna",
      "Noda minyak hilang",
    ],
    highlighted: false,
  },
];

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
