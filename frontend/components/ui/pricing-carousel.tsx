"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PricingCard, { PricingCardProps } from "./pricing-card";

interface PricingCarouselProps {
  services: PricingCardProps[];
}

export default function PricingCarousel({ services }: PricingCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const cardWidth = 320 + 24;
  const buffer = services.length * 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollLeft = services.length * cardWidth;
      setInitialized(true);
    });
  }, [services.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.offsetWidth;

      if (scrollLeft < buffer * cardWidth * 0.5) {
        container.scrollLeft = scrollLeft + services.length * cardWidth;
      } else if (scrollLeft > maxScroll - buffer * cardWidth * 0.5) {
        container.scrollLeft = scrollLeft - services.length * cardWidth;
      }

      const containerCenter = scrollLeft + container.offsetWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, idx) => {
        const card = child as HTMLElement;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setVirtualIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [services.length]);

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="overflow-hidden relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 px-4 md:px-16 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >
          {Array.from({ length: services.length * 100 }).map((_, idx) => {
            const service = services[idx % services.length];
            return (
              <div key={idx} className="shrink-0 w-[320px] snap-center">
                <PricingCard
                  {...service}
                  isActive={
                    initialized &&
                    idx % services.length === virtualIndex % services.length
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-y-0 flex items-center justify-between w-full pointer-events-none">
        <button
          onClick={() =>
            containerRef.current?.scrollBy({
              left: -cardWidth,
              behavior: "smooth",
            })
          }
          className="pointer-events-auto ml-[-60px] bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={() =>
            containerRef.current?.scrollBy({
              left: cardWidth,
              behavior: "smooth",
            })
          }
          className="pointer-events-auto mr-[-60px] bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 hidden md:flex"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
