"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  HelpCircle,
  Zap,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useStudioStore } from "@/lib/store";

export default function PricingPage() {
  const store = useStudioStore();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Header */}
      <SectionHeading
        badge="Transparent Investment Tiers"
        title="Predictable Pricing, Exceptional Craft"
        subtitle="Choose from our three core development tiers engineered for projects at every scale. All packages feature fully editable parameters."
      />

      {/* Admin indicator pill */}
      <div className="max-w-2xl mx-auto mb-12 p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between text-xs text-gold-300">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold-400 shrink-0" />
          <span>Package prices and feature checklists can be customized via the Admin Console</span>
        </div>
        <Link href="/admin" className="underline hover:text-white font-semibold">
          Edit Packages &rarr;
        </Link>
      </div>

      {/* 3 Core Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
        {store.pricing.map((tier) => {
          const isProf = tier.id === "PROFESSIONAL";

          return (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                isProf
                  ? "glass-panel border-2 border-gold-400 shadow-gold-lg lg:-translate-y-3 bg-dark-900/90"
                  : "glass-panel border border-gold-500/20 hover:border-gold-500/40"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-dark-950 text-xs font-black tracking-wider uppercase shadow-gold-sm">
                  Most Popular
                </div>
              )}

              <div>
                {/* Category Header */}
                <div className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest mb-2">
                  {tier.id}
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 min-h-[40px]">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-gold-gradient">
                      {tier.price}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      / {tier.billingPeriod}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    Best for: {tier.targetAudience}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block font-mono">
                    Package Inclusions:
                  </span>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/10">
                <Link
                  href={`/hire?service=${encodeURIComponent(tier.name)}`}
                  className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all text-center ${
                    isProf
                      ? "btn-gold shadow-gold-sm"
                      : "btn-gold-outline"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Enterprise Banner */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Need Custom Scope or Retainer?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            Enterprise Digital Architecture & Fractional CTO
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            For complex multi-tier enterprise systems, continuous product engineering, or dedicated monthly development sprints, we formulate bespoke contract structures.
          </p>
        </div>

        <Link
          href="/hire?service=Custom%20Software%20Development"
          className="btn-gold px-7 py-3 rounded-xl text-xs sm:text-sm font-bold shrink-0 flex items-center gap-2 shadow-gold-sm"
        >
          <span>Request Custom Proposal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
