"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Globe,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Smartphone,
  Bot,
  Cpu,
  Calendar,
  Layers,
} from "lucide-react";
import { ServiceItem } from "@/lib/types";

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Smartphone,
  Bot,
  Cpu,
  Sparkles,
  Calendar,
  Layers,
};

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null;

  const IconComponent = iconMap[service.iconName] || Globe;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-dark-950 border border-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-10 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0 shadow-gold-sm">
            <IconComponent className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-[11px] font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
              {service.category} Solution
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Pricing & Turnaround Badge Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-dark-900/80 border border-white/10 mb-6">
          <div>
            <span className="text-xs text-gray-400 block font-mono">Starting Investment</span>
            <span className="text-2xl font-black text-gold-gradient">
              {service.startingPrice}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
            <Clock className="w-4 h-4 text-gold-400" />
            <span>Estimated Delivery: {service.turnaroundTime}</span>
          </div>
        </div>

        {/* Full Description */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Overview & Value Proposition
          </h4>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {service.fullDescription}
          </p>
        </div>

        {/* Features Checklist */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            What is Included
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-200">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-sm font-semibold transition-colors"
          >
            Close
          </button>
          <Link
            href={`/hire?service=${encodeURIComponent(service.name)}`}
            onClick={onClose}
            className="w-full sm:w-auto btn-gold px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-gold-sm"
          >
            <span>Hire Now For This Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
