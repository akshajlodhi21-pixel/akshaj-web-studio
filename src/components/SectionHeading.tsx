import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`relative mb-12 md:mb-16 ${
        isCenter ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl"
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-semibold text-gold-400 tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)] ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        {title.split(" ").map((word, idx) => {
          // Highlight select words in gold gradient
          const isGold = idx % 3 === 1 || word.toLowerCase().includes("studio") || word.toLowerCase().includes("digital") || word.toLowerCase().includes("future") || word.toLowerCase().includes("solution");
          return (
            <span key={idx} className={isGold ? "text-gold-gradient inline-block ml-1.5 first:ml-0" : "inline-block ml-1.5 first:ml-0"}>
              {word}
            </span>
          );
        })}
      </h2>

      {subtitle && (
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-normal">
          {subtitle}
        </p>
      )}

      <div
        className={`mt-4 h-1 w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
