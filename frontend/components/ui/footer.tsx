"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Shirt,
} from "lucide-react";

const QUICK_LINKS = [
  { href: "#services", label: "Layanan Kami" },
  { href: "#pricing", label: "Harga" },
  { href: "#track", label: "Tracking" },
  { href: "#contact", label: "Kontak" },
];

const CONTACT_INFO = [
  {
    type: "phone",
    href: "tel:+6283187144476",
    label: "+62 831-8714-4476",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    type: "email",
    href: "mailto:waschExpress@gmail.com",
    label: "waschExpress@gmail.com",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    type: "address",
    href: "https://maps.app.goo.gl/vsYcuafkENvH9fee8",
    label: "Jl. Raya ITS, Keputih, Sukolilo\nSurabaya, Jawa Timur",
    icon: <MapPin className="h-4 w-4" />,
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com",
    icon: <Facebook className="h-5 w-5" />,
    label: "Facebook",
    bgHover: "hover:bg-blue-600",
  },
  {
    href: "https://twitter.com",
    icon: <Twitter className="h-5 w-5" />,
    label: "Twitter",
    bgHover: "hover:bg-blue-400",
  },
  {
    href: "https://instagram.com",
    icon: <Instagram className="h-5 w-5" />,
    label: "Instagram",
    bgHover: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600",
  },
];

const CONTACT_ITEM_CLASS =
  "text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-3 group";
const ICON_BOX_CLASS =
  "p-2 rounded-lg bg-gray-800 group-hover:bg-blue-600 transition-colors group-hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600">
                <Shirt className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                WaschExpress
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Solusi laundry modern dengan teknologi tracking real-time. Cepat,
              bersih, dan terpercaya.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Navigasi</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Hubungi Kami</h3>
            <ul className="space-y-3">
              {CONTACT_INFO.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.type === "address" ? "_blank" : undefined}
                    rel={
                      item.type === "address"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={CONTACT_ITEM_CLASS}
                  >
                    <div className={ICON_BOX_CLASS}>{item.icon}</div>
                    <span
                      className={
                        item.type === "address" ? "whitespace-pre-line" : ""
                      }
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Jam Operasional
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { day: "Senin - Jumat", time: "08:00 - 20:00" },
                { day: "Sabtu", time: "08:00 - 18:00" },
                { day: "Minggu", time: "10:00 - 16:00" },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between text-gray-400">
                  <span>{day}</span>
                  <span className="text-blue-400 font-semibold">{time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg text-xs text-blue-400">
              <span className="font-semibold">24/7 Emergency Service</span>
              <br />
              <span className="text-gray-400">Untuk kebutuhan mendesak</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 WaschExpress. All rights reserved.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                aria-label={social.label}
                prefetch={false}
                className={`p-3 rounded-full bg-gray-800 text-gray-400 transition-all duration-300 transform hover:scale-110 ${social.bgHover} hover:text-white`}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end text-sm">
            {[
              { label: "Kebijakan Privasi", href: "#" },
              { label: "Syarat & Ketentuan", href: "#" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-500 hover:text-blue-400 transition-colors"
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
