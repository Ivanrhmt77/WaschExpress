"use client";
import { SparklesIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md text-gray-800 shadow-lg"
            : "bg-transparent text-white"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
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
                <SparklesIcon
                  className={`h-5 w-5 ${
                    isScrolled
                      ? "text-white"
                      : "text-blue-600"
                  } group-hover:rotate-12 transition-transform duration-300`}
                />
              </div>
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                WaschExpress
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link
                href="#services"
                className={`relative group transition-colors ${
                  isScrolled ? "hover:text-blue-600" : "hover:text-blue-200"
                }`}
                prefetch={false}
              >
                Layanan
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="#pricing"
                className={`relative group transition-colors ${
                  isScrolled ? "hover:text-blue-600" : "hover:text-blue-200"
                }`}
                prefetch={false}
              >
                Harga
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="#track"
                className={`relative group transition-colors ${
                  isScrolled ? "hover:text-blue-600" : "hover:text-blue-200"
                }`}
                prefetch={false}
              >
                Tracking
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="#contact"
                className={`relative group transition-colors ${
                  isScrolled ? "hover:text-blue-600" : "hover:text-blue-200"
                }`}
                prefetch={false}
              >
                Kontak
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="#track"
                className={`hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                }`}
                prefetch={false}
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Cek Status
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
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
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 transform transition-all duration-300 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4">
            <Link
              href="#services"
              onClick={handleLinkClick}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 text-gray-800 font-medium transition-all duration-300 group"
              prefetch={false}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <SparklesIcon className="w-5 h-5 text-blue-600 group-hover:text-white" />
              </div>
              <span className="group-hover:text-blue-600">Layanan</span>
            </Link>

            <Link
              href="#pricing"
              onClick={handleLinkClick}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 text-gray-800 font-medium transition-all duration-300 group"
              prefetch={false}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <svg
                  className="w-5 h-5 text-blue-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="group-hover:text-blue-600">Harga</span>
            </Link>

            <Link
              href="#track"
              onClick={handleLinkClick}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 text-gray-800 font-medium transition-all duration-300 group"
              prefetch={false}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <svg
                  className="w-5 h-5 text-blue-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <span className="group-hover:text-blue-600">Tracking</span>
            </Link>

            <Link
              href="#contact"
              onClick={handleLinkClick}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 text-gray-800 font-medium transition-all duration-300 group"
              prefetch={false}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <svg
                  className="w-5 h-5 text-blue-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="group-hover:text-blue-600">Kontak</span>
            </Link>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link
                href="#track"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                prefetch={false}
              >
                <SparklesIcon className="w-5 h-5" />
                Cek Status Laundry
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
