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
          const isStarter = tier.id === "STARTER";

          const deliverables = isStarter
            ? {
                pages: "Up to 5 Pages (Home, About, Services, Portfolio, Contact)",
                responsive: "100% Fluid (Mobile, Tablet, Desktop)",
                revisions: "2 Iterative Review & Feedback Sprints",
                delivery: "5 – 7 Business Days",
                additionalCharges: "Domain & hosting billed directly by registrar (no markup)",
              }
            : isProf
            ? {
                pages: "Up to 12 Bespoke Pages & Conversion Funnels",
                responsive: "100% Fluid Touch-Optimized Layouts",
                revisions: "4 Iterative Review & Refinement Sprints",
                delivery: "10 – 15 Business Days",
                additionalCharges: "Payment gateway fees & 3rd-party SaaS billed at cost",
              }
            : {
                pages: "Custom Multi-Page Portal & System Architecture",
                responsive: "Cross-Device Web & Mobile App Ecosystem",
                revisions: "Continuous Milestone-Based Sprint Reviews",
                delivery: "20 – 35 Business Days (Phased Milestones)",
                additionalCharges: "High-volume Cloud / LLM API token usage billed at cost",
              };

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

                {/* Explicit Package Inclusions & Deliverables */}
                <div className="p-4 rounded-2xl bg-dark-950/80 border border-gold-500/20 mb-6 space-y-2 text-xs">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gold-400 font-bold mb-1">
                    Verified Deliverables Breakdown:
                  </div>
                  <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-1.5">
                    <span className="text-gray-400">Page Scope:</span>
                    <span className="text-white font-medium text-right">{deliverables.pages}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-1.5">
                    <span className="text-gray-400">Responsiveness:</span>
                    <span className="text-gold-300 font-medium text-right">{deliverables.responsive}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-1.5">
                    <span className="text-gray-400">Revision Policy:</span>
                    <span className="text-gray-200 font-medium text-right">{deliverables.revisions}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-1.5">
                    <span className="text-gray-400">Delivery Expectation:</span>
                    <span className="text-emerald-400 font-mono font-medium text-right">{deliverables.delivery}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 pt-0.5">
                    <span className="text-gray-400">Additional Charges:</span>
                    <span className="text-gray-300 text-[11px] text-right">{deliverables.additionalCharges}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block font-mono">
                    Key Features Included:
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
              <div className="pt-6 border-t border-white/10 space-y-2">
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
                <Link
                  href={`/hire?service=Custom%20Quote&budget=${encodeURIComponent(tier.price)}`}
                  className="w-full py-2 rounded-xl text-[11px] text-gray-400 hover:text-gold-300 flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Request a Custom Quote &rarr;</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deliverables Transparency & Terms Section */}
      <div className="mb-16 p-8 sm:p-10 rounded-3xl glass-panel border border-gold-500/20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-mono uppercase tracking-widest text-gold-400 mb-2">
            <Shield className="w-3.5 h-3.5 text-gold-400" />
            <span>Honest & Transparent Engineering</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Deliverables Policy & Standards
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Clear guidelines on how we scope, deliver, and support every software solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/5 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
              <span>Revision Policy</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Every tier includes designated iterative feedback cycles. Revisions encompass layout tweaks, content styling, color adjustments, and feature refinements prior to production deployment.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/5 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Delivery Expectations</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Timelines begin upon receipt of project scope and brand assets. We provide milestone previews on private staging URLs so you can test before live deployment.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/5 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>Zero Hidden Markups</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Third-party services (custom domain registration, enterprise email, or paid AI APIs such as OpenAI / Google Cloud) are billed directly by the providers with zero studio surcharge.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Enterprise Banner */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Need Custom Scope or Retainer?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            Custom Digital Architecture & Bespoke Solutions
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Have specialized requirements, non-standard feature needs, or an enterprise workflow? We formulate tailored contracts and milestone roadmaps.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Link
            href="/hire?service=Custom%20Quote"
            className="btn-gold px-7 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-gold-sm"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
