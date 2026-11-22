"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  TrendingUp,
  Globe,
  Rocket,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";

interface IdeaBlueprint {
  brandName: string;
  tagline: string;
  recommendedStack: string[];
  suggestedPages: string[];
  coreFeatures: string[];
  monetizationModel: string[];
  recommendedService: string;
  estimatedTimeline: string;
  startingInvestment: string;
}

const STARTER_PROMPTS = [
  "AI-Powered Real Estate Virtual Staging & 3D Tours",
  "Subscription Specialty Coffee Roastery & Tasting Club",
  "On-Demand Mobile Veterinary Clinic & Booking App",
  "B2B Compliance & Automated Tax Invoicing SaaS",
];

export default function IdeaGenerator() {
  const [inputIdea, setInputIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<IdeaBlueprint | null>(null);
  const [copied, setCopied] = useState(false);

  const generateBlueprint = (ideaText: string) => {
    if (!ideaText.trim()) return;

    setIsGenerating(true);
    setBlueprint(null);

    setTimeout(() => {
      const lower = ideaText.toLowerCase();

      // Dynamic rule-based digital strategy engine
      let brand = "Nexus Digital";
      let tagline = "Architecting Intelligent Digital Transformation";
      let stack = ["Next.js 14", "TypeScript", "Tailwind CSS", "Node.js", "Vercel Edge Cloud"];
      let pages = ["Hero Discovery Hub", "Interactive Product Showcase", "Client Portals", "Booking & Contact"];
      let features = [
        "Instant mobile-optimized responsive layout",
        "Lead acquisition funnels with automated email notifications",
        "High-performance Core Web Vitals optimization",
      ];
      let monetization = ["Direct Stripe / UPI Payments", "Subscription / Retainer Memberships", "Enterprise Consultation Invoicing"];
      let service = "Website Development";
      let timeline = "10 - 14 Business Days";
      let price = "₹24,999+ / $300+";

      if (lower.includes("ai") || lower.includes("automat") || lower.includes("bot") || lower.includes("intellig")) {
        brand = "Cognitive AI Studio";
        tagline = "Autonomous Workflows & Real-Time Intelligence";
        stack = ["Next.js 14", "Python / FastAPI", "Google Gemini API", "Vector Embeddings", "Tailwind CSS"];
        pages = ["AI Live Demo Console", "API Documentation", "Workflow Builder Tour", "Enterprise Pricing"];
        features = [
          "Conversational LLM interface with domain knowledge retrieval",
          "Automated report generation and data synthesis",
          "Secure API key encapsulation with rate limiting",
          "Real-time streaming responses with low latency",
        ];
        monetization = ["Monthly SaaS Tier Subscriptions", "API Usage Tokens", "Bespoke Enterprise Deployments"];
        service = "AI Solutions & Automation";
        timeline = "2 - 3 Weeks";
        price = "₹39,999+ / $480+";
      } else if (lower.includes("shop") || lower.includes("store") || lower.includes("ecom") || lower.includes("product") || lower.includes("cloth") || lower.includes("coffee") || lower.includes("retail")) {
        brand = "Luxe Emporium";
        tagline = "Frictionless D2C Digital Commerce";
        stack = ["Next.js 14", "TypeScript", "Razorpay & UPI SDK", "PostgreSQL", "Cloudinary Media"];
        pages = ["Curated Storefront Catalog", "Interactive Product Detail", "1-Click Checkout", "Customer Order Portal"];
        features = [
          "Dynamic product catalog with multi-facet filters",
          "Instant UPI, Debit/Credit Card, and NetBanking checkout",
          "Automated WhatsApp & Email order status updates",
          "Inventory stock sync & abandoned cart recovery",
        ];
        monetization = ["Direct D2C Product Sales", "Recurring Subscription Box Deliveries", "Wholesale Invoicing"];
        service = "E-Commerce Development";
        timeline = "12 - 18 Business Days";
        price = "₹34,999+ / $420+";
      } else if (lower.includes("app") || lower.includes("mobile") || lower.includes("android") || lower.includes("ios") || lower.includes("phone")) {
        brand = "Vanguard Mobile";
        tagline = "Native Performance in the Palm of Your Hand";
        stack = ["Android / Kotlin", "Next.js Web Portal", "Firebase Sync", "Material Design 3"];
        pages = ["App Store Splash Page", "Cross-Platform Mobile Screens", "Admin Management Console"];
        features = [
          "Offline-first local database caching (Room / SQLite)",
          "Push notification engine for alerts and updates",
          "Biometric authentication & camera/GPS sensor integration",
          "Real-time cloud database synchronization",
        ];
        monetization = ["App In-App Purchases", "Freemium Subscription Tiers", "Direct Client Service Fees"];
        service = "Android Application Development";
        timeline = "3 - 4 Weeks";
        price = "₹49,999+ / $600+";
      }

      setBlueprint({
        brandName: brand,
        tagline,
        recommendedStack: stack,
        suggestedPages: pages,
        coreFeatures: features,
        monetizationModel: monetization,
        recommendedService: service,
        estimatedTimeline: timeline,
        startingInvestment: price,
      });

      setIsGenerating(false);
    }, 700);
  };

  const handleCopy = () => {
    if (!blueprint) return;
    const text = `AKSHAJ WEB STUDIO Architecture Blueprint:
• Concept: ${inputIdea}
• Recommended Service: ${blueprint.recommendedService}
• Recommended Stack: ${blueprint.recommendedStack.join(", ")}
• Estimated Timeline: ${blueprint.estimatedTimeline}
• Investment: ${blueprint.startingInvestment}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="idea-generator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[550px] h-[350px] bg-gold-500/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Architectural Strategy Engine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          AI Business <span className="text-gold-gradient">Idea Blueprint</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Enter any business idea, venture concept, or niche. Our digital strategy framework generates recommended web architectures, feature sets, tech stacks, and monetization models.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Input Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 shadow-gold-sm space-y-4">
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">
            Enter Your Business Concept or Industry
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputIdea}
              onChange={(e) => setInputIdea(e.target.value)}
              placeholder="e.g. AI-driven interior staging, Boutique artisanal watch marketplace, Fitness habit coach..."
              className="flex-1 bg-dark-900 border border-white/15 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/60"
            />
            <button
              onClick={() => generateBlueprint(inputIdea)}
              disabled={!inputIdea.trim() || isGenerating}
              className="btn-gold px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 shadow-gold-sm disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Blueprint</span>
                </>
              )}
            </button>
          </div>

          {/* Starter Inspiration Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-gray-400">Quick Starters:</span>
            {STARTER_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputIdea(prompt);
                  generateBlueprint(prompt);
                }}
                className="px-2.5 py-1 rounded-lg bg-dark-900 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 text-[11px] transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Blueprint Output Display */}
        {blueprint && (
          <div className="p-6 sm:p-10 rounded-3xl glass-panel border-2 border-gold-500/40 shadow-2xl space-y-8 animate-fade-in">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold block mb-1">
                  Engineered Blueprint & Strategy
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {blueprint.brandName}
                </h3>
                <p className="text-xs text-gold-300 font-mono mt-0.5">
                  &ldquo;{blueprint.tagline}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-2 rounded-xl bg-dark-900 hover:bg-dark-850 border border-white/15 text-xs text-gray-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Blueprint"}</span>
                </button>
              </div>
            </div>

            {/* 4 Architectural Strategy Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Pillar 1: Recommended Tech Stack */}
              <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 font-bold font-mono">
                  <Code2 className="w-4 h-4" />
                  <span>1. Recommended Technology Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {blueprint.recommendedStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-dark-950 border border-gold-500/30 text-gray-200 font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Engineered with server-side rendering for top-tier Google ranking and frictionless multi-device performance.
                </p>
              </div>

              {/* Pillar 2: Must-Have MVP Features */}
              <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 font-bold font-mono">
                  <Layers className="w-4 h-4" />
                  <span>2. Core Functional MVP Modules</span>
                </div>
                <ul className="space-y-1.5 text-gray-300">
                  {blueprint.coreFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar 3: Recommended Information Architecture */}
              <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 font-bold font-mono">
                  <Globe className="w-4 h-4" />
                  <span>3. Structural Page Breakdown</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {blueprint.suggestedPages.map((pg, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-dark-950 border border-white/5 text-[11px] text-gray-300 flex items-center gap-2"
                    >
                      <span className="w-4 h-4 rounded bg-gold-500/10 text-gold-400 font-mono text-[9px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="truncate">{pg}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pillar 4: Monetization & Conversion Channels */}
              <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 font-bold font-mono">
                  <TrendingUp className="w-4 h-4" />
                  <span>4. Revenue & Conversion Strategy</span>
                </div>
                <ul className="space-y-1.5 text-gray-300">
                  {blueprint.monetizationModel.map((model, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Studio Implementation Package */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-gold-500/15 via-dark-900 to-dark-950 border border-gold-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-gold-sm">
              <div>
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest font-bold block mb-1">
                  Tailored Studio Execution Plan
                </span>
                <h4 className="text-lg font-bold text-white mb-1">
                  {blueprint.recommendedService}
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300">
                  <span>Turnaround: <strong className="text-white">{blueprint.estimatedTimeline}</strong></span>
                  <span>•</span>
                  <span>Starting Package: <strong className="text-gold-300">{blueprint.startingInvestment}</strong></span>
                </div>
              </div>

              <Link
                href={`/hire?service=${encodeURIComponent(
                  blueprint.recommendedService
                )}&description=${encodeURIComponent(
                  `Concept: ${inputIdea}. Blueprint Brand: ${blueprint.brandName}. Stack: ${blueprint.recommendedStack.join(
                    ", "
                  )}. Estimated Timeline: ${blueprint.estimatedTimeline}.`
                )}`}
                className="w-full sm:w-auto btn-gold px-7 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-gold-sm shrink-0"
              >
                <span>Build This with Akshaj Lodhi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Framing & Disclaimer */}
            <p className="text-[10px] text-gray-400 border-t border-white/5 pt-3 leading-relaxed text-center">
              Strategy blueprint generated by the AKSHAJ WEB STUDIO AI Architectural Engine. Production implementations are coded from scratch without synthetic templates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
