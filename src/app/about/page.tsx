"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  Target,
  Briefcase,
  Terminal,
  Trophy,
  UserCheck,
  Instagram,
  User,
  GraduationCap,
  Code2,
  Compass,
  Layers,
  Calendar,
  Eye,
  Check,
  Globe,
  Share2,
  Building2,
  Clock,
  Cpu,
  Zap,
  Linkedin,
} from "lucide-react";
import { useStudioStore } from "@/lib/store";

export default function AboutPage() {
  const store = useStudioStore();
  const [photoView, setPhotoView] = useState<"professional" | "personal">("professional");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");

  const currentPhoto =
    photoView === "professional"
      ? store.profile.professionalPhotoUrl || store.profile.photoUrl
      : store.profile.personalPhotoUrl || store.profile.photoUrl;

  // Extract unique skill categories
  const skillCategories = [
    "All",
    ...Array.from(new Set(store.profile.skills?.map((s) => s.category) || [])),
  ];

  const filteredSkills =
    selectedSkillCategory === "All"
      ? store.profile.skills || []
      : (store.profile.skills || []).filter((s) => s.category === selectedSkillCategory);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background radial gold glow effects */}
      <div className="absolute top-16 right-1/4 w-[500px] h-[500px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-96 left-8 w-96 h-96 bg-gold-600/5 blur-[130px] pointer-events-none rounded-full" />

      {/* Hero Header with exact required title and tagline */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-mono uppercase tracking-widest text-gold-400 mb-4 shadow-gold-sm">
          <Terminal className="w-3.5 h-3.5 text-gold-400" />
          <span>Founder Profile & Complete Biodata</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
          Meet The <span className="text-gold-gradient">Founder</span>
        </h1>

        <p className="text-lg sm:text-xl font-medium text-gold-300 font-mono tracking-wide mb-2">
          &ldquo;Building Ideas. Creating Technology. Shaping Tomorrow.&rdquo;
        </p>

        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Official biography, technical biodata, and engineering vision of <span className="text-white font-semibold">Akshaj Lodhi</span>, Founder & Developer of <span className="text-gold-400 font-semibold">AKSHAJ WEB STUDIO</span>.
        </p>
      </div>

      {/* ========================================================
          CORE FOUNDER SECTION: PHOTO ON LEFT, BIOGRAPHY ON RIGHT
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
        {/* ================= LEFT COLUMN: FOUNDER'S PHOTO ================= */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          <div className="relative rounded-3xl overflow-hidden glass-panel border-2 border-gold-500/50 p-4 shadow-gold-lg group">
            {/* Photo Selector Toggle */}
            <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-dark-900/95 border border-white/10 mb-3 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setPhotoView("professional")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  photoView === "professional"
                    ? "bg-gold-500 text-dark-950 font-bold shadow-gold-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Professional Portrait</span>
              </button>
              <button
                type="button"
                onClick={() => setPhotoView("personal")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  photoView === "personal"
                    ? "bg-gold-500 text-dark-950 font-bold shadow-gold-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Personal Photo</span>
              </button>
            </div>

            {/* Profile Photo Frame with gold border, rounded corners, no stretching, hover animation */}
            <div className="relative w-full aspect-[3/4] sm:h-[480px] lg:h-[500px] rounded-2xl overflow-hidden bg-dark-900 border border-gold-500/40">
              <Image
                src={currentPhoto}
                alt={store.profile.name || "Akshaj Lodhi"}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent pointer-events-none" />

              {/* Status Indicator */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-950/90 border border-emerald-500/50 text-[11px] font-semibold text-emerald-400 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available For Worldwide Projects</span>
                </div>
              </div>
            </div>

            {/* Founder Card Info Footer */}
            <div className="mt-4 p-3 rounded-2xl bg-dark-900/90 border border-white/5 space-y-1 text-center">
              <div className="text-base font-black text-white">{store.profile.name || "Akshaj Lodhi"}</div>
              <div className="text-xs font-mono text-gold-400 font-bold">
                {store.profile.roleTitle || "Founder & Developer"}
              </div>
              <div className="text-[11px] text-gray-400">
                {store.profile.organization || "AKSHAJ WEB STUDIO"}
              </div>
            </div>

            {/* Admin Photo Edit Link */}
            <div className="mt-3 px-3 py-2 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-between text-[11px] text-gold-300">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold-400" />
                <span>Manage photo in Admin</span>
              </span>
              <Link
                href="/admin"
                className="underline hover:text-white font-semibold flex items-center gap-1"
              >
                <span>Upload / Change</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <Link
              href="/hire"
              className="btn-gold py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-gold-sm"
            >
              <span>Hire Akshaj Lodhi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Official Connect on LinkedIn Button in Founder Profile Section */}
            <a
              href={store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/50 text-[#70b5f9] hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(10,102,194,0.25)] group"
            >
              <Linkedin className="w-4 h-4 fill-[#0A66C2] group-hover:fill-white text-[#0A66C2] group-hover:text-white transition-colors" />
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#70b5f9] group-hover:text-white transition-colors" />
            </a>

            {/* Official Follow Me on Instagram Button in Founder Profile Section */}
            {store.contact.instagramEnabled !== false && (
              <a
                href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-orange-500/15 hover:from-purple-500/25 hover:via-pink-500/25 hover:to-orange-500/25 border border-pink-500/40 hover:border-pink-400 text-pink-300 hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.2)] group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Follow Me on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 text-pink-400 group-hover:text-white transition-colors" />
              </a>
            )}

            {/* Direct Email Me Button */}
            <a
              href={`mailto:${store.contact.email || "akshajlodhi21@gmail.com"}?subject=Consultation%20with%20Akshaj%20Lodhi`}
              className="py-3 px-4 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-gold-500/30 hover:border-gold-500/60 text-gold-300 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-gold-400" />
              <span>Email Me</span>
            </a>

            <a
              href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                "Hello Akshaj Lodhi, I am interested in discussing a project with AKSHAJ WEB STUDIO."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: 8 PROFILE CONTENT SECTIONS ================= */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* ========================================================
              SECTION 1: PROFESSIONAL INTRODUCTION
             ======================================================== */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-3">
              <Terminal className="w-4 h-4" />
              <span>1. Professional Introduction</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono text-gold-300 font-semibold px-2.5 py-0.5 rounded-md bg-gold-500/10 border border-gold-500/20">
                {store.profile.roleTitle || "Founder & Developer"}
              </span>
              <span className="text-xs font-mono text-gray-400">
                • {store.profile.organization || "AKSHAJ WEB STUDIO"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Akshaj <span className="text-gold-gradient">Lodhi</span>
            </h2>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-normal mb-4">
              {store.profile.bioIntro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
                <span className="text-gold-400 font-mono font-bold block text-sm">Full-Stack</span>
                <span className="text-gray-400 text-[11px]">Bespoke Web & Apps</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
                <span className="text-gold-400 font-mono font-bold block text-sm">AI Automation</span>
                <span className="text-gray-400 text-[11px]">Intelligent Systems</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
                <span className="text-gold-400 font-mono font-bold block text-sm">Worldwide</span>
                <span className="text-gray-400 text-[11px]">Client Project Delivery</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              SECTION 2: ABOUT ME
             ======================================================== */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/20 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">
              <UserCheck className="w-4 h-4" />
              <span>2. About Me</span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              The Mind & Passion Behind The Code
            </h3>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {store.profile.fullBio}
            </p>

            {store.profile.businessJourney && (
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gold-400 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>The Digital Journey</span>
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {store.profile.businessJourney}
                </p>
              </div>
            )}
          </div>

          {/* ========================================================
              SECTION 3: MY VISION
             ======================================================== */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-3">
              <Target className="w-4 h-4" />
              <span>3. My Vision</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              Building Ideas. Creating Technology. Shaping Tomorrow.
            </h3>

            <blockquote className="text-gold-200 text-sm sm:text-base leading-relaxed italic border-l-2 border-gold-500 pl-4 py-1 mb-4 bg-gold-500/5 rounded-r-xl">
              &ldquo;{store.profile.businessVision}&rdquo;
            </blockquote>

            {store.profile.goals && (
              <div className="pt-3 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-gray-400 block mb-1">
                  Core Mission & Strategic Goals:
                </span>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {store.profile.goals}
                </p>
              </div>
            )}
          </div>

          {/* ========================================================
              SECTION 4: TECHNICAL INTERESTS
             ======================================================== */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/20">
            <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-3">
              <Compass className="w-4 h-4" />
              <span>4. Technical Interests</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Core Architectural Domains
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Areas of active engineering, research, and high-performance system design.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {store.profile.areasOfInterest?.map((interest, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-dark-900/80 border border-gold-500/20 hover:border-gold-500/40 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-200 leading-snug">
                    {interest}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              SECTION 5: SKILLS
             ======================================================== */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">
                  <Code2 className="w-4 h-4" />
                  <span>5. Skills & Proficiencies</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Technical Mastery</h3>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-dark-900 border border-white/10">
                {skillCategories.slice(0, 4).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSkillCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedSkillCategory === cat
                        ? "bg-gold-500 text-dark-950 font-bold shadow-gold-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-2xl bg-dark-900/80 border border-gold-500/20 hover:border-gold-500/40 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-gold-400" />
                    <div>
                      <div className="text-xs font-bold text-white">{skill.name}</div>
                      <div className="text-[10px] font-mono text-gold-400/80">{skill.category}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-gold-500/10 border border-gold-500/30 text-[10px] font-mono text-gold-300">
                    Verified Competency
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-right">
              <Link
                href="/admin"
                className="text-[11px] font-mono text-gold-400 hover:underline"
              >
                + Add or edit individual skills in Admin &rarr;
              </Link>
            </div>
          </div>

          {/* ========================================================
              SECTION 6: PROJECTS
             ======================================================== */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">
                  <Layers className="w-4 h-4" />
                  <span>6. Projects & Case Studies</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Shipped Digital Assets</h3>
              </div>
              <Link
                href="/portfolio"
                className="text-xs text-gold-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {store.projects.slice(0, 4).map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl overflow-hidden bg-dark-900/90 border border-white/10 hover:border-gold-500/40 transition-all flex flex-col group"
                >
                  <div className="relative w-full h-36 bg-dark-950 overflow-hidden">
                    <Image
                      src={proj.imageUrl}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-dark-950/90 text-[10px] font-mono text-gold-300 border border-gold-500/30">
                      {proj.category}
                    </span>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-dark-950/90 text-[10px] font-mono text-gold-400 border border-gold-500/30">
                      {proj.statusLabel || (proj.isConcept ? "Concept Project" : "Production")}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-gold-300 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      {proj.liveUrl ? (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-gold-400 hover:text-white flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-gray-400">Demo Preview Coming Soon</span>
                      )}
                      <Link
                        href={`/hire?service=${encodeURIComponent(proj.category)}`}
                        className="text-[11px] text-gray-300 hover:text-gold-300 font-semibold"
                      >
                        Hire Similar &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              SECTION 7: ORGANIZATION DETAILS
             ======================================================== */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-3">
              <Building2 className="w-4 h-4" />
              <span>7. Organization Details</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              AKSHAJ WEB STUDIO
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 space-y-1">
                <span className="text-gray-400 block text-[11px]">Organization Name</span>
                <span className="font-bold text-white text-sm">AKSHAJ WEB STUDIO</span>
              </div>

              <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 space-y-1">
                <span className="text-gray-400 block text-[11px]">Founder & Lead Developer</span>
                <span className="font-bold text-gold-400 text-sm">Akshaj Lodhi</span>
              </div>

              <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 space-y-1">
                <span className="text-gray-400 block text-[11px]">Official Studio Tagline</span>
                <span className="font-bold text-gray-200">
                  &ldquo;Turning Ideas Into Digital Reality.&rdquo;
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 space-y-1">
                <span className="text-gray-400 block text-[11px]">Studio Motto</span>
                <span className="font-bold text-gold-300">
                  Building Ideas. Creating Technology. Shaping Tomorrow.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 space-y-1">
                <span className="text-gray-400 block text-[11px]">Focus Capabilities</span>
                <span className="text-gray-200">
                  Websites, Android Apps, AI Workflows & Custom Software
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 space-y-1">
                <span className="text-gray-400 block text-[11px]">Operational Hours</span>
                <span className="text-gray-200">{store.contact.workingHours}</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              SECTION 8: CONTACT INFORMATION
             ======================================================== */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">
                  <Share2 className="w-4 h-4" />
                  <span>8. Contact Information</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Direct Founder Channels</h3>
              </div>
              <span className="text-[11px] font-mono text-gold-400">Available Daily</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  "Hello Akshaj Lodhi, I would like to discuss a project with AKSHAJ WEB STUDIO."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 transition-all text-xs flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-200">WhatsApp Chat</div>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      {store.contact.whatsapp}
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-[10px] uppercase font-bold text-emerald-300">
                  Chat Now
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${store.contact.businessEmail || store.contact.email}`}
                className="p-4 rounded-2xl bg-dark-900/80 hover:bg-dark-900 border border-white/10 hover:border-gold-500/40 transition-all text-xs flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Official Email</div>
                    <div className="text-[11px] text-gray-400 truncate max-w-[170px]">
                      {store.contact.businessEmail || store.contact.email}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gold-400" />
              </a>

              {/* Instagram */}
              {store.contact.instagramEnabled !== false && (
                <a
                  href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-orange-500/20 border border-pink-500/30 hover:border-pink-500/60 transition-all text-xs flex items-center justify-between group shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                      <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <div className="font-bold text-pink-200 group-hover:text-white transition-colors">Instagram Profile</div>
                      <div className="text-[11px] text-pink-400 font-mono">
                        @{store.contact.instagramUsername || "luckybro_9198"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/20 text-[10px] font-bold text-pink-300 group-hover:text-white transition-colors">
                    <span>Follow</span>
                    <ExternalLink className="w-3 h-3 text-pink-400 group-hover:text-white" />
                  </div>
                </a>
              )}

              {/* Official LinkedIn */}
              <a
                href={store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 hover:border-[#0A66C2]/60 transition-all text-xs flex items-center justify-between group shadow-[0_0_15px_rgba(10,102,194,0.15)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A66C2]/20 text-[#0A66C2] flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5 fill-[#0A66C2]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#70b5f9] group-hover:text-white transition-colors">Connect on LinkedIn</div>
                    <div className="text-[11px] text-gray-400 truncate max-w-[170px]">
                      {store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A66C2]/20 text-[10px] font-bold text-[#70b5f9] group-hover:text-white transition-colors">
                  <span>Connect</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              {/* GitHub */}
              <a
                href={store.contact.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-dark-900/80 hover:bg-dark-900 border border-white/10 hover:border-gold-500/40 transition-all text-xs flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">GitHub Profile</div>
                    <div className="text-[11px] text-gray-400 truncate max-w-[170px]">
                      {store.contact.socials.github}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gold-400" />
              </a>

              {/* Phone */}
              <a
                href={`tel:${store.contact.businessPhone.replace(/\s+/g, "")}`}
                className="p-4 rounded-2xl bg-dark-900/80 hover:bg-dark-900 border border-white/10 hover:border-gold-500/40 transition-all text-xs flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Business Phone</div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      {store.contact.businessPhone}
                    </div>
                  </div>
                </div>
                <Phone className="w-3.5 h-3.5 text-gold-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-gold-500/15 via-dark-900 to-dark-950 border-2 border-gold-500/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-gold-lg">
        <div className="max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block mb-2">
            AKSHAJ WEB STUDIO • Founder Direct Collaboration
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Ready to turn your vision into digital reality?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Partner directly with <span className="text-gold-300 font-semibold">Akshaj Lodhi</span> to architect, build, and deploy your next mission-critical website, mobile application, or AI solution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <Link
            href="/hire"
            className="btn-gold px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-gold-sm"
          >
            <span>Book Founder Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl border border-emerald-500/40 text-xs sm:text-sm font-semibold text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
