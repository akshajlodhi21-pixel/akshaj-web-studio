"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Clock,
  Layers,
  Zap,
  Globe,
  DollarSign,
  Smartphone,
  Cpu,
  ShoppingCart,
  Building,
  RotateCcw,
} from "lucide-react";

interface ProjectTypeOption {
  id: string;
  name: string;
  icon: React.ElementType;
  basePriceInr: number;
  basePriceUsd: number;
  baseDays: number;
  description: string;
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: "showcase",
    name: "Showcase Landing Website",
    icon: Globe,
    basePriceInr: 14999,
    basePriceUsd: 180,
    baseDays: 6,
    description: "Sleek, high-converting single or multi-section landing page with dynamic UI.",
  },
  {
    id: "corporate",
    name: "Corporate Business Portal",
    icon: Building,
    basePriceInr: 24999,
    basePriceUsd: 300,
    baseDays: 10,
    description: "Full multi-page company portal with services, testimonials, and lead funnels.",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Online Store",
    icon: ShoppingCart,
    basePriceInr: 34999,
    basePriceUsd: 420,
    baseDays: 14,
    description: "Full product catalog, cart, checkout, payment gateways, and order tracking.",
  },
  {
    id: "mobile-app",
    name: "Native / Cross-Platform App",
    icon: Smartphone,
    basePriceInr: 49999,
    basePriceUsd: 600,
    baseDays: 20,
    description: "Android & mobile application with offline sync, native APIs, and notifications.",
  },
  {
    id: "ai-system",
    name: "Custom AI & Automation System",
    icon: Cpu,
    basePriceInr: 39999,
    basePriceUsd: 480,
    baseDays: 14,
    description: "AI conversational agents, vector knowledge vaults, and workflow automation.",
  },
  {
    id: "fullstack-app",
    name: "Enterprise Full-Stack Web App",
    icon: Layers,
    basePriceInr: 59999,
    basePriceUsd: 720,
    baseDays: 25,
    description: "Bespoke SaaS platform with custom database, REST APIs, and client dashboards.",
  },
];

const PAGE_COUNT_OPTIONS = [
  { id: "1-3", label: "1 - 3 Pages", priceMult: 1.0, daysAdd: 0 },
  { id: "4-7", label: "4 - 7 Pages", priceMult: 1.25, daysAdd: 3 },
  { id: "8-14", label: "8 - 14 Pages", priceMult: 1.55, daysAdd: 7 },
  { id: "15+", label: "15+ Pages (Enterprise)", priceMult: 1.95, daysAdd: 12 },
];

const FEATURE_OPTIONS = [
  { id: "seo", label: "95+ Core Web Vitals & SEO Setup", priceInr: 5000, priceUsd: 60, days: 1 },
  { id: "payment", label: "Payment Gateway (Razorpay/Stripe/UPI)", priceInr: 6000, priceUsd: 75, days: 2 },
  { id: "auth", label: "User Authentication & RBAC Access", priceInr: 8000, priceUsd: 100, days: 3 },
  { id: "cms", label: "Custom Admin CMS Control Panel", priceInr: 12000, priceUsd: 150, days: 4 },
  { id: "ai-bot", label: "Custom AI Conversational Assistant", priceInr: 14000, priceUsd: 170, days: 4 },
  { id: "database", label: "High-Performance Cloud Database", priceInr: 9000, priceUsd: 110, days: 3 },
  { id: "multilingual", label: "Multilingual Language Localization", priceInr: 5000, priceUsd: 60, days: 2 },
];

const TIMELINE_OPTIONS = [
  { id: "standard", label: "Standard Pace (Recommended)", mult: 1.0, desc: "Thorough multi-stage testing & polish" },
  { id: "accelerated", label: "Accelerated Sprint (1 - 2 Weeks)", mult: 1.18, desc: "Priority development slots allocated" },
  { id: "express", label: "Express 7-Day Launch", mult: 1.35, desc: "Dedicated round-the-clock sprint" },
];

export default function CostEstimator() {
  const [selectedType, setSelectedType] = useState<ProjectTypeOption>(PROJECT_TYPES[0]);
  const [selectedPages, setSelectedPages] = useState(PAGE_COUNT_OPTIONS[1]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["seo", "payment"]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[0]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    // Base cost adjusted for page count
    let inr = selectedType.basePriceInr * selectedPages.priceMult;
    let usd = selectedType.basePriceUsd * selectedPages.priceMult;
    let days = selectedType.baseDays + selectedPages.daysAdd;

    // Add selected features
    selectedFeatures.forEach((fid) => {
      const feat = FEATURE_OPTIONS.find((f) => f.id === fid);
      if (feat) {
        inr += feat.priceInr;
        usd += feat.priceUsd;
        days += feat.days;
      }
    });

    // Apply timeline modifier
    inr = Math.round(inr * selectedTimeline.mult);
    usd = Math.round(usd * selectedTimeline.mult);
    if (selectedTimeline.id === "express") {
      days = Math.max(7, Math.round(days * 0.5));
    } else if (selectedTimeline.id === "accelerated") {
      days = Math.max(10, Math.round(days * 0.75));
    }

    // Range: -5% to +10%
    const minInr = Math.round((inr * 0.95) / 500) * 500;
    const maxInr = Math.round((inr * 1.1) / 500) * 500;
    const minUsd = Math.round(usd * 0.95);
    const maxUsd = Math.round(usd * 1.1);

    return {
      minInr,
      maxInr,
      minUsd,
      maxUsd,
      days,
    };
  }, [selectedType, selectedPages, selectedFeatures, selectedTimeline]);

  const hireUrl = `/hire?service=${encodeURIComponent(
    selectedType.name
  )}&budget=${encodeURIComponent(
    `₹${calculation.minInr.toLocaleString("en-IN")} - ₹${calculation.maxInr.toLocaleString("en-IN")} (${selectedType.name})`
  )}&description=${encodeURIComponent(
    `Project Estimate for ${selectedType.name} with ${selectedPages.label}. Features: ${selectedFeatures.join(
      ", "
    )}. Target Timeline: ${selectedTimeline.label}.`
  )}`;

  return (
    <div id="cost-estimator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Investment Calculator</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Project <span className="text-gold-gradient">Cost Estimator</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Configure your scope and receive an indicative budgetary estimate for bespoke engineering by AKSHAJ WEB STUDIO.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN: STEP-BY-STEP CONTROLS (7 COLS) ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Project Type */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 space-y-4 shadow-gold-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>1. Select Project Type</span>
              </span>
              <span className="text-[10px] text-gray-400">Step 1 of 4</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((pt) => {
                const Icon = pt.icon;
                const isSelected = selectedType.id === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedType(pt)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-gold-500/15 border-gold-500/80 shadow-[0_0_15px_rgba(212,175,55,0.25)] text-white"
                        : "bg-dark-900/80 border-white/10 hover:border-white/20 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${isSelected ? "text-gold-400" : "text-gray-400"}`} />
                      <span className="text-[10px] font-mono text-gold-400 font-bold">
                        From ₹{pt.basePriceInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-0.5">{pt.name}</div>
                      <div className="text-[10px] text-gray-400 line-clamp-1">{pt.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Number of Pages / Screens */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>2. Number of Pages / Screens</span>
              </span>
              <span className="text-[10px] text-gray-400">Step 2 of 4</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PAGE_COUNT_OPTIONS.map((pg) => {
                const isSelected = selectedPages.id === pg.id;
                return (
                  <button
                    key={pg.id}
                    onClick={() => setSelectedPages(pg)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "bg-gold-500 text-dark-950 font-bold border-gold-400 shadow-gold-sm"
                        : "bg-dark-900 border-white/10 text-gray-300 hover:text-white"
                    }`}
                  >
                    <div className="text-xs">{pg.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Advanced Features Checklist */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>3. Specific Features & Modules</span>
              </span>
              <span className="text-[10px] text-gold-400">{selectedFeatures.length} Chosen</span>
            </div>

            <div className="space-y-2">
              {FEATURE_OPTIONS.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-dark-900 border-gold-500/50 text-white"
                        : "bg-dark-950 border-white/5 text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-gold-500 border-gold-400 text-dark-950 font-bold"
                            : "border-white/20 bg-dark-900"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3 fill-current" />}
                      </div>
                      <span className="text-xs font-medium">{feat.label}</span>
                    </div>

                    <span className="text-[11px] font-mono text-gold-400 font-semibold shrink-0">
                      +₹{feat.priceInr.toLocaleString("en-IN")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Timeline Urgency */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>4. Delivery Pace</span>
              </span>
              <span className="text-[10px] text-gray-400">Step 4 of 4</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMELINE_OPTIONS.map((t) => {
                const isSelected = selectedTimeline.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTimeline(t)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-white/10 border-gold-500/70 text-white shadow-sm"
                        : "bg-dark-900 border-white/10 text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-1">{t.label}</div>
                    <div className="text-[10px] text-gray-400 leading-snug">{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: LIVE ESTIMATE CARD (5 COLS) ================= */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          <div className="p-8 rounded-3xl glass-panel border-2 border-gold-500/40 shadow-2xl relative overflow-hidden space-y-6">
            {/* Top decorative accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">
                Indicative Budget Range
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                Live Calculation
              </span>
            </div>

            {/* Price Output */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-gold-500/30 text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹{calculation.minInr.toLocaleString("en-IN")} &ndash; ₹{calculation.maxInr.toLocaleString("en-IN")}
              </div>
              <div className="text-xs font-mono text-gold-400">
                (~ ${calculation.minUsd} &ndash; ${calculation.maxUsd} USD)
              </div>
              <p className="text-[11px] text-gray-400 pt-2 border-t border-white/10">
                Calculated for: <span className="text-gray-200 font-semibold">{selectedType.name}</span> with {selectedPages.label}
              </p>
            </div>

            {/* Estimated Turnaround */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Estimated Turnaround</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  <span>{calculation.days} Business Days</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Engineering Model</span>
                <span className="text-sm font-bold text-gold-300">Direct Founder Led</span>
              </div>
            </div>

            {/* Phased Breakdown */}
            <div className="space-y-2 text-xs border-t border-white/10 pt-4">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-2">
                Milestone Deliverable Sprints Included:
              </span>
              <div className="flex items-center justify-between text-gray-300">
                <span>1. UI/UX Architecture & Wireframing</span>
                <span className="text-emerald-400 font-mono text-[11px]">Included</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>2. Next.js / TypeScript Frontend & Styling</span>
                <span className="text-emerald-400 font-mono text-[11px]">Included</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>3. Backend, Database & Payment Gateways</span>
                <span className="text-emerald-400 font-mono text-[11px]">Included</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>4. Cross-Device QA & Core Web Vitals Audit</span>
                <span className="text-emerald-400 font-mono text-[11px]">Included</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>5. Vercel Cloud Launch & Domain Setup</span>
                <span className="text-emerald-400 font-mono text-[11px]">Included</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <Link
                href={hireUrl}
                className="w-full btn-gold py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-gold-md"
              >
                <span>Lock In This Estimate & Consult Founder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Explicit Indicative Disclaimer */}
            <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-[10px] text-gold-300/90 leading-relaxed flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>
                <span className="font-bold">Indicative Estimate Notice:</span> This calculation provides an architectural cost model for initial planning. Final quotations and formal agreements are customized directly with Founder Akshaj Lodhi based on exact functional specifications.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
