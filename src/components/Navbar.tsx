"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  PhoneCall,
  Briefcase,
  User,
  CreditCard,
  DollarSign,
  Home,
  Linkedin,
  Instagram,
} from "lucide-react";
import XIcon from "@/components/XIcon";
import { useStudioStore } from "@/lib/store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const store = useStudioStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Me", href: "/about", icon: User },
    { name: "Services", href: "/services", icon: Layers },
    { name: "AI Planner", href: "/#ai-project-planner", icon: Sparkles },
    { name: "Portfolio", href: "/portfolio", icon: Briefcase },
    { name: "Pricing", href: "/pricing", icon: DollarSign },
    { name: "Payment", href: "/payment", icon: CreditCard },
    { name: "Contact", href: "/contact", icon: PhoneCall },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark-950/85 backdrop-blur-xl border-b border-gold-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_28px_rgba(212,175,55,0.7)] transition-all duration-300 transform group-hover:scale-105">
                <span className="text-dark-950 font-black text-xl tracking-tighter">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold tracking-wider text-base sm:text-lg group-hover:text-gold-300 transition-colors">
                  AKSHAJ <span className="text-gold-gradient">WEB STUDIO</span>
                </span>
                <span className="text-[10px] tracking-widest text-gold-400/80 uppercase font-mono hidden sm:block">
                  Digital Engineering
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg group ${
                      isActive
                        ? "text-gold-300 bg-gold-500/10 font-semibold"
                        : "text-gray-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600 rounded-full shadow-[0_0_8px_#d4af37]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Official Instagram Profile Link */}
              {store.contact.instagramEnabled !== false && (
                <a
                  href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow Akshaj Lodhi on Instagram (@luckybro_9198)"
                  aria-label="Official Instagram Profile"
                  className="p-2 sm:px-3 sm:py-2 rounded-lg border border-pink-500/35 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 hover:from-purple-500/25 hover:via-pink-500/25 hover:to-orange-500/25 text-pink-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(236,72,153,0.2)] hover:shadow-[0_0_18px_rgba(236,72,153,0.4)] group"
                >
                  <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="hidden xl:inline">Instagram</span>
                </a>
              )}

              {/* Official LinkedIn Profile Link */}
              {store.contact.linkedinEnabled !== false && (
                <a
                  href={store.contact.linkedinUrl || store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Connect with Akshaj Lodhi on LinkedIn"
                  aria-label="Official LinkedIn Profile"
                  className="p-2 sm:px-3 sm:py-2 rounded-lg border border-[#0A66C2]/40 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#70b5f9] hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(10,102,194,0.25)] hover:shadow-[0_0_18px_rgba(10,102,194,0.45)] group"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2] group-hover:text-white fill-[#0A66C2] group-hover:fill-white transition-colors shrink-0" />
                  <span className="hidden xl:inline">LinkedIn</span>
                </a>
              )}

              {/* Official Twitter / X Profile Link */}
              {store.contact.twitterEnabled !== false && (
                <a
                  href={store.contact.twitterUrl || store.contact.socials.twitter || "https://x.com/LuckyBro199620"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow Akshaj Lodhi on X (@LuckyBro199620)"
                  aria-label="Official X / Twitter Profile"
                  className="p-2 sm:px-3 sm:py-2 rounded-lg border border-white/20 bg-dark-900/80 hover:bg-gold-500/10 text-gray-300 hover:text-white hover:border-gold-500/50 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,255,255,0.06)] hover:shadow-[0_0_18px_rgba(212,175,55,0.35)] group"
                >
                  <XIcon className="w-3.5 h-3.5 text-gray-300 group-hover:text-gold-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="hidden xl:inline">X (Twitter)</span>
                </a>
              )}

              {/* Admin Portal icon */}
              <Link
                href="/admin"
                title="Admin Management Dashboard"
                className={`p-2 rounded-lg border transition-all text-xs font-medium flex items-center gap-1.5 ${
                  pathname.startsWith("/admin")
                    ? "bg-gold-500/20 text-gold-300 border-gold-500/40"
                    : "border-white/10 text-gray-400 hover:text-gold-400 hover:border-gold-500/30 bg-dark-900/40"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">
                  {store.isAdminLoggedIn ? "Admin Console" : "Admin"}
                </span>
              </Link>

              {/* Hire Me CTA Button */}
              <Link
                href="/hire"
                className="btn-gold px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 group shadow-gold-sm"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Actions Button */}
            <div className="flex sm:hidden items-center gap-2">
              {store.contact.instagramEnabled !== false && (
                <a
                  href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Official Instagram Profile"
                  aria-label="Official Instagram Profile"
                  className="p-2 rounded-lg border border-pink-500/40 bg-pink-500/15 text-pink-300 flex items-center justify-center"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                </a>
              )}
              {store.contact.linkedinEnabled !== false && (
                <a
                  href={store.contact.linkedinUrl || store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Official LinkedIn Profile"
                  aria-label="Official LinkedIn Profile"
                  className="p-2 rounded-lg border border-[#0A66C2]/40 bg-[#0A66C2]/15 text-[#70b5f9] flex items-center justify-center"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2] fill-[#0A66C2]" />
                </a>
              )}
              <Link
                href="/hire"
                className="btn-gold px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                Hire Me
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-dark-950 border-l border-gold-500/25 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-dark-950 text-sm">
                    A
                  </div>
                  <span className="font-bold text-white text-sm">
                    AKSHAJ <span className="text-gold-gradient">STUDIO</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gold-500/15 text-gold-300 font-semibold border border-gold-500/30"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-gold-400" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom actions in drawer */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              {store.contact.instagramEnabled !== false && (
                <a
                  href={store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-center text-xs text-pink-300 hover:text-white border border-pink-500/40 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-orange-500/15 flex items-center justify-center gap-2 font-bold transition-all shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Follow Me on Instagram</span>
                </a>
              )}

              {store.contact.linkedinEnabled !== false && (
                <a
                  href={store.contact.linkedinUrl || store.contact.socials.linkedin || "https://www.linkedin.com/in/lucky-bro-b4ab043a1/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-center text-xs text-[#70b5f9] hover:text-white border border-[#0A66C2]/40 bg-[#0A66C2]/15 flex items-center justify-center gap-2 font-bold transition-all shadow-[0_0_15px_rgba(10,102,194,0.2)]"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2] fill-[#0A66C2]" />
                  <span>Connect on LinkedIn</span>
                </a>
              )}

              {store.contact.twitterEnabled !== false && (
                <a
                  href={store.contact.twitterUrl || store.contact.socials.twitter || "https://x.com/LuckyBro199620"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-center text-xs text-gray-200 hover:text-white border border-white/20 hover:border-gold-500/50 bg-dark-900/80 hover:bg-gold-500/10 flex items-center justify-center gap-2 font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] group"
                  title="Follow Akshaj Lodhi on X / Twitter (@LuckyBro199620)"
                  aria-label="Follow on X (Twitter)"
                >
                  <XIcon className="w-4 h-4 text-gray-200 group-hover:text-gold-400" />
                  <span>Follow on X (@LuckyBro199620)</span>
                </a>
              )}

              <Link
                href="/hire"
                className="btn-gold w-full py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hire Me / Book Project</span>
              </Link>

              <Link
                href="/admin"
                className="w-full py-2.5 rounded-xl text-center text-xs text-gray-400 hover:text-gold-300 border border-white/10 hover:border-gold-500/30 bg-dark-900/60 flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
