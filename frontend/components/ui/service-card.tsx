import React from "react";
import { CheckCircle } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  highlighted = false,
}: ServiceCardProps) {
  const containerClasses = highlighted
    ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-2xl border-2 border-blue-400"
    : "bg-white text-gray-900 shadow-xl border border-gray-200 hover:border-gray-300";

  const iconWrapperClasses = highlighted ? "bg-white/20" : "bg-blue-50";

  const displayedIcon = highlighted
    ? React.cloneElement(icon, {
        className: "h-12 w-12 text-white",
      } as React.HTMLAttributes<HTMLElement>)
    : icon;

  return (
    <div
      className={`
        relative flex flex-col items-center text-center p-10 rounded-3xl 
        transition-all duration-300 transform hover:-translate-y-3 hover:scale-105
        ${containerClasses}
      `}
    >
      {/* Badge POPULER */}
      {highlighted && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full">
          POPULER
        </div>
      )}

      {/* Icon */}
      <div className={`rounded-2xl p-6 mb-6 ${iconWrapperClasses}`}>
        {displayedIcon}
      </div>

      {/* Title */}
      <h3
        className={`text-2xl font-bold tracking-tight mb-3 ${
          highlighted ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`mb-6 leading-relaxed ${
          highlighted ? "text-blue-50" : "text-gray-600"
        }`}
      >
        {description}
      </p>

      {/* Features */}
      <div className="space-y-3 w-full">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle
              className={`w-4 h-4 shrink-0 ${
                highlighted ? "text-green-300" : "text-green-500"
              }`}
            />
            <span className={highlighted ? "text-blue-50" : "text-gray-700"}>
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
