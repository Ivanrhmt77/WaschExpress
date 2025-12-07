import {
  WashingMachineIcon,
  ShirtIcon,
  Layers,
  TruckIcon,
  TimerIcon,
  DropletIcon,
} from "lucide-react";

export const services = [
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
