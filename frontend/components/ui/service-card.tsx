import { CheckCircle } from "lucide-react";

export function ServiceCard({
  icon,
  title,
  description,
  features,
  highlighted = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center p-10 rounded-3xl transition-all duration-300 hover:-translate-y-3 ${
        highlighted
          ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-2xl scale-105"
          : "bg-white shadow-xl hover:shadow-2xl"
      }`}
    >
      {highlighted && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full">
          POPULER
        </div>
      )}

      <div
        className={`rounded-2xl p-6 mb-6 ${
          highlighted ? "bg-white/20" : "bg-blue-50"
        }`}
      >
        {icon}
      </div>

      <h3
        className={`text-2xl font-bold tracking-tight mb-3 ${
          highlighted ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mb-6 leading-relaxed ${
          highlighted ? "text-blue-50" : "text-gray-600"
        }`}
      >
        {description}
      </p>

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
