"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Instagram,
  Linkedin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Sparkles,
  ExternalLink,
  Loader2,
  FileText,
  User,
  ArrowRight,
} from "lucide-react";
import { useStudioStore } from "@/lib/store";
import { generateId } from "@/lib/utils";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function LiveContactExperience() {
  const store = useStudioStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website Development",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const cleanPhone = store.contact.whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hi Akshaj Lodhi, I am visiting AKSHAJ WEB STUDIO and want to discuss a new project."
  )}`;
  const officialEmail = store.contact.email || "akshajlodhi21@gmail.com";
  const mailtoUrl = `mailto:${officialEmail}?subject=Project%20Inquiry%20-%20AKSHAJ%20WEB%20STUDIO`;
  const igUrl = store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/";
  const linkedinUrl =
    store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your name (at least 2 characters).";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email format (e.g. name@example.com).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please describe your project (at least 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setServerError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          subject: `${formData.service} Inquiry`,
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch message. Please try emailing directly.");
      }

      // Add to store for immediate client visibility
      store.addInquiry({
        id: data.messageId || generateId("AWS-INQ"),
        clientName: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim() || store.contact.personalPhone,
        requiredService: formData.service,
        projectDescription: formData.message.trim(),
        budget: "Interactive Homepage Inquiry",
        expectedDeadline: "Standard Sprint",
        status: "New",
        createdAt: new Date().toISOString(),
        notes: `Dispatched to akshajlodhi21@gmail.com from Live Experience section.`,
      });

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Website Development",
        message: "",
      });
    } catch (err: any) {
      setServerError(
        err.message ||
          "Network transmission error. Please reach out directly at akshajlodhi21@gmail.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="live-contact-experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono uppercase tracking-widest mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Interactive Client Gateway</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Initiate Your <span className="text-gold-gradient">Digital Project</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Connect directly with Founder & Developer Akshaj Lodhi. Review our 3-step sprint roadmap and transmit your requirements securely.
        </p>
      </div>

      {/* 3-Step Project Delivery Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="p-6 rounded-3xl glass-panel border border-gold-500/25 space-y-2 relative overflow-hidden">
          <span className="text-2xl font-black text-gold-500 font-mono">01</span>
          <h4 className="text-base font-bold text-white">Discovery & Architectural Blueprint</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            We map your business goals, target audience, technical specifications, and milestones into an executable sprint roadmap.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-gold-500/25 space-y-2 relative overflow-hidden">
          <span className="text-2xl font-black text-gold-500 font-mono">02</span>
          <h4 className="text-base font-bold text-white">Rapid Engineering & QA Sprint</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Custom-built code using Next.js 14, Tailwind, and scalable cloud backends, audited for 95+ Core Web Vitals and 100% responsiveness.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-gold-500/25 space-y-2 relative overflow-hidden">
          <span className="text-2xl font-black text-gold-500 font-mono">03</span>
          <h4 className="text-base font-bold text-white">Cloud Launch & Ongoing Scale</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Production deployment on Vercel Edge with zero-downtime DNS routing, SEO search indexing, and founder-backed technical support.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Founder Channels (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/25 space-y-5 shadow-gold-sm">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold block mb-1">
                Verified Channels
              </span>
              <h3 className="text-xl font-black text-white">Direct Founder Lines</h3>
              <p className="text-xs text-gray-400 mt-1">
                Every message is received directly by Akshaj Lodhi.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">WhatsApp Consultation</div>
                    <div className="text-[11px] text-emerald-400 font-mono">{store.contact.whatsapp}</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/30 text-[10px] font-bold text-emerald-200">
                  Instant Line &rarr;
                </span>
              </a>

              {/* Email */}
              <a
                href={mailtoUrl}
                className="p-3.5 rounded-2xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/35 text-gold-300 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Official Primary Email</div>
                    <div className="text-[11px] text-gray-300 truncate max-w-[180px]">{officialEmail}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gold-400" />
              </a>

              {/* Instagram */}
              {store.contact.instagramEnabled !== false && (
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-orange-500/20 border border-pink-500/35 text-pink-300 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Official Instagram</div>
                      <div className="text-[11px] text-pink-400 font-mono">@{store.contact.instagramUsername || "luckybro_9198"}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-[10px] font-bold text-pink-200">
                    Follow &rarr;
                  </span>
                </a>
              )}

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/40 text-[#70b5f9] flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0A66C2]/20 text-[#0A66C2] flex items-center justify-center">
                    <Linkedin className="w-4 h-4 fill-[#0A66C2]" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Connect on LinkedIn</div>
                    <div className="text-[11px] text-gray-300 font-mono">lucky-bro-b4ab043a1</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#70b5f9]" />
              </a>

              {/* Phone */}
              <a
                href={`tel:${store.contact.businessPhone.replace(/\s+/g, "")}`}
                className="p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-white/20 text-gray-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Direct Phone Call</div>
                    <div className="text-[11px] text-gray-400 font-mono">{store.contact.businessPhone}</div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">Call Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-gold-500/30 shadow-gold-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-black text-white">Send Direct Message</h3>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Inbox Active</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Dispatched directly to Akshaj Lodhi&apos;s verified inbox at <strong className="text-gold-300">{officialEmail}</strong>.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Transmission Successful</h4>
                <p className="text-xs text-emerald-200 leading-relaxed max-w-md mx-auto">
                  Your message has been delivered to <strong>{officialEmail}</strong>. Founder Akshaj Lodhi will review your scope and reply within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-emerald-500 text-dark-950 font-bold text-xs shadow-sm hover:bg-emerald-400 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {serverError && (
                  <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                    />
                    {fieldErrors.name && (
                      <span className="text-[11px] text-red-400 mt-1 block">{fieldErrors.name}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                    />
                    {fieldErrors.email && (
                      <span className="text-[11px] text-red-400 mt-1 block">{fieldErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      Target Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold-500/50"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Business Website Development">Business Website Development</option>
                      <option value="E-commerce Development">E-commerce Development</option>
                      <option value="Android Application Development">Android Application Development</option>
                      <option value="AI Solutions & Automation">AI Solutions & Automation</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    Project Scope & Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you'd like to build, timeline, or key objectives..."
                    className="w-full bg-dark-900 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 resize-none leading-relaxed"
                  />
                  {fieldErrors.message && (
                    <span className="text-[11px] text-red-400 mt-1 block">{fieldErrors.message}</span>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[10px] text-gray-400">
                    Transmits securely via server-side API to {officialEmail}
                  </span>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto btn-gold px-8 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-gold-sm disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Directly</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
