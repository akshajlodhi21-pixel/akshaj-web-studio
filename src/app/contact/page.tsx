"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Shield,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  UserPlus,
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useStudioStore } from "@/lib/store";
import { generateId } from "@/lib/utils";

// RFC 5322 Compliant Email Format Validator
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function ContactPage() {
  const store = useStudioStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState<{
    messageId?: string;
    message?: string;
  }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Official Action Links
  const cleanWhatsApp = store.contact.whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    "Hi Akshaj Web Studio, I am reaching out to discuss a digital project."
  )}`;

  const igUsername = store.contact.instagramUsername || "luckybro_9198";
  const igProfileUrl = store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/";
  const igDirectMessageUrl = `https://ig.me/m/${igUsername}`;
  const officialEmail = store.contact.email || "akshajlodhi21@gmail.com";
  const officialLinkedIn =
    store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/";
  const mailtoUrl = `mailto:${officialEmail}?subject=Project%20Inquiry%20-%20AKSHAJ%20WEB%20STUDIO`;
  const callUrl = `tel:${store.contact.businessPhone.replace(/\s+/g, "")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-Side Field Validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email format (e.g. name@example.com).";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = "Please enter a subject (at least 3 characters).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please write your message (at least 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setServerError(null);
    setSubmitting(true);

    try {
      // 2. Transmit through Secure Server-Side Contact API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          phone: formData.phone.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to dispatch message. Please try again or email directly."
        );
      }

      // 3. Record in local store for immediate client visibility
      store.addInquiry({
        id: data.messageId || generateId("AWS-MSG"),
        clientName: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim() || store.contact.personalPhone,
        requiredService: formData.subject.trim(),
        projectDescription: formData.message.trim(),
        budget: "Direct Contact Form",
        expectedDeadline: "Standard",
        status: "New",
        createdAt: new Date().toISOString(),
        notes: `Transmission to akshajlodhi21@gmail.com. Subject: ${formData.subject}`,
      });

      setSubmissionDetails({
        messageId: data.messageId,
        message:
          data.message ||
          "Your message has been sent successfully to akshajlodhi21@gmail.com. Akshaj Lodhi will respond within 24 hours.",
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      setServerError(
        err.message ||
          "Network transmission error. Please try again or email akshajlodhi21@gmail.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background glow */}
      <div className="absolute top-24 right-1/3 w-[500px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Header */}
      <SectionHeading
        badge="Direct Studio Communications"
        title="Connect With AKSHAJ WEB STUDIO"
        subtitle="Reach out directly through our verified digital lines. Every message is received directly by Founder & Developer Akshaj Lodhi."
      />

      {/* Admin indicator pill */}
      <div className="max-w-2xl mx-auto mb-10 p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between text-xs text-gold-300">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold-400 shrink-0" />
          <span>All phone numbers, WhatsApp, Instagram, email & social links are editable in Admin</span>
        </div>
        <Link href="/admin" className="underline hover:text-white font-semibold">
          Update Info &rarr;
        </Link>
      </div>

      {/* 6 Prominent Contact Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 mb-14">
        {/* 1. Chat on WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 transition-all flex flex-col items-center justify-center text-center group shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
        >
          <MessageSquare className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Chat on WhatsApp</span>
          <span className="text-[10px] text-emerald-400 mt-0.5">Instant Direct Line</span>
        </a>

        {/* 2. Connect on LinkedIn */}
        <a
          href={officialLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/50 text-[#70b5f9] transition-all flex flex-col items-center justify-center text-center group shadow-[0_4px_20px_rgba(10,102,194,0.2)]"
        >
          <Linkedin className="w-6 h-6 mb-2 fill-[#0A66C2] group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Connect on LinkedIn</span>
          <span className="text-[10px] text-[#70b5f9] mt-0.5">Official Profile</span>
        </a>

        {/* 3. Email Me Directly */}
        <a
          href={mailtoUrl}
          className="p-4 rounded-2xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/40 text-gold-300 transition-all flex flex-col items-center justify-center text-center group shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
        >
          <Mail className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Email Me</span>
          <span className="text-[10px] text-gold-400 mt-0.5 truncate max-w-[130px]">{officialEmail}</span>
        </a>

        {/* 4. Call Now */}
        <a
          href={callUrl}
          className="p-4 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-white/10 hover:border-gold-500/40 text-gray-200 transition-all flex flex-col items-center justify-center text-center group"
        >
          <PhoneCall className="w-6 h-6 mb-2 text-gold-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Call Now</span>
          <span className="text-[10px] text-gray-400 mt-0.5">+91 91985 62197</span>
        </a>

        {/* 5. Message on Instagram */}
        <a
          href={igDirectMessageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/40 text-pink-300 transition-all flex flex-col items-center justify-center text-center group"
        >
          <Instagram className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Message on Instagram</span>
          <span className="text-[10px] text-pink-400 mt-0.5">@{igUsername}</span>
        </a>

        {/* 6. Follow Me on Instagram */}
        <a
          href={igProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-orange-500/15 hover:from-purple-500/30 hover:via-pink-500/30 hover:to-orange-500/30 border border-pink-500/40 hover:border-pink-500/70 text-pink-200 hover:text-white transition-all flex flex-col items-center justify-center text-center group shadow-[0_4px_20px_rgba(236,72,153,0.2)]"
        >
          <Instagram className="w-6 h-6 mb-2 text-pink-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Follow Me on Instagram</span>
          <span className="text-[10px] text-pink-400 mt-0.5">@{igUsername}</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Numbers & Social Networks (Cols 1 - 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Detailed Phone Numbers Card */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/25 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-mono">
              Phone & Voice Channels
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-white/5">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-mono block">
                    Business Phone
                  </span>
                  <a
                    href={`tel:${store.contact.businessPhone.replace(/\s+/g, "")}`}
                    className="font-bold text-white hover:text-gold-300"
                  >
                    {store.contact.businessPhone}
                  </a>
                </div>
                <a
                  href={`tel:${store.contact.businessPhone.replace(/\s+/g, "")}`}
                  className="px-2.5 py-1 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30 text-[10px] font-bold"
                >
                  Call
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-white/5">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-mono block">
                    Personal / Direct Line
                  </span>
                  <a
                    href={`tel:${store.contact.personalPhone.replace(/\s+/g, "")}`}
                    className="font-bold text-white hover:text-gold-300"
                  >
                    {store.contact.personalPhone}
                  </a>
                </div>
                <a
                  href={`tel:${store.contact.personalPhone.replace(/\s+/g, "")}`}
                  className="px-2.5 py-1 rounded bg-white/5 text-gray-300 border border-white/10 text-[10px] font-bold"
                >
                  Call
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-mono block">
                    Official WhatsApp
                  </span>
                  <a href={waUrl} target="_blank" rel="noreferrer" className="font-bold text-white hover:underline">
                    {store.contact.whatsapp}
                  </a>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-emerald-500 text-dark-950 text-[10px] font-bold shadow-sm"
                >
                  Chat
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Email Addresses Card */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/25 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-mono">
                Electronic Mail Inboxes
              </h4>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Inbox
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Primary Official Gmail Box */}
              <div className="p-3.5 rounded-xl bg-dark-900 border border-gold-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gold-400 uppercase font-mono block">
                    Official Primary Email
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-bold">
                    Primary
                  </span>
                </div>
                <a
                  href={`mailto:${officialEmail}`}
                  className="font-bold text-white hover:text-gold-300 block truncate text-sm"
                >
                  {officialEmail}
                </a>
                <div className="pt-1">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/15 hover:bg-gold-500/25 text-gold-300 hover:text-white border border-gold-500/40 text-[11px] font-bold transition-all shadow-[0_0_10px_rgba(212,175,55,0.15)]"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold-400" />
                    <span>Email Me Directly</span>
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  Business & Corporate Inquiries
                </span>
                <a
                  href={`mailto:${store.contact.businessEmail || officialEmail}`}
                  className="font-bold text-white hover:text-gold-300 block truncate"
                >
                  {store.contact.businessEmail || officialEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Networks Grid with LinkedIn Highlight */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono text-gold-gradient">
              Social Media Ecosystem
            </h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {/* Official LinkedIn Banner */}
              <a
                href={officialLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/40 text-[#70b5f9] hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 fill-[#0A66C2] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="font-bold text-xs text-white">Connect on LinkedIn</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#0A66C2]/30 text-[#70b5f9] font-mono group-hover:text-white">
                  lucky-bro-b4ab043a1 &rarr;
                </span>
              </a>

              <a
                href={igProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-white/10 text-gray-300 hover:text-pink-300 hover:border-pink-500/40 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="truncate">Instagram</span>
              </a>

              <a
                href={store.contact.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-white/10 text-gray-300 hover:text-white hover:border-gold-500/40 transition-colors"
              >
                <Github className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="truncate">GitHub</span>
              </a>

              <a
                href={store.contact.socials.youtube || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-white/10 text-gray-300 hover:text-red-300 hover:border-red-500/40 transition-colors"
              >
                <Youtube className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate">YouTube</span>
              </a>

              <a
                href={store.contact.socials.facebook || "https://facebook.com"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-white/10 text-gray-300 hover:text-blue-300 hover:border-blue-500/40 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">Facebook</span>
              </a>

              <a
                href={store.contact.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-white/10 text-gray-300 hover:text-white hover:border-gold-500/40 transition-colors"
              >
                <Twitter className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="truncate">Twitter / X</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form (Cols 6 - 12) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-gold-500/30 shadow-gold-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-black text-white">
                Send Direct Message
              </h3>
              <span className="text-[11px] font-mono text-gold-400 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                To: {officialEmail}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
              Fill in your details below. Your transmission is processed by our secure server API and delivered directly to Founder Akshaj Lodhi&apos;s verified inbox.
            </p>

            {/* Server Error Alert Banner */}
            {serverError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{serverError}</p>
                  <p className="mt-1 text-gray-300">
                    You can also email directly:{" "}
                    <a
                      href={mailtoUrl}
                      className="underline text-gold-400 hover:text-white font-bold"
                    >
                      {officialEmail}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Success State Screen */}
            {submitted ? (
              <div className="p-8 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">
                  Message Dispatched Successfully
                </h4>
                {submissionDetails.messageId && (
                  <div className="inline-block px-3 py-1 rounded-full bg-dark-900 border border-gold-500/30 text-[11px] font-mono text-gold-300 mb-3">
                    Ref ID: {submissionDetails.messageId}
                  </div>
                )}
                <p className="text-xs text-gray-300 mb-4 max-w-md mx-auto leading-relaxed">
                  {submissionDetails.message ||
                    "Thank you for reaching out. Your message has been routed to akshajlodhi21@gmail.com. We will respond within 24 business hours."}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-gold px-6 py-2 rounded-xl text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={officialLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl border border-[#0A66C2]/40 text-xs font-semibold text-[#70b5f9] hover:text-white bg-[#0A66C2]/15 flex items-center gap-1.5"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-[#0A66C2]" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
                      }}
                      placeholder="e.g. Vikram Singhania"
                      className={`w-full bg-dark-900 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        fieldErrors.name
                          ? "border-red-500 focus:border-red-400"
                          : "border-white/10 focus:border-gold-500"
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 2: Email Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Email Address <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                      }}
                      placeholder="e.g. vikram@horizon.io"
                      className={`w-full bg-dark-900 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        fieldErrors.email
                          ? "border-red-500 focus:border-red-400"
                          : "border-white/10 focus:border-gold-500"
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field: Phone (Optional) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Phone Number <span className="text-gray-500 text-[10px] lowercase font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="e.g. +91 91985 62197"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  {/* Field 3: Subject */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Subject / Topic <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (fieldErrors.subject) setFieldErrors({ ...fieldErrors, subject: "" });
                      }}
                      placeholder="e.g. Web Development / Mobile App / AI"
                      className={`w-full bg-dark-900 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        fieldErrors.subject
                          ? "border-red-500 focus:border-red-400"
                          : "border-white/10 focus:border-gold-500"
                      }`}
                    />
                    {fieldErrors.subject && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.subject}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Field 4: Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Message <span className="text-gold-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
                    }}
                    placeholder="Describe your project, timeline, and requirements in detail..."
                    className={`w-full bg-dark-900 border rounded-xl p-4 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                      fieldErrors.message
                        ? "border-red-500 focus:border-red-400"
                        : "border-white/10 focus:border-gold-500"
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{fieldErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button with Loading Indicator */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-gold-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-dark-950" />
                      <span>Sending To akshajlodhi21@gmail.com...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Akshaj Lodhi</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-500 mt-2">
                  Encrypted transmission. Delivery to <span className="text-gold-400">{officialEmail}</span> verified.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
