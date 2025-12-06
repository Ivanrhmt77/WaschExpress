import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  SparklesIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600">
                <SparklesIcon className="h-6 w-6 text-white" />
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

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#services"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  prefetch={false}
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Layanan Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  prefetch={false}
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Harga
                </Link>
              </li>
              <li>
                <Link
                  href="#track"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  prefetch={false}
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  prefetch={false}
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+6281234567890"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-blue-600 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+62 812-3456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@waschexpress.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-blue-600 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>info@waschexpress.com</span>
                </a>
              </li>
              <li>
                <div className="text-gray-400 text-sm flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-blue-600 transition-colors mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>
                    Jl. Contoh No. 123
                    <br />
                    Surabaya, Jawa Timur
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Jam Operasional
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Senin - Jumat</span>
                <span className="text-blue-400 font-semibold">
                  08:00 - 20:00
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Sabtu</span>
                <span className="text-blue-400 font-semibold">
                  08:00 - 18:00
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Minggu</span>
                <span className="text-blue-400 font-semibold">
                  10:00 - 16:00
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
              <p className="text-xs text-blue-400">
                <span className="font-semibold">24/7 Emergency Service</span>
                <br />
                <span className="text-gray-400">Untuk kebutuhan mendesak</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2024 WaschExpress. All rights reserved.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
              prefetch={false}
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-110"
              prefetch={false}
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 transform hover:scale-110"
              prefetch={false}
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>

          {/* Additional Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors"
              prefetch={false}
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors"
              prefetch={false}
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
