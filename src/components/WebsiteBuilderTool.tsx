"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Palette,
  Layout,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  ShoppingBag,
  Briefcase,
  User,
  Coffee,
  Stethoscope,
  Building2,
  Cpu,
  Monitor,
  Smartphone,
  ExternalLink,
  Shield,
  Layers,
  Sliders,
  Copy,
  Check,
} from "lucide-react";

interface BusinessType {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  heroSnippet: string;
  suggestedPages: string[];
  baseBudget: string;
}

const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    icon: ShoppingBag,
    tagline: "High-Converting Online Retail & Catalog",
    heroSnippet: "Curated Luxury Products Engineered for Frictionless Checkout",
    suggestedPages: ["Storefront Catalog", "Product Detail Page", "Cart & Checkout", "Order Tracking"],
    baseBudget: "₹34,999+ / $420+",
  },
  {
    id: "saas",
    name: "SaaS / Tech Startup",
    icon: Cpu,
    tagline: "Product Landing & High-Speed Web App",
    heroSnippet: "Next-Generation Cloud Software Empowering Global Teams",
    suggestedPages: ["Interactive Hero Tour", "Features Grid", "Live Demo Sandbox", "Pricing Tiers"],
    baseBudget: "₹39,999+ / $480+",
  },
  {
    id: "corporate",
    name: "Corporate & Enterprise",
    icon: Building2,
    tagline: "Authority Positioning & Client Acquisition",
    heroSnippet: "Enterprise Digital Infrastructure & Strategic Consulting",
    suggestedPages: ["Company Mission", "Service Practices", "Case Studies", "Client Portal"],
    baseBudget: "₹24,999+ / $300+",
  },
  {
    id: "creator",
    name: "Creator & Personal Brand",
    icon: User,
    tagline: "High-Impact Portfolio & Audience Hub",
    heroSnippet: "Architecting Digital Presence & Creative Influence",
    suggestedPages: ["Visual Showcase", "About Biography", "Media Kit", "Booking Form"],
    baseBudget: "₹18,999+ / $230+",
  },
  {
    id: "restaurant",
    name: "Restaurant & Hospitality",
    icon: Coffee,
    tagline: "Menu, Table Reservations & Ordering",
    heroSnippet: "Culinary Excellence Meets Seamless Table Booking",
    suggestedPages: ["Interactive Menu", "Table Booking", "Atmosphere Gallery", "Contact & Hours"],
    baseBudget: "₹21,999+ / $260+",
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinic",
    icon: Stethoscope,
    tagline: "Patient Portal, Booking & Telehealth",
    heroSnippet: "Compassionate Modern Healthcare & Digital Appointments",
    suggestedPages: ["Doctor Profiles", "Specialty Treatments", "Appointment Scheduling", "FAQs"],
    baseBudget: "₹26,999+ / $320+",
  },
];

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  accent: string;
  bgHex: string;
  previewBg: string;
  previewCard: string;
  previewAccent: string;
}

const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: "gold",
    name: "Obsidian & Gold (Studio Signature)",
    primary: "text-gold-400",
    accent: "bg-gold-500",
    bgHex: "#030306",
    previewBg: "bg-[#05050A]",
    previewCard: "bg-[#0E0E18] border-gold-500/30",
    previewAccent: "text-gold-400 border-gold-500/40 bg-gold-500/10",
  },
  {
    id: "neon-cyan",
    name: "Cyber Neon (Cyan & Violet)",
    primary: "text-cyan-400",
    accent: "bg-cyan-500",
    bgHex: "#030712",
    previewBg: "bg-[#030712]",
    previewCard: "bg-[#0b1329] border-cyan-500/30",
    previewAccent: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
  },
  {
    id: "royal-blue",
    name: "Royal Navy & Slate",
    primary: "text-blue-400",
    accent: "bg-blue-600",
    bgHex: "#060b18",
    previewBg: "bg-[#060b18]",
    previewCard: "bg-[#0c1833] border-blue-500/30",
    previewAccent: "text-blue-400 border-blue-500/40 bg-blue-500/10",
  },
  {
    id: "emerald",
    name: "Emerald & Mint Growth",
    primary: "text-emerald-400",
    accent: "bg-emerald-500",
    bgHex: "#02120b",
    previewBg: "bg-[#02120b]",
    previewCard: "bg-[#062417] border-emerald-500/30",
    previewAccent: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  },
  {
    id: "minimal-silver",
    name: "Monochrome Platinum",
    primary: "text-gray-100",
    accent: "bg-gray-200",
    bgHex: "#0a0a0c",
    previewBg: "bg-[#0a0a0c]",
    previewCard: "bg-[#18181e] border-white/20",
    previewAccent: "text-white border-white/30 bg-white/10",
  },
];

const SECTIONS_LIST = [
  { id: "hero", label: "Hero Showcase & Value Proposition", default: true },
  { id: "services", label: "Core Services / Offerings Grid", default: true },
  { id: "portfolio", label: "Interactive Portfolio & Projects", default: true },
  { id: "pricing", label: "Pricing Calculator / Investment Tiers", default: true },
  { id: "about", label: "About Founder & Vision Story", default: true },
  { id: "faq", label: "Interactive FAQ Accordion", default: false },
  { id: "contact", label: "High-Conversion Lead Contact Form", default: true },
];

export default function WebsiteBuilderTool() {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType>(BUSINESS_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState<ColorScheme>(COLOR_SCHEMES[0]);
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "hero",
    "services",
    "portfolio",
    "pricing",
    "about",
    "contact",
  ]);
  const [brandName, setBrandName] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleSection = (id: string) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const displayName = brandName.trim() || `${selectedBusiness.name.split(" ")[0]} Studio`;

  const handleCopySpec = () => {
    const spec = `AKSHAJ WEB STUDIO Website Configuration:
• Business Type: ${selectedBusiness.name}
• Brand Name: ${displayName}
• Color Palette: ${selectedColor.name}
• Chosen Sections: ${selectedSections.join(", ")}
• Estimated Baseline: ${selectedBusiness.baseBudget}`;

    navigator.clipboard.writeText(spec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const hireUrl = `/hire?service=${encodeURIComponent(
    selectedBusiness.name
  )}&description=${encodeURIComponent(
    `Custom ${selectedBusiness.name} for "${displayName}". Theme: ${selectedColor.name}. Selected Sections: ${selectedSections.join(", ")}.`
  )}`;

  return (
    <div id="website-builder-tool" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Palette className="w-3.5 h-3.5" />
          <span>Interactive Architecture Studio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Build Your <span className="text-gold-gradient">Website</span> Concept
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Configure your digital requirements, explore live sample previews, and generate your customized specification ready for engineering by Akshaj Lodhi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN: CONFIGURATION CONTROLS (5 COLS) ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Brand & Business Type */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 space-y-4 shadow-gold-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>1. Select Business Type</span>
              </span>
              <span className="text-[10px] text-gray-400">Step 1 of 3</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 mb-1">
                Your Brand / Company Name (Optional)
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Acme Innovations, Luxe Aesthetics"
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {BUSINESS_TYPES.map((b) => {
                const Icon = b.icon;
                const isSelected = selectedBusiness.id === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBusiness(b)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-gold-500/15 border-gold-500/80 shadow-[0_0_15px_rgba(212,175,55,0.25)] text-white"
                        : "bg-dark-900/80 border-white/10 hover:border-white/20 text-gray-300"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-gold-400" : "text-gray-400"}`} />
                    <div>
                      <div className="text-xs font-bold leading-snug">{b.name}</div>
                      <div className="text-[10px] text-gray-400 truncate mt-0.5">{b.baseBudget}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Color Palette */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span>2. Choose Aesthetic Theme</span>
              </span>
              <span className="text-[10px] text-gray-400">Step 2 of 3</span>
            </div>

            <div className="space-y-2">
              {COLOR_SCHEMES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedColor.id === c.id
                      ? "bg-white/10 border-gold-500/60 shadow-sm"
                      : "bg-dark-900 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: c.accent.replace("bg-", "").includes("gold") ? "#D4AF37" : c.id === "neon-cyan" ? "#06B6D4" : c.id === "royal-blue" ? "#3B82F6" : c.id === "emerald" ? "#10B981" : "#E5E7EB" }}
                    />
                    <span className="text-xs font-semibold text-gray-200">{c.name}</span>
                  </div>
                  {selectedColor.id === c.id && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Sections Required */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5" />
                <span>3. Sections to Include</span>
              </span>
              <span className="text-[10px] text-gold-400">{selectedSections.length} Active</span>
            </div>

            <div className="space-y-2">
              {SECTIONS_LIST.map((s) => {
                const active = selectedSections.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSection(s.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      active
                        ? "bg-dark-900 border-gold-500/40 text-white"
                        : "bg-dark-950 border-white/5 text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <span className="text-xs font-medium">{s.label}</span>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        active
                          ? "bg-gold-500 border-gold-400 text-dark-950 font-bold"
                          : "border-white/20 bg-dark-900"
                      }`}
                    >
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: LIVE MOCKUP PREVIEW (7 COLS) ================= */}
        <div className="lg:col-span-7 flex flex-col gap-6 sticky top-24">
          {/* Mockup Window */}
          <div className="rounded-3xl border-2 border-gold-500/40 bg-dark-950 shadow-2xl overflow-hidden transition-all duration-500">
            {/* Browser Top Bar */}
            <div className="p-3 bg-dark-900 border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[10px] font-mono text-gray-400 ml-2 hidden sm:inline">
                  Interactive Live Preview
                </span>
              </div>

              {/* Fake address bar */}
              <div className="px-3 py-1 rounded-lg bg-dark-950 border border-white/10 text-[11px] font-mono text-gray-300 truncate max-w-[220px]">
                https://{displayName.toLowerCase().replace(/[^a-z0-9]/g, "")}.studio
              </div>

              <div className="flex items-center gap-1.5 text-gold-400 text-[10px] font-mono">
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live Concept</span>
              </div>
            </div>

            {/* Preview Viewport Canvas */}
            <div
              className={`p-6 sm:p-8 min-h-[460px] max-h-[580px] overflow-y-auto space-y-6 transition-colors duration-500 ${selectedColor.previewBg}`}
              style={{ backgroundColor: selectedColor.bgHex }}
            >
              {/* Mockup Header Navigation */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs">
                    {displayName.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-white tracking-tight">{displayName}</span>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-[11px] text-gray-400">
                  <span>Home</span>
                  {selectedSections.includes("services") && <span>Services</span>}
                  {selectedSections.includes("portfolio") && <span>Portfolio</span>}
                  {selectedSections.includes("pricing") && <span>Pricing</span>}
                </div>

                <button className={`px-3 py-1 rounded-lg text-[10px] font-bold ${selectedColor.previewAccent}`}>
                  Get Started
                </button>
              </div>

              {/* 1. Hero Block */}
              {selectedSections.includes("hero") && (
                <div className={`p-6 rounded-2xl border text-center space-y-3 ${selectedColor.previewCard}`}>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider border border-white/15 text-gray-300">
                    {selectedBusiness.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {selectedBusiness.heroSnippet}
                  </h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                    Designed and custom-built with Next.js, responsive Tailwind CSS, and blazing-fast performance.
                  </p>
                  <div className="pt-2 flex justify-center gap-2">
                    <button className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md ${selectedColor.previewAccent}`}>
                      Explore {selectedBusiness.name}
                    </button>
                    <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10">
                      Learn More
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Services Grid Block */}
              {selectedSections.includes("services") && (
                <div className="space-y-3">
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Features & Modules</span>
                    <h4 className="text-sm font-bold text-white">Engineered For Your Scale</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {selectedBusiness.suggestedPages.map((page, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border text-left ${selectedColor.previewCard}`}>
                        <div className="w-5 h-5 rounded-md bg-white/10 text-white flex items-center justify-center text-[10px] font-bold mb-1.5">
                          0{idx + 1}
                        </div>
                        <div className="text-xs font-bold text-white">{page}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">Optimized UX module</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Portfolio Showcase Block */}
              {selectedSections.includes("portfolio") && (
                <div className={`p-4 rounded-2xl border space-y-2 ${selectedColor.previewCard}`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Shipped Work & Demos</span>
                    <span className="text-[10px] text-gray-400">Production Assets</span>
                  </div>
                  <div className="h-20 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-gray-400 text-xs font-mono">
                    [ Interactive Project Gallery Preview ]
                  </div>
                </div>
              )}

              {/* 4. Pricing / Packages Block */}
              {selectedSections.includes("pricing") && (
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${selectedColor.previewCard}`}>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Estimated Starting Package</span>
                    <div className="text-base font-black text-white">{selectedBusiness.baseBudget}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${selectedColor.previewAccent}`}>
                    Custom Scope
                  </span>
                </div>
              )}

              {/* 5. About Founder Block */}
              {selectedSections.includes("about") && (
                <div className="p-3.5 rounded-xl border border-white/10 bg-dark-900/60 text-left text-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold shrink-0">
                    AL
                  </div>
                  <div>
                    <div className="font-bold text-white">Architected by Akshaj Lodhi</div>
                    <div className="text-[10px] text-gray-400">Founder & Developer, AKSHAJ WEB STUDIO</div>
                  </div>
                </div>
              )}

              {/* 6. Contact Form Block */}
              {selectedSections.includes("contact") && (
                <div className={`p-4 rounded-2xl border text-center space-y-2 ${selectedColor.previewCard}`}>
                  <span className="text-xs font-bold text-white">Ready To Launch {displayName}?</span>
                  <div className="flex gap-2 max-w-xs mx-auto">
                    <div className="flex-1 bg-dark-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] text-gray-400 text-left">
                      Enter email...
                    </div>
                    <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${selectedColor.previewAccent}`}>
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Bar & Disclaimer */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/30 space-y-4 shadow-gold-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-gold-400 uppercase font-bold tracking-wider block mb-1">
                  Ready to turn this preview into production code?
                </span>
                <h4 className="text-lg font-bold text-white">
                  Get My {selectedBusiness.name}
                </h4>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleCopySpec}
                  className="px-4 py-3 rounded-xl border border-white/15 bg-dark-900 hover:bg-dark-850 text-xs font-bold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy Config"}</span>
                </button>

                <Link
                  href={hireUrl}
                  className="flex-1 sm:flex-initial btn-gold px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-gold-sm"
                >
                  <span>Get My Website</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Required Disclaimer */}
            <p className="text-[10px] text-gray-400 border-t border-white/5 pt-3 leading-relaxed">
              <span className="font-semibold text-gold-300">Notice:</span> This interactive builder provides a visual architecture preview. Production websites are custom engineered, tested, and deployed directly by Akshaj Lodhi at AKSHAJ WEB STUDIO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
