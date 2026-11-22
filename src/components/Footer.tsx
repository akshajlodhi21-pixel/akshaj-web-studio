"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  Shield,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MapPin,
  Clock,
} from "lucide-react";
import { useStudioStore } from "@/lib/store";

export default function Footer() {
  const store = useStudioStore();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="relative bg-dark-950 border-t border-gold-500/20 text-gray-400 text-sm overflow-hidden pt-16 pb-12">
      {/* Background glow ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand info (Col 1 - 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-gold-sm text-dark-950 font-black text-xl">
                A
              </div>
              <div>
                <span className="text-white font-extrabold tracking-wider text-lg">
                  AKSHAJ <span className="text-gold-gradient">WEB STUDIO</span>
                </span>
                <p className="text-[11px] text-gold-400/90 font-mono tracking-widest uppercase">
                  {store.settings.tagline}
                </p>
              </div>
            </Link>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-2">
              {store.settings.footerAboutText}
            </p>

            {/* Newsletter Subscription Box */}
            <div className="mt-4 p-4 rounded-2xl glass-panel border border-gold-500/20">
              <div className="flex items-center gap-2 mb-2 text-white font-semibold text-xs tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Executive Tech Insights Newsletter</span>
              </div>
              <p className="text-[11px] text-gray-400 mb-3">
                Join forward-thinking founders for bi-weekly insights on AI architectures and digital growth.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-gold-300 bg-gold-500/10 p-2.5 rounded-lg border border-gold-500/30">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Subscribed! Welcome to Akshaj Web Studio insights.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    required
                    className="flex-1 bg-dark-900/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="btn-gold px-3 py-2 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links (Col 5 - 6) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-gold-gradient">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About Me / Founder
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-300 transition-colors">
                  Agency Services (10)
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold-300 transition-colors">
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold-300 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:text-gold-300 transition-colors">
                  Payment & UPI Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Studio
                </Link>
              </li>
              <li>
                <Link href="/hire" className="text-gold-400 font-semibold hover:text-gold-200 transition-colors flex items-center gap-1">
                  <span>Hire Me Now</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services (Col 7 - 9) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-gold-gradient">
              Agency Capabilities
            </h3>
            <ul className="space-y-2 text-xs">
              {store.services.slice(0, 7).map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services`}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-400" />
                    <span>{srv.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-gold-400 font-medium hover:underline text-[11px] mt-1 inline-block"
                >
                  View all 10 specialized services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours (Col 10 - 12) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-2 text-gold-gradient">
              Studio Direct
            </h3>

            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${store.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{store.contact.phone}</span>
              </a>

              <a
                href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors text-emerald-400"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp Official Chat</span>
              </a>

              <a
                href={`mailto:${store.contact.email || "akshajlodhi21@gmail.com"}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
                title="Send an email to Akshaj Lodhi"
              >
                <div className="w-6 h-6 rounded-md bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0 group-hover:border-gold-400">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <span className="truncate text-white font-medium">{store.contact.email || "akshajlodhi21@gmail.com"}</span>
              </a>

              {/* Instagram Channel */}
              {store.contact.instagramEnabled !== false && (
                <a
                  href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors text-pink-300 group"
                  title="Official Instagram Profile"
                >
                  <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center shrink-0 group-hover:border-pink-400">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  </div>
                  <span className="truncate text-xs font-mono">@{store.contact.instagramUsername || "luckybro_9198"}</span>
                </a>
              )}

              {/* Action Buttons Row */}
              <div className="pt-1 flex flex-wrap gap-2">
                <a
                  href={`mailto:${store.contact.email || "akshajlodhi21@gmail.com"}?subject=Project%20Inquiry%20-%20AKSHAJ%20WEB%20STUDIO`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-500/40 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 text-xs font-bold transition-all shadow-[0_0_10px_rgba(212,175,55,0.15)] group"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-400 group-hover:scale-110 transition-transform" />
                  <span>Email Me</span>
                </a>

                {store.contact.instagramEnabled !== false && (
                  <a
                    href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-pink-500/40 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-orange-500/15 hover:from-purple-500/30 hover:via-pink-500/30 hover:to-orange-500/30 text-pink-300 hover:text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(236,72,153,0.2)] group"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span>Follow Me on Instagram</span>
                  </a>
                )}
              </div>

              <div className="flex items-start gap-2.5 text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>{store.contact.address}</span>
              </div>

              <div className="flex items-start gap-2.5 text-gray-400">
                <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>{store.contact.workingHours}</span>
              </div>
            </div>

            {/* Social & Contact Icons */}
            <div className="mt-2 pt-3 border-t border-white/10 flex items-center gap-2.5">
              {/* Official Instagram */}
              {store.contact.instagramEnabled !== false && (
                <a
                  href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-dark-900 border border-pink-500/40 text-pink-400 hover:text-white hover:bg-gradient-to-tr hover:from-purple-600/30 hover:via-pink-600/30 hover:to-orange-500/30 hover:border-pink-400 transition-all shadow-[0_0_10px_rgba(236,72,153,0.2)]"
                  aria-label="Official Instagram Profile"
                  title="Follow on Instagram: @luckybro_9198"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {/* Official LinkedIn */}
              <a
                href={store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-900 border border-[#0A66C2]/40 text-[#70b5f9] hover:text-white hover:bg-[#0A66C2]/20 hover:border-[#0A66C2] transition-colors"
                aria-label="Official LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 fill-[#0A66C2]" />
              </a>

              {/* Official Gmail Mailto */}
              <a
                href={`mailto:${store.contact.email || "akshajlodhi21@gmail.com"}`}
                className="p-2 rounded-lg bg-dark-900 border border-gold-500/30 text-gold-400 hover:text-white hover:bg-gold-500/20 hover:border-gold-400 transition-colors"
                aria-label="Send Email to Akshaj Lodhi"
                title="Email: akshajlodhi21@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>

              {/* GitHub */}
              <a
                href={store.contact.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-dark-900 border border-white/10 text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* Twitter / X */}
              <a
                href={store.contact.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-dark-900 border border-white/10 text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-white font-semibold">AKSHAJ WEB STUDIO</span>.
            <span>All rights reserved worldwide.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="text-gray-400 hover:text-gold-400 flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
