"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Smartphone,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Star,
  ExternalLink,
  Layers,
  ChevronRight,
  PhoneCall,
  Briefcase,
  Play,
  User,
  Mail,
  Linkedin,
  Instagram,
  MessageSquare,
  Palette,
  Calculator,
  Lightbulb,
} from "lucide-react";
import XIcon from "@/components/XIcon";
import HeroCanvas from "@/components/HeroCanvas";
import SectionHeading from "@/components/SectionHeading";
import ServiceModal from "@/components/ServiceModal";
import ProjectModal from "@/components/ProjectModal";
import WebsiteBuilderTool from "@/components/WebsiteBuilderTool";
import CostEstimator from "@/components/CostEstimator";
import IdeaGenerator from "@/components/IdeaGenerator";
import InteractivePortfolio from "@/components/InteractivePortfolio";
import LiveContactExperience from "@/components/LiveContactExperience";
import { useStudioStore } from "@/lib/store";
import { ServiceItem, ProjectItem } from "@/lib/types";

export default function HomePage() {
  const store = useStudioStore();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="relative overflow-hidden">
      {/* ========================================================
          1. HERO SECTION (INTERACTIVE PARTICLE CANVAS & HEADLINE)
         ======================================================== */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        {/* Interactive Particle Animation Canvas */}
        <HeroCanvas />

        {/* Ambient Top Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-b from-gold-500/15 via-gold-500/5 to-transparent blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-gold-600/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-gold-400/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Futuristic Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900/90 border border-gold-500/30 text-xs text-gold-300 font-mono tracking-wider uppercase mb-6 shadow-gold-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Next-Gen Full-Stack & AI Engineering Studio</span>
          </div>

          {/* Main Display: AKSHAJ WEB STUDIO */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 leading-none">
            AKSHAJ <span className="text-gold-gradient">WEB STUDIO</span>
          </h1>

          {/* Main Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-200 tracking-wide mb-6">
            &ldquo;{store.settings.tagline}&rdquo;
          </p>

          {/* Introduction exact text */}
          <p className="max-w-3xl mx-auto text-gray-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8">
            We explore and build modern digital experiences through web development, app development, and AI-powered solutions.
          </p>

          {/* Core Navigation CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            {/* Primary CTA: Explore Our Work */}
            <Link
              href="#interactive-portfolio"
              className="btn-gold px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 group shadow-gold-md"
            >
              <Briefcase className="w-4 h-4 text-dark-950" />
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA: Start a Project */}
            <Link
              href="/hire"
              className="btn-gold-outline px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 group shadow-gold-sm"
            >
              <Sparkles className="w-4 h-4 text-gold-400 transform group-hover:scale-110 transition-transform" />
              <span>Start a Project</span>
            </Link>

            {/* Quick Access to Services & Contact */}
            <Link
              href="/services"
              className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-gold-500/40 bg-dark-900/70 hover:bg-dark-900 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-gold-400" />
              <span>Services</span>
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-gold-500/40 bg-dark-900/70 hover:bg-dark-900 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Direct Verified Contact Channels */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href={`mailto:${store.contact.email || "akshajlodhi21@gmail.com"}?subject=Project%20Inquiry%20-%20AKSHAJ%20WEB%20STUDIO`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 font-semibold transition-all shadow-[0_0_12px_rgba(212,175,55,0.15)] group"
            >
              <Mail className="w-3.5 h-3.5 text-gold-400 group-hover:scale-110 transition-transform" />
              <span>Email: {store.contact.email || "akshajlodhi21@gmail.com"}</span>
            </a>
            <a
              href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                "Hi Akshaj, I want to discuss a project with AKSHAJ WEB STUDIO."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-white font-semibold transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)] group"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>WhatsApp: {store.contact.whatsapp}</span>
            </a>
            <a
              href={store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#70b5f9] hover:text-white font-semibold transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 fill-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
            {store.contact.instagramEnabled !== false && (
              <a
                href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-orange-500/15 hover:from-purple-500/30 hover:via-pink-500/30 hover:to-orange-500/30 border border-pink-500/40 text-pink-300 hover:text-white font-semibold transition-all shadow-[0_0_15px_rgba(236,72,153,0.2)] group"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Follow Me on Instagram</span>
              </a>
            )}
            {store.contact.twitterEnabled !== false && (
              <a
                href={store.contact.twitterUrl || store.contact.socials.twitter || "https://x.com/LuckyBro199620"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-900/90 hover:bg-dark-850 border border-white/20 hover:border-gold-500/50 text-gray-200 hover:text-white font-semibold transition-all shadow-[0_0_12px_rgba(255,255,255,0.05)] group"
                title="Follow Akshaj Lodhi on X / Twitter (@LuckyBro199620)"
              >
                <XIcon className="w-3.5 h-3.5 text-gray-300 group-hover:text-gold-400 group-hover:scale-110 transition-transform" />
                <span>Follow on X</span>
              </a>
            )}
          </div>

          {/* Interactive Tools Quick Access Navigation Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <span className="text-[11px] font-mono text-gold-400 uppercase tracking-widest mr-1 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Interactive Studio Tools:</span>
            </span>
            <a
              href="#website-builder-tool"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-900/90 border border-gold-500/30 hover:border-gold-400 text-gray-200 hover:text-white transition-all hover:bg-gold-500/10 shadow-sm"
            >
              <Palette className="w-3.5 h-3.5 text-gold-400" />
              <span>Build Your Website Tool</span>
            </a>
            <a
              href="#cost-estimator"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-900/90 border border-gold-500/30 hover:border-gold-400 text-gray-200 hover:text-white transition-all hover:bg-gold-500/10 shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5 text-gold-400" />
              <span>Cost Estimator</span>
            </a>
            <a
              href="#interactive-portfolio"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-900/90 border border-gold-500/30 hover:border-gold-400 text-gray-200 hover:text-white transition-all hover:bg-gold-500/10 shadow-sm"
            >
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>Interactive Portfolio</span>
            </a>
            <a
              href="#idea-generator"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-900/90 border border-gold-500/30 hover:border-gold-400 text-gray-200 hover:text-white transition-all hover:bg-gold-500/10 shadow-sm"
            >
              <Lightbulb className="w-3.5 h-3.5 text-gold-400" />
              <span>AI Idea Generator</span>
            </a>
            <a
              href="#live-contact-experience"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-900/90 border border-gold-500/30 hover:border-gold-400 text-gray-200 hover:text-white transition-all hover:bg-gold-500/10 shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Contact</span>
            </a>
          </div>

          {/* Studio Engineering Pillars (Replacing Unverified Metrics) */}
          <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl glass-panel border border-gold-500/20 max-w-4xl mx-auto text-left shadow-gold-sm">
            <div className="p-3 border-r border-white/5 last:border-none">
              <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-gold-400" />
                <span>Full-Stack</span>
              </div>
              <div className="text-xs text-gold-300 font-mono mt-1">Next.js & TypeScript</div>
              <div className="text-[11px] text-gray-400 mt-0.5">High-speed modular web apps</div>
            </div>

            <div className="p-3 border-r border-white/5 last:border-none">
              <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-gold-400" />
                <span>AI Systems</span>
              </div>
              <div className="text-xs text-gold-300 font-mono mt-1">Gemini & LLM Agents</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Automations & custom bots</div>
            </div>

            <div className="p-3 border-r border-white/5 last:border-none">
              <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-gold-400" />
                <span>Responsive</span>
              </div>
              <div className="text-xs text-gold-300 font-mono mt-1">100% Fluid Layouts</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Mobile, tablet & desktop</div>
            </div>

            <div className="p-3">
              <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Direct Access</span>
              </div>
              <div className="text-xs text-gold-300 font-mono mt-1">Founder Engineering</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Hands-on code by Akshaj</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. BESPOKE DIGITAL OFFERINGS (SERVICES GRID)
         ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Bespoke Digital Offerings"
          title="Engineered For Exponential Growth"
          subtitle="From high-converting web applications to intelligent AI models and native Android apps, explore our full spectrum of specialized development services."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {store.services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden p-6 flex flex-col justify-between border border-gold-500/20 relative group"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 z-10 px-2.5 py-0.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-[10px] font-bold text-gold-300 uppercase tracking-wider backdrop-blur-md">
                  Popular
                </div>
              )}

              <div>
                {service.imageUrl && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-dark-900 mb-4 border border-white/5">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-wider">
                    {service.category} Solution
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-200 transition-colors">
                  {service.name}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>

                <div className="space-y-1.5 mb-6">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-mono">Starting From</span>
                  <span className="text-base font-bold text-gold-gradient">
                    {service.startingPrice}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Details
                  </button>
                  <Link
                    href={`/hire?service=${encodeURIComponent(service.name)}`}
                    className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-bold"
                  >
                    Hire Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-300 text-sm font-bold hover:bg-gold-500/20 transition-all shadow-gold-sm"
          >
            <span>View All 10 Specialized Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          3. BUILD YOUR WEBSITE INTERACTIVE TOOL
         ======================================================== */}
      <section className="border-t border-white/5">
        <WebsiteBuilderTool />
      </section>

      {/* ========================================================
          4. PROJECT COST ESTIMATOR
         ======================================================== */}
      <section className="border-t border-white/5">
        <CostEstimator />
      </section>

      {/* ========================================================
          5. INTERACTIVE PORTFOLIO & CATEGORY FILTER SHOWCASE
         ======================================================== */}
      <section className="border-t border-white/5">
        <InteractivePortfolio />
      </section>

      {/* ========================================================
          6. MEET THE FOUNDER SECTION (PRESERVING FOUNDER PHOTO & BIO)
         ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-mono uppercase tracking-widest text-gold-400 mb-3 shadow-gold-sm">
            <User className="w-3.5 h-3.5" />
            <span>Architect & Engineer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
            Meet The <span className="text-gold-gradient">Founder</span>
          </h2>
          <p className="text-sm sm:text-base text-gold-300 font-mono">
            &ldquo;Building Ideas. Creating Technology. Shaping Tomorrow.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Founder Photo with Premium Gold Border, Rounded Corners, No Stretching, Hover Animation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden glass-panel border-2 border-gold-500/50 p-2.5 shadow-gold-lg group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-dark-900 border border-gold-500/30">
                <Image
                  src={store.profile.professionalPhotoUrl || store.profile.photoUrl}
                  alt={store.profile.name || "Akshaj Lodhi"}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="p-3 rounded-xl bg-dark-950/90 border border-white/10 backdrop-blur-md">
                    <div className="text-base font-black text-white">{store.profile.name || "Akshaj Lodhi"}</div>
                    <div className="text-xs font-mono text-gold-400 font-bold">
                      {store.profile.roleTitle || "Founder & Developer"} • {store.profile.organization || "AKSHAJ WEB STUDIO"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Biography & Key Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-gold-400">
                1. Professional Introduction
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Akshaj <span className="text-gold-gradient">Lodhi</span>
              </h3>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {store.profile.bioIntro}
              </p>

              <div className="pt-3 border-t border-white/10">
                <div className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-1">
                  2. About Me & Vision
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                  {store.profile.fullBio}
                </p>
                <blockquote className="text-xs sm:text-sm text-gold-300 italic border-l-2 border-gold-500 pl-3 py-1 bg-gold-500/5 rounded-r-lg">
                  &ldquo;{store.profile.businessVision}&rdquo;
                </blockquote>
              </div>

              {/* Skills Preview Chips */}
              <div className="pt-3 border-t border-white/10">
                <div className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-2">
                  Technical Expertise
                </div>
                <div className="flex flex-wrap gap-2">
                  {store.profile.skills?.slice(0, 6).map((sk) => (
                    <span
                      key={sk.id}
                      className="px-2.5 py-1 rounded-lg bg-dark-900 border border-gold-500/20 text-xs text-gray-200 font-mono flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span>{sk.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <Link
                  href="/about"
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-gold-sm"
                >
                  <span>Explore Complete Founder Biodata</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/hire"
                  className="btn-gold-outline px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold"
                >
                  <span>Hire Me</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. AI BUSINESS IDEA GENERATOR
         ======================================================== */}
      <section className="border-t border-white/5">
        <IdeaGenerator />
      </section>

      {/* ========================================================
          8. OUR PROCESS / ENGINEERING METHODOLOGY
         ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <SectionHeading
          badge="Our Engineering Process"
          title="Structured Methodology. Predictable Results."
          subtitle="From initial conceptualization to high-availability deployment, our battle-tested workflow ensures absolute quality, clear milestones, and zero surprises."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-gold-500/20 relative group hover:border-gold-500/50 transition-all">
            <div className="text-3xl font-black font-mono text-gold-500/30 group-hover:text-gold-400/60 transition-colors mb-3">
              01
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Discovery & Blueprint</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              We define project objectives, user journeys, data architecture, and technological stack before writing any code.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/20 relative group hover:border-gold-500/50 transition-all">
            <div className="text-3xl font-black font-mono text-gold-500/30 group-hover:text-gold-400/60 transition-colors mb-3">
              02
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Bespoke UI/UX Design</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Crafting futuristic, high-contrast dark-and-gold visual layouts with fluid responsiveness across mobile, tablet, and desktop screens.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/20 relative group hover:border-gold-500/50 transition-all">
            <div className="text-3xl font-black font-mono text-gold-500/30 group-hover:text-gold-400/60 transition-colors mb-3">
              03
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Full-Stack Development</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Clean TypeScript, modular React components, and secure APIs engineered for speed, SEO excellence, and frictionless performance.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/20 relative group hover:border-gold-500/50 transition-all">
            <div className="text-3xl font-black font-mono text-gold-500/30 group-hover:text-gold-400/60 transition-colors mb-3">
              04
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Rigorous QA & Handover</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Cross-browser verification, Google Core Web Vitals optimization, live production deployment, and 30–60 days post-launch support.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. WHY CHOOSE US / VALUE PROPOSITION
         ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <SectionHeading
          badge="Engineering Excellence"
          title="Why Forward-Thinking Brands Choose Us"
          subtitle="We combine world-class design aesthetics with enterprise-grade engineering principles to deliver software that outperforms and converts."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-gold-500/15">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Zero-Bloat Speed</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Sub-second page load times engineered with Next.js App Router, SSR caching, and asset optimization for maximum Core Web Vitals.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/15">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Futuristic UI/UX</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Bespoke dark and gold glassmorphic styling, fluid micro-interactions, and intuitive UX patterns that command brand authority.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/15">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">AI-Empowered</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Seamlessly embed intelligent conversational agents, automated vector search, and LLM reasoning directly into your web applications.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/15">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Founder Accountability</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Work directly with the principal software architect. No junior handoffs, transparent weekly milestones, and obsessive quality control.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. LIVE CONTACT EXPERIENCE
         ======================================================== */}
      <section className="border-t border-white/5">
        <LiveContactExperience />
      </section>

      {/* ========================================================
          11. CALL TO ACTION BANNER
         ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-gold-500/40 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950 text-center shadow-gold-lg">
          <div className="absolute inset-0 bg-gold-gradient opacity-10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready To Scale Your Digital Future?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Let&rsquo;s Build Something <span className="text-gold-gradient">Extraordinary</span> Together.
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Whether you need a flagship corporate portal, a high-converting e-commerce engine, or a full-stack AI mobile app, AKSHAJ WEB STUDIO is ready to turn your vision into digital reality.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/hire"
                className="w-full sm:w-auto btn-gold px-8 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-gold-md"
              >
                <span>Hire Me / Submit Project Request</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${store.contact.email || "akshajlodhi21@gmail.com"}?subject=Project%20Inquiry%20-%20AKSHAJ%20WEB%20STUDIO`}
                className="w-full sm:w-auto btn-gold-outline px-7 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 group"
              >
                <Mail className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
                <span>Email Me Directly</span>
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/10 hover:border-gold-500/40 bg-dark-900/70 hover:bg-dark-900 text-gray-300 hover:text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Schedule Consultation</span>
              </Link>
            </div>

            {/* Direct Channel Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>Official Gmail:</span>
                <a
                  href={`mailto:${store.contact.email || "akshajlodhi21@gmail.com"}`}
                  className="font-bold text-white hover:text-gold-300 underline"
                >
                  {store.contact.email || "akshajlodhi21@gmail.com"}
                </a>
              </span>
              <span>•</span>
              <a
                href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-white flex items-center gap-1.5 font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {store.contact.whatsapp}</span>
              </a>
              <span>•</span>
              <a
                href={store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#70b5f9] hover:text-white flex items-center gap-1.5 font-semibold"
              >
                <Linkedin className="w-3.5 h-3.5 fill-[#0A66C2]" />
                <span>Connect on LinkedIn</span>
              </a>
              {store.contact.instagramEnabled !== false && (
                <>
                  <span>•</span>
                  <a
                    href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-300 hover:text-white flex items-center gap-1.5 font-semibold group"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span>Follow Me on Instagram</span>
                  </a>
                </>
              )}
              {store.contact.twitterEnabled !== false && (
                <>
                  <span>•</span>
                  <a
                    href={store.contact.twitterUrl || store.contact.socials.twitter || "https://x.com/LuckyBro199620"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white flex items-center gap-1.5 font-semibold group"
                    title="Follow Akshaj Lodhi on X / Twitter (@LuckyBro199620)"
                  >
                    <XIcon className="w-3.5 h-3.5 text-gray-300 group-hover:text-gold-400 group-hover:scale-110 transition-transform" />
                    <span>Follow on X</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}