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
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useStudioStore } from "@/lib/store";
import { generateId } from "@/lib/utils";

export default function ContactPage() {
  const store = useStudioStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Official Action Links
  const cleanWhatsApp = store.contact.whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    "Hi Akshaj Web Studio, I am reaching out to discuss a digital project."
  )}`;

  const igUsername = store.contact.instagramUsername || "akshajwebstudio";
  const igProfileUrl = store.contact.instagramUrl || `https://instagram.com/${igUsername}`;
  const igDirectMessageUrl = `https://ig.me/m/${igUsername}`;
  const mailtoUrl = `mailto:${store.contact.businessEmail}?subject=Project%20Inquiry%20-%20Akshaj%20Web%20Studio`;
  const callUrl = `tel:${store.contact.businessPhone.replace(/\s+/g, "")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send through the server-side API
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: formData.name.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phone.trim() || store.contact.personalPhone,
          requiredService: formData.subject.trim() || "General Consultation",
          projectDescription: formData.message.trim(),
          budget: "Direct Inquiry",
          expectedDeadline: "Normal",
        }),
      });

      // Also store in reactive local store
      store.addInquiry({
        id: generateId("AWS-MSG"),
        clientName: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim() || store.contact.personalPhone,
        requiredService: formData.subject.trim() || "General Consultation",
        projectDescription: formData.message.trim(),
        budget: "Direct Inquiry",
        expectedDeadline: "Normal",
        status: "New",
        createdAt: new Date().toISOString(),
        notes: `Direct transmission from contact form. Subject: ${formData.subject}`,
      });

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
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
        subtitle="Reach out directly through our verified digital lines. Every message is received directly by the lead architect."
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

      {/* 5 Prominent Contact Action Buttons (As specifically requested) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-14">
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

        {/* 2. Message on Instagram */}
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

        {/* 3. Send an Email */}
        <a
          href={mailtoUrl}
          className="p-4 rounded-2xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/40 text-gold-300 transition-all flex flex-col items-center justify-center text-center group"
        >
          <Mail className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Send an Email</span>
          <span className="text-[10px] text-gold-400 mt-0.5">Corporate Mailto</span>
        </a>

        {/* 4. Call Now */}
        <a
          href={callUrl}
          className="p-4 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-white/10 hover:border-gold-500/40 text-gray-200 transition-all flex flex-col items-center justify-center text-center group"
        >
          <PhoneCall className="w-6 h-6 mb-2 text-gold-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Call Now</span>
          <span className="text-[10px] text-gray-400 mt-0.5">Direct Voice</span>
        </a>

        {/* 5. Follow on Instagram */}
        <a
          href={igProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/30 text-purple-300 transition-all flex flex-col items-center justify-center text-center group"
        >
          <UserPlus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white">Follow on Instagram</span>
          <span className="text-[10px] text-purple-400 mt-0.5">Official Account</span>
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-mono">
              Electronic Mail Inboxes
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-dark-900 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  Business & Corporate Inquiries
                </span>
                <a
                  href={`mailto:${store.contact.businessEmail}`}
                  className="font-bold text-white hover:text-gold-300 block truncate"
                >
                  {store.contact.businessEmail}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  Personal Correspondence
                </span>
                <a
                  href={`mailto:${store.contact.personalEmail}`}
                  className="font-bold text-white hover:text-gold-300 block truncate"
                >
                  {store.contact.personalEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Networks Grid */}
          <div className="p-6 rounded-3xl glass-panel border border-gold-500/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono text-gold-gradient">
              Social Media Ecosystem
            </h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
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
                href={store.contact.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-white/10 text-gray-300 hover:text-white hover:border-gold-500/40 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="truncate">LinkedIn</span>
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
                className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-white/10 text-gray-300 hover:text-white hover:border-gold-500/40 transition-colors"
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
            <h3 className="text-2xl font-black text-white mb-2">
              Send An Encrypted Message
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
              Fill in your details below. Your transmission is processed by our secure server API and acknowledged within 24 business hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs text-gray-300 mb-6">
                  Thank you for reaching out. We will respond to your provided email and contact number promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold px-6 py-2 rounded-xl text-xs font-bold"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Your Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Vikram Singhania"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Email Address <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. vikram@horizon.io"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Subject / Topic <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. New Project Inquiry / Partnership"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Message <span className="text-gold-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Share how we can assist your digital venture..."
                    className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-gold-sm disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
