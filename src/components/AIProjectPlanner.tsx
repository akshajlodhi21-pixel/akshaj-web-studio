"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  GraduationCap,
  ShoppingBag,
  User,
  Cpu,
  Layers,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  Loader2,
  AlertCircle,
  Calendar,
  ShieldCheck,
  FileText,
  Search,
  Mail,
  TrendingUp,
  MessageSquare,
  Globe,
  Star,
  Calculator,
  Phone,
  ExternalLink,
  Laptop,
  Zap,
  RotateCcw,
  Check,
  CreditCard,
  Bot,
  Smartphone,
  Info,
  Clock,
  ChevronRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useStudioStore } from "@/lib/store";

// ============================================================================
// DATA DEFINITIONS & OPTIONS
// ============================================================================

export interface ProjectTypeOption {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  recommendedFor: string;
  basePriceInr: number;
  baseDays: number;
}

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: "business",
    name: "Business Website",
    badge: "Most Popular",
    icon: Building2,
    tagline: "Corporate Portals & High-Converting Agencies",
    description: "Authority-building multi-page business website designed to establish credibility and capture high-intent leads.",
    recommendedFor: "Consultancies, Agencies, B2B Companies, Service Firms",
    basePriceInr: 24999,
    baseDays: 10,
  },
  {
    id: "school",
    name: "School Website",
    badge: "Institutional",
    icon: GraduationCap,
    tagline: "Educational Academies & Institutional Hubs",
    description: "Structured portal for schools, colleges, and institutes with admissions info, notices, faculty directory, and syllabus.",
    recommendedFor: "K-12 Schools, Colleges, Coaching Academies, Training Institutes",
    basePriceInr: 26999,
    baseDays: 12,
  },
  {
    id: "ecommerce",
    name: "E-commerce Website",
    badge: "High Growth",
    icon: ShoppingBag,
    tagline: "Direct-to-Consumer Stores & Product Catalogs",
    description: "Fast digital storefront with product showcase, shopping cart, instant UPI/card payment checkout, and order receipts.",
    recommendedFor: "Retail Brands, D2C Sellers, Fashion, Digital Product Creators",
    basePriceInr: 34999,
    baseDays: 14,
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    badge: "Personal Brand",
    icon: User,
    tagline: "Creative Directors, Developers & Executives",
    description: "Sleek, bespoke visual showcase with interactive project cards, case studies, verified biodata, and direct booking.",
    recommendedFor: "Software Engineers, Designers, Architects, Executives, Photographers",
    basePriceInr: 17999,
    baseDays: 7,
  },
  {
    id: "webapp",
    name: "Web Application",
    badge: "SaaS & Systems",
    icon: Laptop,
    tagline: "Custom SaaS, Client Portals & Dashboards",
    description: "Dynamic full-stack web application with secure user authentication, role-based dashboards, database models, and custom workflows.",
    recommendedFor: "Tech Startups, Internal Operations, Client Portals, Booking Platforms",
    basePriceInr: 44999,
    baseDays: 21,
  },
  {
    id: "ai-app",
    name: "AI-powered Application",
    badge: "Futuristic",
    icon: Bot,
    tagline: "Intelligent LLM Chatbots & Automated Workflows",
    description: "Next-generation software featuring Gemini/OpenAI API integrations, intelligent conversational UI, automated prompt flows, and vector search.",
    recommendedFor: "AI Startups, Automated Support Desks, Smart Analytics, Content Engines",
    basePriceInr: 49999,
    baseDays: 21,
  },
  {
    id: "other",
    name: "Other (Custom Concept)",
    badge: "Bespoke",
    icon: Sliders,
    tagline: "Tailored Digital Architecture For Unique Ideas",
    description: "Specialized digital product engineered from the ground up to match non-standard business logic and innovative concepts.",
    recommendedFor: "Custom Inventions, Hybrid Systems, Unique Community Platforms",
    basePriceInr: 29999,
    baseDays: 14,
  },
];

export interface PageCountOption {
  id: string;
  label: string;
  sub: string;
  addPriceInr: number;
  addDays: number;
}

export const PAGE_COUNT_OPTIONS: PageCountOption[] = [
  { id: "1-3", label: "1 - 3 Pages", sub: "Landing Page / MVP Starter", addPriceInr: 0, addDays: 0 },
  { id: "4-7", label: "4 - 7 Pages", sub: "Standard Multi-Page Business Hub", addPriceInr: 5000, addDays: 3 },
  { id: "8-15", label: "8 - 15 Pages", sub: "Comprehensive Portal / Department Hub", addPriceInr: 12000, addDays: 7 },
  { id: "16+", label: "16+ Pages", sub: "Deep Enterprise Architecture", addPriceInr: 22000, addDays: 12 },
];

export interface FeatureOption {
  id: string;
  name: string;
  category: "Core" | "Engagement" | "Technical";
  icon: React.ElementType;
  description: string;
  addPriceInr: number;
  isStandard?: boolean;
}

export const FEATURE_OPTIONS: FeatureOption[] = [
  {
    id: "auth",
    name: "User Accounts & Authentication",
    category: "Technical",
    icon: ShieldCheck,
    description: "Secure login, signup, session tokens & password recovery",
    addPriceInr: 6000,
  },
  {
    id: "cms",
    name: "CMS / Blog / News Updates",
    category: "Engagement",
    icon: FileText,
    description: "Publish articles, announcements, and notice updates easily",
    addPriceInr: 4500,
  },
  {
    id: "search",
    name: "Search & Advanced Filtering",
    category: "Technical",
    icon: Search,
    description: "Instant search bar with faceted category & tag filters",
    addPriceInr: 4000,
  },
  {
    id: "booking",
    name: "Appointment / Consultation Scheduler",
    category: "Engagement",
    icon: Calendar,
    description: "Interactive calendar with automated time-slot reservations",
    addPriceInr: 5000,
  },
  {
    id: "forms",
    name: "Dynamic Lead & Contact Forms",
    category: "Core",
    icon: Mail,
    description: "Interactive forms with server validation & email dispatch",
    addPriceInr: 0,
    isStandard: true,
  },
  {
    id: "seo",
    name: "Technical SEO & Search Console",
    category: "Core",
    icon: TrendingUp,
    description: "Schema.org markup, XML sitemap, meta tags & indexing verification",
    addPriceInr: 0,
    isStandard: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Floating Connect",
    category: "Engagement",
    icon: MessageSquare,
    description: "Direct one-click customer communication widget",
    addPriceInr: 0,
    isStandard: true,
  },
  {
    id: "multilang",
    name: "Multi-language Support (i18n)",
    category: "Technical",
    icon: Globe,
    description: "Bilingual or multi-language localization switcher",
    addPriceInr: 7000,
  },
  {
    id: "testimonials",
    name: "Client Testimonials & Trust Strip",
    category: "Core",
    icon: Star,
    description: "Verified social proof display with review carousel",
    addPriceInr: 0,
    isStandard: true,
  },
  {
    id: "calculator",
    name: "Interactive Cost / Pricing Calculator",
    category: "Engagement",
    icon: Calculator,
    description: "Bespoke quote estimator for your clients",
    addPriceInr: 4500,
  },
];

export interface SelectionOption {
  id: string;
  label: string;
  description: string;
  addPriceInr: number;
}

export const DESIGN_PREFERENCES: SelectionOption[] = [
  {
    id: "gold-dark",
    label: "Signature Black & Gold",
    description: "Futuristic dark tech aesthetic with warm luxury gold glow accents (Studio Standard)",
    addPriceInr: 0,
  },
  {
    id: "minimal-clean",
    label: "Clean Minimalist Modern",
    description: "Crisp architectural styling, airy typography, generous whitespace, and sharp contrast",
    addPriceInr: 0,
  },
  {
    id: "cyber-bold",
    label: "High-Tech Cyberpunk",
    description: "Electric cyan and neon accents, dark terminal widgets, glowing perimeter borders",
    addPriceInr: 3000,
  },
  {
    id: "executive-corporate",
    label: "Executive Corporate",
    description: "Deep navy and slate authority styling tailored for law firms, finance, and institutions",
    addPriceInr: 0,
  },
];

export const RESPONSIVENESS_OPTIONS: SelectionOption[] = [
  {
    id: "responsive",
    label: "100% Fluid Responsive (Standard)",
    description: "Seamless layout adaptation across modern mobile smartphones, tablets, laptops, and ultra-wide screens",
    addPriceInr: 0,
  },
  {
    id: "pwa",
    label: "Progressive Web App (PWA Enhanced)",
    description: "Installable directly onto Android & iOS home screens with offline caching and app-like navigation",
    addPriceInr: 6000,
  },
];

export const ADMIN_OPTIONS: SelectionOption[] = [
  {
    id: "none",
    label: "No Admin Dashboard",
    description: "Static website architecture with direct code maintenance (ideal for budget landing pages)",
    addPriceInr: 0,
  },
  {
    id: "standard",
    label: "Standard Admin Dashboard",
    description: "Password-protected control panel to review inquiries, update basic text/images, and manage settings",
    addPriceInr: 7000,
  },
  {
    id: "advanced",
    label: "Advanced Enterprise CMS & CRM",
    description: "Comprehensive portal with client record filtering, export to CSV, user roles, and activity metrics",
    addPriceInr: 15000,
  },
];

export const PAYMENT_OPTIONS: SelectionOption[] = [
  {
    id: "none",
    label: "No Online Payments Needed",
    description: "For informational, portfolio, and lead-generation websites that do not collect money online",
    addPriceInr: 0,
  },
  {
    id: "upi-qr",
    label: "Instant UPI & Dynamic QR Pay",
    description: "Direct zero-fee transfers via PhonePe, Google Pay, Paytm, BHIM, and bank transfers",
    addPriceInr: 2500,
  },
  {
    id: "gateway",
    label: "Online Payment Gateway (Razorpay / Stripe)",
    description: "Accept Credit/Debit Cards, NetBanking, UPI, and automated payment verification with webhooks",
    addPriceInr: 6500,
  },
  {
    id: "global",
    label: "Dual Domestic & International Gateway",
    description: "Razorpay for Indian Rupee transfers + Stripe for USD/EUR international checkout",
    addPriceInr: 11000,
  },
];

export const AI_OPTIONS: SelectionOption[] = [
  {
    id: "none",
    label: "Standard Digital Experience (No AI)",
    description: "High-speed clean software without artificial intelligence integrations",
    addPriceInr: 0,
  },
  {
    id: "chatbot",
    label: "Smart AI Website Assistant",
    description: "Embedded 24/7 conversational assistant to answer visitor FAQs, explain services, and gather leads",
    addPriceInr: 6500,
  },
  {
    id: "recommendation",
    label: "AI Recommendation & Smart Querying",
    description: "Semantic search and intelligent recommendations tailored to user interest patterns",
    addPriceInr: 11000,
  },
  {
    id: "agent",
    label: "Full Generative AI & LLM Workflow",
    description: "Custom reasoning pipelines, document analysis, automated content generation, or agentic tools",
    addPriceInr: 18000,
  },
];

// RFC 5322 Compliant Email Regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function AIProjectPlanner() {
  const store = useStudioStore();

  // Wizard Navigation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Selections
  const [selectedTypeId, setSelectedTypeId] = useState<string>("business");
  const [customTypeName, setCustomTypeName] = useState<string>("");
  const [pageCountId, setPageCountId] = useState<string>("4-7");
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([
    "forms",
    "seo",
    "whatsapp",
    "testimonials",
  ]);
  const [designPreferenceId, setDesignPreferenceId] = useState<string>("gold-dark");
  const [responsivenessId, setResponsivenessId] = useState<string>("responsive");
  const [adminDashboardId, setAdminDashboardId] = useState<string>("standard");
  const [paymentIntegrationId, setPaymentIntegrationId] = useState<string>("none");
  const [aiIntegrationId, setAiIntegrationId] = useState<string>("chatbot");

  // Form State
  const [clientName, setClientName] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("+91 ");
  const [projectNotes, setProjectNotes] = useState<string>("");
  const [isNotesEdited, setIsNotesEdited] = useState<boolean>(false);

  // Status & Validation
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [inquiryResultId, setInquiryResultId] = useState<string>("");
  const [serverError, setServerError] = useState<string | null>(null);

  // Current selected objects
  const selectedType = useMemo(
    () => PROJECT_TYPES.find((t) => t.id === selectedTypeId) || PROJECT_TYPES[0],
    [selectedTypeId]
  );
  const selectedPageCount = useMemo(
    () => PAGE_COUNT_OPTIONS.find((p) => p.id === pageCountId) || PAGE_COUNT_OPTIONS[1],
    [pageCountId]
  );
  const selectedDesign = useMemo(
    () => DESIGN_PREFERENCES.find((d) => d.id === designPreferenceId) || DESIGN_PREFERENCES[0],
    [designPreferenceId]
  );
  const selectedResponsiveness = useMemo(
    () => RESPONSIVENESS_OPTIONS.find((r) => r.id === responsivenessId) || RESPONSIVENESS_OPTIONS[0],
    [responsivenessId]
  );
  const selectedAdmin = useMemo(
    () => ADMIN_OPTIONS.find((a) => a.id === adminDashboardId) || ADMIN_OPTIONS[1],
    [adminDashboardId]
  );
  const selectedPayment = useMemo(
    () => PAYMENT_OPTIONS.find((p) => p.id === paymentIntegrationId) || PAYMENT_OPTIONS[0],
    [paymentIntegrationId]
  );
  const selectedAi = useMemo(
    () => AI_OPTIONS.find((ai) => ai.id === aiIntegrationId) || AI_OPTIONS[1],
    [aiIntegrationId]
  );

  // Feature Toggle
  const toggleFeature = (id: string, isStandard?: boolean) => {
    if (isStandard) return; // Keep standard features included
    setSelectedFeatureIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculation Engine
  const calculation = useMemo(() => {
    let totalInr = selectedType.basePriceInr;
    let totalDays = selectedType.baseDays;

    totalInr += selectedPageCount.addPriceInr;
    totalDays += selectedPageCount.addDays;

    totalInr += selectedDesign.addPriceInr;
    totalInr += selectedResponsiveness.addPriceInr;
    totalInr += selectedAdmin.addPriceInr;
    totalInr += selectedPayment.addPriceInr;
    totalInr += selectedAi.addPriceInr;

    // Features
    selectedFeatureIds.forEach((fId) => {
      const feat = FEATURE_OPTIONS.find((f) => f.id === fId);
      if (feat && !feat.isStandard) {
        totalInr += feat.addPriceInr;
        totalDays += 1;
      }
    });

    const minInr = Math.round((totalInr * 0.9) / 500) * 500;
    const maxInr = Math.round((totalInr * 1.15) / 500) * 500;
    const minUsd = Math.round(minInr / 83);
    const maxUsd = Math.round(maxInr / 83);

    const minWeeks = Math.max(1, Math.floor(totalDays / 7));
    const calculatedMaxWeeks = Math.ceil(totalDays / 5);
    const maxWeeks = calculatedMaxWeeks > minWeeks ? calculatedMaxWeeks : minWeeks + 1;

    return {
      baseInr: totalInr,
      minInr,
      maxInr,
      minUsd,
      maxUsd,
      minWeeks,
      maxWeeks,
      formattedRange: `₹${minInr.toLocaleString("en-IN")} - ₹${maxInr.toLocaleString("en-IN")}`,
      formattedRangeUsd: `$${minUsd} - $${maxUsd}`,
      timeline: `${minWeeks} - ${maxWeeks} Weeks`,
    };
  }, [
    selectedType,
    selectedPageCount,
    selectedDesign,
    selectedResponsiveness,
    selectedAdmin,
    selectedPayment,
    selectedAi,
    selectedFeatureIds,
  ]);

  // Pre-generate structured blueprint note for the smart inquiry form
  useEffect(() => {
    if (!isNotesEdited) {
      const featureNames = selectedFeatureIds
        .map((id) => FEATURE_OPTIONS.find((f) => f.id === id)?.name)
        .filter(Boolean)
        .join(", ");

      const typeLabel =
        selectedTypeId === "other" && customTypeName.trim()
          ? `Custom Concept: ${customTypeName.trim()}`
          : selectedType.name;

      const generated = [
        `PROJECT BLUEPRINT SUMMARY:`,
        `• Target Solution: ${typeLabel}`,
        `• Page Scope: ${selectedPageCount.label} (${selectedPageCount.sub})`,
        `• Design Aesthetic: ${selectedDesign.label}`,
        `• Mobile Experience: ${selectedResponsiveness.label}`,
        `• Admin Dashboard: ${selectedAdmin.label}`,
        `• Payment Setup: ${selectedPayment.label}`,
        `• AI Integration: ${selectedAi.label}`,
        `• Selected Features: ${featureNames || "Standard Pack"}`,
        `• Indicative Budget Range: ${calculation.formattedRange} (${calculation.formattedRangeUsd})`,
        `• Estimated Timeline: ${calculation.timeline}`,
        ``,
        `ADDITIONAL CLIENT REQUIREMENTS:`,
        `I would like to discuss this project blueprint with Akshaj Lodhi and receive a formal project proposal.`,
      ].join("\n");

      setProjectNotes(generated);
    }
  }, [
    selectedType,
    selectedTypeId,
    customTypeName,
    selectedPageCount,
    selectedDesign,
    selectedResponsiveness,
    selectedAdmin,
    selectedPayment,
    selectedAi,
    selectedFeatureIds,
    calculation,
    isNotesEdited,
  ]);

  // Form Submission Handler
  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!clientName.trim() || clientName.trim().length < 2) {
      errors.name = "Please provide your full name (at least 2 characters).";
    }

    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      errors.phone = "Please enter a valid contact phone number (at least 8 digits).";
    }

    if (!projectNotes.trim() || projectNotes.trim().length < 15) {
      errors.notes = "Please provide project details (at least 15 characters).";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setServerError(null);
    setIsSubmitting(true);

    const typeTitle =
      selectedTypeId === "other" && customTypeName.trim()
        ? `Custom: ${customTypeName.trim()}`
        : selectedType.name;

    const payload = {
      clientName: clientName.trim(),
      businessName: businessName.trim() || undefined,
      email: email.trim(),
      phoneNumber: phone.trim(),
      whatsappNumber: phone.trim(),
      requiredService: `AI Project Planner - ${typeTitle}`,
      budget: `${calculation.formattedRange} (${calculation.formattedRangeUsd})`,
      expectedDeadline: `${calculation.timeline} (Standard Delivery)`,
      projectDescription: projectNotes.trim(),
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "Failed to submit project plan. Please try again.");
      }

      // Sync into client store for local immediate reflection & admin dashboard
      if (resData.inquiry) {
        store.addInquiry(resData.inquiry);
      }

      setInquiryResultId(resData.inquiryId || "AWS-REQ-PLANNED");
      setSubmissionSuccess(true);
    } catch (err: any) {
      setServerError(
        err.message || "An unexpected error occurred while processing your request. Please try again or reach out on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedTypeId("business");
    setCustomTypeName("");
    setPageCountId("4-7");
    setSelectedFeatureIds(["forms", "seo", "whatsapp", "testimonials"]);
    setDesignPreferenceId("gold-dark");
    setResponsivenessId("responsive");
    setAdminDashboardId("standard");
    setPaymentIntegrationId("none");
    setAiIntegrationId("chatbot");
    setClientName("");
    setBusinessName("");
    setEmail("");
    setPhone("+91 ");
    setProjectNotes("");
    setIsNotesEdited(false);
    setSubmissionSuccess(false);
    setInquiryResultId("");
    setServerError(null);
    setCurrentStep(1);
  };

  // WhatsApp Pre-filled message generator
  const cleanWhatsAppTarget = store.contact.whatsapp.replace(/[^0-9]/g, "") || "919198562197";
  const whatsappPreFilledText = encodeURIComponent(
    `Hello Akshaj Lodhi, I just designed my project blueprint on the AKSHAJ WEB STUDIO AI Project Planner.\n\n` +
      `• Reference ID: ${inquiryResultId || "NEW-PROJECT"}\n` +
      `• Project Type: ${selectedType.name}\n` +
      `• Scope: ${selectedPageCount.label}\n` +
      `• Indicative Budget: ${calculation.formattedRange}\n` +
      `• Timeline: ${calculation.timeline}\n\n` +
      `I would like to discuss next steps and reserve an engineering slot.`
  );
  const waDiscussUrl = `https://wa.me/${cleanWhatsAppTarget}?text=${whatsappPreFilledText}`;

  return (
    <section id="ai-project-planner" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <SectionHeading
        badge="AI Website Project Planner"
        title="Architect Your Digital Vision In Minutes"
        subtitle="Select your project parameters, customize features, see live transparent investment ranges, and receive a comprehensive project blueprint directly from Founder Akshaj Lodhi."
      />

      {/* Multi-Step Progress Stepper */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 p-2 rounded-2xl glass-panel border border-gold-500/20 text-center">
          <button
            onClick={() => setCurrentStep(1)}
            className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              currentStep === 1
                ? "bg-gold-500 text-dark-950 shadow-gold-sm"
                : currentStep > 1
                ? "text-gold-300 hover:text-white bg-gold-500/10"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
              {currentStep > 1 ? "✓" : "1"}
            </span>
            <span className="truncate">1. Project Type</span>
          </button>

          <button
            onClick={() => setCurrentStep(2)}
            className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              currentStep === 2
                ? "bg-gold-500 text-dark-950 shadow-gold-sm"
                : currentStep > 2
                ? "text-gold-300 hover:text-white bg-gold-500/10"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
              {currentStep > 2 ? "✓" : "2"}
            </span>
            <span className="truncate">2. Customization</span>
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              currentStep === 3
                ? "bg-gold-500 text-dark-950 shadow-gold-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
              3
            </span>
            <span className="truncate">3. Blueprint & Enquiry</span>
          </button>
        </div>
      </div>

      {/* Floating Live Indicator Banner */}
      <div className="mb-8 max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-dark-900/90 border border-gold-500/30 backdrop-blur-md shadow-gold-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-gold-400 uppercase tracking-wider">
              Live Project Selection
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{selectedTypeId === "other" && customTypeName.trim() ? customTypeName : selectedType.name}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300 font-normal">{selectedPageCount.label}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
              Indicative Range
            </div>
            <div className="text-base sm:text-lg font-black text-gold-gradient font-mono">
              {calculation.formattedRange}
            </div>
          </div>

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep((prev) => ((prev + 1) as 1 | 2 | 3))}
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                const formEl = document.getElementById("planner-enquiry-form");
                if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
            >
              <span>Discuss Project</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ====================================================================
          STEP 1: INTERACTIVE PROJECT BUILDER (WHAT DO YOU WANT TO BUILD?)
         ==================================================================== */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Step 1: What Type Of Digital Solution Do You Want To Build?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Choose the foundational category that best matches your vision. Every option includes full responsive architecture, modern security, and technical SEO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECT_TYPES.map((type) => {
              const IconComp = type.icon;
              const isSelected = selectedTypeId === type.id;

              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedTypeId(type.id)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 relative group flex flex-col justify-between ${
                    isSelected
                      ? "bg-gold-500/10 border-2 border-gold-400 shadow-gold-md -translate-y-1"
                      : "glass-panel glass-panel-hover border border-white/10 hover:border-gold-500/40"
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${
                        isSelected
                          ? "bg-gold-500 text-dark-950 border-gold-400 font-bold"
                          : "bg-white/5 text-gray-400 border-white/10"
                      }`}
                    >
                      {type.badge}
                    </span>

                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-gold-400 bg-gold-500 text-dark-950"
                          : "border-white/20 text-transparent group-hover:border-gold-400/50"
                      }`}
                    >
                      ✓
                    </div>
                  </div>

                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                        isSelected
                          ? "bg-gold-500/20 text-gold-300 border border-gold-400/40"
                          : "bg-dark-900 text-gray-300 border border-white/10 group-hover:text-gold-400 group-hover:border-gold-500/30"
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-gold-300 transition-colors">
                      {type.name}
                    </h4>
                    <div className="text-xs font-mono text-gold-400/90 mb-3">{type.tagline}</div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">{type.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="text-[11px] text-gray-400">
                      <span className="text-gray-500">Best for: </span>
                      <span className="text-gray-300 font-medium">{type.recommendedFor}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-mono text-gray-400">Starting From</span>
                      <span className="font-bold text-gold-300 font-mono">
                        ₹{type.basePriceInr.toLocaleString("en-IN")}+
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom concept name field if "other" is selected */}
          {selectedTypeId === "other" && (
            <div className="p-6 rounded-2xl glass-panel border border-gold-500/30 max-w-xl mx-auto space-y-2 animate-fade-in">
              <label className="block text-xs font-bold text-gold-300 uppercase tracking-wider font-mono">
                Describe Your Custom Concept Name (e.g. Real Estate Portal, Event Booking, Fintech)
              </label>
              <input
                type="text"
                value={customTypeName}
                onChange={(e) => setCustomTypeName(e.target.value)}
                placeholder="Enter your custom project type"
                className="w-full bg-dark-900 border border-white/20 focus:border-gold-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors"
              />
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-gold-sm"
            >
              <span>Proceed to Customization</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          STEP 2: PROJECT CUSTOMIZATION (PAGES, FEATURES, DESIGN, TECH)
         ==================================================================== */}
      {currentStep === 2 && (
        <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Step 2: Customize Your Project Scope & Capabilities
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Tailor pages, required features, UI/UX aesthetics, and integrations. Every choice recalculates the project scope in real time.
            </p>
          </div>

          {/* 1. NUMBER OF PAGES */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-mono text-xs font-bold">
                A
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Estimated Number Of Pages</h4>
                <p className="text-xs text-gray-400">Select the anticipated architectural scale of your website or app</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PAGE_COUNT_OPTIONS.map((opt) => {
                const isSelected = pageCountId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPageCountId(opt.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? "bg-gold-500/15 border-gold-400 text-white shadow-gold-sm"
                        : "bg-dark-900/80 border-white/10 text-gray-300 hover:border-gold-500/30 hover:bg-dark-850"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">{opt.label}</span>
                      <span
                        className={`w-4 h-4 rounded-full border text-[10px] flex items-center justify-center ${
                          isSelected ? "bg-gold-500 text-dark-950 border-gold-400" : "border-white/20"
                        }`}
                      >
                        {isSelected ? "✓" : ""}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-snug">{opt.sub}</p>
                    {opt.addPriceInr > 0 && (
                      <span className="inline-block mt-2 text-[10px] font-mono text-gold-400/90">
                        +₹{opt.addPriceInr.toLocaleString("en-IN")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. REQUIRED FEATURES (CHECKBOX CARDS) */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-mono text-xs font-bold">
                  B
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Required Features & Modules</h4>
                  <p className="text-xs text-gray-400">Select all capabilities required for your project</p>
                </div>
              </div>
              <span className="text-xs font-mono text-gold-400 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                {selectedFeatureIds.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {FEATURE_OPTIONS.map((feat) => {
                const IconComp = feat.icon;
                const isChecked = selectedFeatureIds.includes(feat.id);

                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id, feat.isStandard)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-start gap-3 select-none ${
                      isChecked
                        ? "bg-gold-500/10 border-gold-400/70 shadow-gold-sm"
                        : "bg-dark-900/70 border-white/10 hover:border-white/20"
                    } ${feat.isStandard ? "opacity-90" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked
                          ? "bg-gold-500 text-dark-950 font-bold"
                          : "bg-white/5 text-gray-400 border border-white/10"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-xs text-white truncate">{feat.name}</span>
                        {feat.isStandard ? (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold uppercase">
                            Included
                          </span>
                        ) : feat.addPriceInr > 0 ? (
                          <span className="text-[10px] font-mono text-gold-400 shrink-0">
                            +₹{feat.addPriceInr.toLocaleString("en-IN")}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. DESIGN PREFERENCES & MOBILE RESPONSIVENESS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Design Preferences */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center font-mono text-xs font-bold">
                  C
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Design Aesthetics
                </h4>
              </div>

              <div className="space-y-2.5">
                {DESIGN_PREFERENCES.map((d) => {
                  const isSel = designPreferenceId === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDesignPreferenceId(d.id)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                        isSel
                          ? "bg-gold-500/15 border-gold-400 text-white shadow-gold-sm"
                          : "bg-dark-900 border-white/10 text-gray-300 hover:border-gold-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs text-white">{d.label}</span>
                        {d.addPriceInr > 0 && (
                          <span className="text-[10px] font-mono text-gold-400">+₹{d.addPriceInr}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">{d.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Responsiveness */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center font-mono text-xs font-bold">
                  D
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Mobile Architecture
                </h4>
              </div>

              <div className="space-y-2.5">
                {RESPONSIVENESS_OPTIONS.map((r) => {
                  const isSel = responsivenessId === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setResponsivenessId(r.id)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                        isSel
                          ? "bg-gold-500/15 border-gold-400 text-white shadow-gold-sm"
                          : "bg-dark-900 border-white/10 text-gray-300 hover:border-gold-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs text-white">{r.label}</span>
                        {r.addPriceInr > 0 && (
                          <span className="text-[10px] font-mono text-gold-400">
                            +₹{r.addPriceInr.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">{r.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. ADMIN DASHBOARD, PAYMENTS & AI INTEGRATIONS */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-mono text-xs font-bold">
                E
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Backend, Payments & AI Integration</h4>
                <p className="text-xs text-gray-400">Configure administrative management, transaction processing, and intelligent assistants</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Admin Dashboard */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-bold block">
                  Admin Control Panel
                </span>
                <div className="space-y-2">
                  {ADMIN_OPTIONS.map((a) => {
                    const isSel = adminDashboardId === a.id;
                    return (
                      <div
                        key={a.id}
                        onClick={() => setAdminDashboardId(a.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSel
                            ? "bg-gold-500/15 border-gold-400 text-white"
                            : "bg-dark-900 border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <div className="font-bold text-xs text-white mb-0.5">{a.label}</div>
                        <p className="text-[10px] text-gray-400 leading-tight">{a.description}</p>
                        {a.addPriceInr > 0 && (
                          <span className="text-[10px] font-mono text-gold-400 mt-1 block">
                            +₹{a.addPriceInr.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Integration */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-bold block">
                  Payment Processing
                </span>
                <div className="space-y-2">
                  {PAYMENT_OPTIONS.map((p) => {
                    const isSel = paymentIntegrationId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPaymentIntegrationId(p.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSel
                            ? "bg-gold-500/15 border-gold-400 text-white"
                            : "bg-dark-900 border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <div className="font-bold text-xs text-white mb-0.5">{p.label}</div>
                        <p className="text-[10px] text-gray-400 leading-tight">{p.description}</p>
                        {p.addPriceInr > 0 && (
                          <span className="text-[10px] font-mono text-gold-400 mt-1 block">
                            +₹{p.addPriceInr.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Integration */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-bold block">
                  AI & Intelligent Agents
                </span>
                <div className="space-y-2">
                  {AI_OPTIONS.map((ai) => {
                    const isSel = aiIntegrationId === ai.id;
                    return (
                      <div
                        key={ai.id}
                        onClick={() => setAiIntegrationId(ai.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSel
                            ? "bg-gold-500/15 border-gold-400 text-white"
                            : "bg-dark-900 border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <div className="font-bold text-xs text-white mb-0.5">{ai.label}</div>
                        <p className="text-[10px] text-gray-400 leading-tight">{ai.description}</p>
                        {ai.addPriceInr > 0 && (
                          <span className="text-[10px] font-mono text-gold-400 mt-1 block">
                            +₹{ai.addPriceInr.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 rounded-xl border border-white/15 bg-dark-900 text-gray-300 hover:text-white hover:border-white/30 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Project Type</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-gold-sm"
            >
              <span>View Live Summary & Smart Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          STEP 3: LIVE PROJECT SUMMARY & SMART ENQUIRY FORM
         ==================================================================== */}
      {currentStep === 3 && (
        <div className="space-y-10 animate-fade-in max-w-6xl mx-auto">
          {/* SUCCESS SCREEN */}
          {submissionSuccess ? (
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-dark-900 to-dark-950 border-2 border-gold-500/50 text-center shadow-gold-lg max-w-3xl mx-auto animate-fade-in space-y-6">
              <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-400 text-gold-300 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-mono text-gold-300 uppercase tracking-widest mb-3">
                  Inquiry Dispatched Successfully
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
                  Project Blueprint Received!
                </h3>
                <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                  Thank you, <span className="text-gold-300 font-bold">{clientName}</span>. Your custom{" "}
                  <span className="text-white font-semibold">{selectedType.name}</span> project blueprint has been safely delivered to Founder Akshaj Lodhi&apos;s direct inbox.
                </p>
              </div>

              {/* Inquiry Reference Pill */}
              <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 max-w-md mx-auto flex items-center justify-between font-mono text-xs">
                <span className="text-gray-400">Tracking Reference:</span>
                <span className="font-bold text-gold-300">{inquiryResultId}</span>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={waDiscussUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss Immediately on WhatsApp</span>
                </a>

                <a
                  href={`mailto:${store.contact.email || "akshajlodhi21@gmail.com"}?subject=Project%20Blueprint%20Ref:%20${inquiryResultId}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-dark-900 border border-white/15 text-xs sm:text-sm font-semibold text-gray-200 hover:text-white hover:border-gold-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-gold-400" />
                  <span>Email Akshaj Directly</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={handleReset}
                  className="text-xs text-gray-400 hover:text-gold-300 flex items-center justify-center gap-1.5 mx-auto transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Plan Another Project</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: LIVE PROJECT BLUEPRINT SUMMARY CARD (Cols 1 - 5) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-6 shadow-gold-sm sticky top-28">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-widest text-gold-400">
                        Live Project Blueprint
                      </div>
                      <h4 className="text-xl font-black text-white mt-0.5">
                        {selectedTypeId === "other" && customTypeName.trim()
                          ? customTypeName
                          : selectedType.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-gold-300 hover:text-white underline font-mono"
                    >
                      Edit Scope
                    </button>
                  </div>

                  {/* Summary Spec Grid */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-white/5">
                      <span className="text-gray-400">Page Scope:</span>
                      <span className="font-bold text-white">{selectedPageCount.label}</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-white/5">
                      <span className="text-gray-400">Design Aesthetic:</span>
                      <span className="font-bold text-gold-300">{selectedDesign.label}</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-white/5">
                      <span className="text-gray-400">Mobile Architecture:</span>
                      <span className="font-bold text-white">{selectedResponsiveness.label}</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-white/5">
                      <span className="text-gray-400">Admin Dashboard:</span>
                      <span className="font-bold text-white">{selectedAdmin.label}</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-white/5">
                      <span className="text-gray-400">Payments:</span>
                      <span className="font-bold text-white">{selectedPayment.label}</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-white/5">
                      <span className="text-gray-400">AI Capabilities:</span>
                      <span className="font-bold text-gold-300">{selectedAi.label}</span>
                    </div>
                  </div>

                  {/* Selected Features Chips */}
                  <div>
                    <span className="text-[11px] font-mono text-gray-400 block mb-2">
                      Selected Modules & Integrations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFeatureIds.map((fId) => {
                        const feat = FEATURE_OPTIONS.find((f) => f.id === fId);
                        if (!feat) return null;
                        return (
                          <span
                            key={fId}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300 flex items-center gap-1"
                          >
                            <span className="text-gold-400 text-[10px]">✓</span>
                            <span>{feat.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Timeline Highlight Box */}
                  <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                        Indicative Investment:
                      </span>
                      <span className="text-base sm:text-lg font-black text-gold-gradient font-mono">
                        {calculation.formattedRange}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gold-500/20">
                      <span>Est. Timeline:</span>
                      <span className="font-bold text-white font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold-400" />
                        <span>{calculation.timeline}</span>
                      </span>
                    </div>
                  </div>

                  {/* Transparent Quotation Disclaimer */}
                  <div className="p-3 rounded-xl bg-dark-900/90 border border-white/10 text-[11px] text-gray-400 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-200">Indicative estimate only:</strong> The final quotation depends on your exact technical requirements, customized flows, and milestone schedule.
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SMART ENQUIRY FORM (Cols 6 - 12) */}
              <div id="planner-enquiry-form" className="lg:col-span-7">
                <form
                  onSubmit={handleSubmitEnquiry}
                  className="p-6 sm:p-10 rounded-3xl glass-panel border border-gold-500/30 space-y-6 shadow-gold-sm"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-mono text-gold-400 uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Smart Project Inquiry</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Lock In Your Architecture & Discuss With Akshaj
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1">
                      Fill in your contact details below. Your customized blueprint will be delivered straight to Founder Akshaj Lodhi for immediate evaluation.
                    </p>
                  </div>

                  {serverError && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Submission Notice</div>
                        <div className="mt-0.5">{serverError}</div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full bg-dark-900 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                          formErrors.name ? "border-red-500" : "border-white/15 focus:border-gold-400"
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Business Name (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Business / Company Name <span className="text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Apex Innovations Pvt Ltd"
                        className="w-full bg-dark-900 border border-white/15 focus:border-gold-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className={`w-full bg-dark-900 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                          formErrors.email ? "border-red-500" : "border-white/15 focus:border-gold-400"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-400 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-dark-900 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors font-mono ${
                          formErrors.phone ? "border-red-500" : "border-white/15 focus:border-gold-400"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Description & Auto-Generated Blueprint Notes */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-gray-300">
                        Project Blueprint & Requirements Note *
                      </label>
                      <span className="text-[10px] text-gray-500">Auto-filled from your choices</span>
                    </div>
                    <textarea
                      rows={8}
                      value={projectNotes}
                      onChange={(e) => {
                        setProjectNotes(e.target.value);
                        setIsNotesEdited(true);
                      }}
                      className={`w-full bg-dark-900 border rounded-xl p-3.5 text-xs text-gray-200 placeholder-gray-500 font-mono leading-relaxed outline-none transition-colors ${
                        formErrors.notes ? "border-red-500" : "border-white/15 focus:border-gold-400"
                      }`}
                    />
                    {formErrors.notes && (
                      <p className="text-[11px] text-red-400 mt-1">{formErrors.notes}</p>
                    )}
                  </div>

                  {/* Action CTA: Discuss My Project Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto btn-gold px-9 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2.5 shadow-gold-md hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-dark-950" />
                          <span>Delivering Project Blueprint...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Discuss My Project</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      &larr; Modify Selections
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-500 text-center sm:text-left pt-2 border-t border-white/5">
                    🔒 <strong className="text-gray-400">Strict Privacy:</strong> Your contact details and project ideas are treated with complete confidentiality. No spam. You will be contacted directly by Founder Akshaj Lodhi.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
