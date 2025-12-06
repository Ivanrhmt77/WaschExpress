"use client";
import {
  Shirt,
  Menu,
  X,
  Sparkles,
  DollarSign,
  UserRound,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    href: "#services",
    label: "Layanan",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    href: "#pricing",
    label: "Harga",
    icon: <DollarSign className="w-5 h-5" />,
  },
  { href: "#track", label: "Tracking", icon: <Clock className="w-5 h-5" /> },
  {
    href: "#contact",
    label: "Kontak",
    icon: <UserRound className="w-5 h-5" />,
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  const linkClass =
    "flex items-center gap-3 p-4 rounded-xl text-gray-800 font-medium transition-all duration-300 group hover:bg-blue-50";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md text-gray-800 shadow-lg"
            : "bg-transparent text-white"
        }`}
      >
        <div className="relative container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 group"
            prefetch={false}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled ? "bg-blue-600" : "bg-white"
              }`}
            >
              <Shirt
                className={`h-5 w-5 ${
                  isScrolled ? "text-white" : "text-blue-600"
                } group-hover:rotate-12 transition-transform duration-300`}
              />
            </div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              WaschExpress
            </span>
          </Link>

          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 text-sm font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group transition-colors ${
                  isScrolled ? "hover:text-blue-600" : "hover:text-blue-200"
                }`}
                prefetch={false}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="#track"
              className={`hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isScrolled
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
              prefetch={false}
            >
              Cek Status
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 transform transition-all duration-300 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={linkClass}
                prefetch={false}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  {React.cloneElement(
                    item.icon as React.ReactElement<{ className?: string }>,
                    {
                      className: "w-5 h-5 text-blue-600 group-hover:text-white",
                    }
                  )}
                </div>
                <span className="group-hover:text-blue-600">{item.label}</span>
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link
                href="#track"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                prefetch={false}
              >
                Cek Status Laundry
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
