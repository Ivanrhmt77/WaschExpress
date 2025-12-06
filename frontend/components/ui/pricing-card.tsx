"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export interface PricingCardProps {
  title: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  popular?: boolean;
  isActive?: boolean;
}

export default function PricingCard({
  title,
  price,
  unit,
  description,
  features,
  popular = false,
  isActive = false,
}: PricingCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border-2 transition-all duration-300 flex flex-col h-full ${
        isActive
          ? "border-blue-500 shadow-2xl scale-100 opacity-100"
          : "border-gray-200 shadow-lg scale-90 opacity-60"
      }`}
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
        {popular && (
          <div className="inline-flex items-center justify-center px-3 py-1 bg-linear-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full mb-4 shadow-sm self-center">
            ⭐ PAKET POPULER
          </div>
        )}
        <h3 className="text-2xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
          {title}
        </h3>
        <div className="flex items-baseline justify-center mb-3 whitespace-nowrap">
          <span className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {price}
          </span>
          <span className="text-base md:text-lg font-medium text-gray-500 ml-1">
            /{unit}
          </span>
        </div>
        <p className="text-gray-600 text-sm md:text-base mb-6 text-center leading-relaxed">
          {description}
        </p>
        <div className="space-y-3 mb-6 grow">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm md:text-base">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="#contact"
          className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-base shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 text-center"
        >
          Pesan Sekarang
        </Link>
      </div>
    </div>
  );
}
