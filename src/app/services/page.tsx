"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Smartphone,
  Bot,
  Cpu,
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  ArrowRight,
  Search,
  Clock,
  Shield,
  HelpCircle,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceModal from "@/components/ServiceModal";
import { useStudioStore } from "@/lib/store";
import { ServiceItem } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Smartphone,
  Bot,
  Cpu,
  Sparkles,
  Calendar,
  Layers,
};

export default function ServicesPage() {
  const store = useStudioStore();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Web", "AI", "Mobile", "Enterprise", "Custom"];

  const filteredServices = useMemo(() => {
    return store.services.filter((srv) => {
      const matchesCategory =
        selectedCategory === "All" || srv.category === selectedCategory;
      const matchesSearch =
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [store.services, selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background ambient orb */}
      <div className="absolute top-24 left-1/3 w-[500px] h-[300px] bg-gold-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <SectionHeading
        badge="Specialized Agency Capabilities"
        title="Comprehensive Digital & AI Services"
        subtitle="Explore our 10 individual software, web, and mobile development services. Every solution is custom engineered to match your exacting commercial specifications."
      />

      {/* Admin indicator pill */}
      <div className="max-w-2xl mx-auto mb-10 p-3 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-between text-xs text-gold-300">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold-400" />
          <span>All 10 service prices, images and deliverables are dynamically editable via Admin</span>
        </div>
        <Link href="/admin" className="underline hover:text-white font-semibold">
          Manage &rarr;
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-gold-500 text-dark-950 shadow-gold-sm"
                  : "bg-dark-900 border border-white/10 text-gray-300 hover:border-gold-500/30 hover:text-white"
              }`}
            >
              {cat === "All" ? "All Services (10)" : cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services or features..."
            className="w-full bg-dark-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
          />
        </div>
      </div>

      {/* Services Grid (All 10 individual service cards with images, description, features, price, buttons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredServices.map((service, index) => {
          const IconComp = iconMap[service.iconName] || Globe;
          return (
            <div
              key={service.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between border border-gold-500/25 relative group"
            >
              {service.popular && (
                <div className="absolute top-5 right-5 z-10 px-3 py-0.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-[10px] font-bold text-gold-300 uppercase tracking-wider backdrop-blur-md">
                  Featured
                </div>
              )}

              <div>
                {/* Service Showcase Image */}
                {service.imageUrl && (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-dark-900 mb-5 border border-white/5">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                  </div>
                )}

                {/* Icon & Category */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform shadow-gold-sm shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-widest block">
                      {service.category} Service #{index + 1}
                    </span>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-gold-200 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 min-h-[44px]">
                  {service.shortDescription}
                </p>

                {/* Turnaround Time Pill */}
                <div className="flex items-center gap-2 text-xs text-gray-300 bg-dark-900/60 p-2.5 rounded-xl border border-white/5 mb-5">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  <span>Turnaround: {service.turnaroundTime}</span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block font-mono">
                    Key Features:
                  </span>
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Actions */}
              <div className="pt-5 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono block">
                      Starting Price (Editable)
                    </span>
                    <span className="text-2xl font-black text-gold-gradient">
                      {service.startingPrice}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500">per project</span>
                </div>

                {/* The 2 required buttons: View Details & Hire Now */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2.5 rounded-xl border border-white/15 hover:border-gold-500/40 text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/5 transition-all text-center"
                  >
                    View Details
                  </button>

                  <Link
                    href={`/hire?service=${encodeURIComponent(service.name)}`}
                    className="w-full btn-gold py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-gold-sm"
                  >
                    <span>Hire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/10 max-w-lg mx-auto">
          <p className="text-gray-400 text-sm mb-4">
            No services found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="btn-gold px-4 py-2 rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Service FAQ Section */}
      <section className="mt-24 pt-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Service Execution & Delivery Process
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2">
                How does the project onboarding and discovery work?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Once you submit a project request on our Hire Me page, we evaluate your technical scope and respond within 24 hours with a comprehensive architecture roadmap, milestones, and formal agreement.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2">
                Can prices be tailored for custom enterprise requirements?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Yes. Listed starting prices represent standard industry packages. If your project demands multi-cloud clustering, advanced AI fine-tuning, or high-volume native Android apps, we formulate a custom proposal.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <h4 className="text-sm font-bold text-white mb-2">
                Who holds intellectual property and source code ownership?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                You retain 100% full intellectual property and source code ownership upon final milestone sign-off. We provide complete GitHub repositories and deployment configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
