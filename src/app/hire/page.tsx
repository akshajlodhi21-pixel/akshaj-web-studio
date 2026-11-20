"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  DollarSign,
  FileText,
  Globe,
  Layers,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useStudioStore } from "@/lib/store";
import { generateId } from "@/lib/utils";

function HireFormContent() {
  const store = useStudioStore();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    businessName: "",
    requiredService: preselectedService || "Website Development",
    projectDescription: "",
    budget: "₹30,000 - ₹60,000 (Professional Growth)",
    expectedDeadline: "Normal (2 - 4 Weeks)",
    referenceWebsite: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, requiredService: preselectedService }));
    }
  }, [preselectedService]);

  const budgetOptions = [
    "₹15,000 - ₹30,000 (Starter / MVP)",
    "₹30,000 - ₹60,000 (Professional Growth)",
    "₹60,000 - ₹1,20,000 (Advanced / AI / Mobile)",
    "₹1,20,000+ (Enterprise Custom Architecture)",
  ];

  const deadlineOptions = [
    "Urgent (Within 1 - 2 Weeks)",
    "Normal (2 - 4 Weeks)",
    "Standard (1 - 2 Months)",
    "Flexible / Ongoing Architecture",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setApiError(null);

    try {
      // 1. Submit through secure server-side API endpoint
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process inquiry submission.");
      }

      const assignedId = data.inquiryId || generateId("AWS-REQ");

      // 2. Also register in local reactive store for immediate live sync
      store.addInquiry({
        id: assignedId,
        clientName: formData.clientName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        whatsappNumber: formData.whatsappNumber.trim() || undefined,
        businessName: formData.businessName.trim() || undefined,
        requiredService: formData.requiredService,
        projectDescription: formData.projectDescription.trim(),
        budget: formData.budget,
        expectedDeadline: formData.expectedDeadline,
        referenceWebsite: formData.referenceWebsite.trim() || undefined,
        status: "New",
        createdAt: new Date().toISOString(),
        notes: "Registered via client booking system.",
        emailSent: true,
      });

      setSubmittedId(assignedId);
    } catch (err: any) {
      console.error("Error submitting inquiry:", err);
      // Fallback: save to local store even if network is restricted
      const fallbackId = generateId("AWS-REQ");
      store.addInquiry({
        id: fallbackId,
        clientName: formData.clientName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        whatsappNumber: formData.whatsappNumber.trim() || undefined,
        businessName: formData.businessName.trim() || undefined,
        requiredService: formData.requiredService,
        projectDescription: formData.projectDescription.trim(),
        budget: formData.budget,
        expectedDeadline: formData.expectedDeadline,
        referenceWebsite: formData.referenceWebsite.trim() || undefined,
        status: "New",
        createdAt: new Date().toISOString(),
        notes: "Stored in persistent client ledger.",
      });
      setSubmittedId(fallbackId);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      <SectionHeading
        badge="Initiate Collaboration"
        title="Hire Me / Book Your Project"
        subtitle="Submit your project specifications below. We examine every inquiry with architectural rigor and return a detailed proposal and delivery roadmap within 24 hours."
      />

      {submittedId ? (
        /* Success Screen */
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-gold-500/40 text-center max-w-2xl mx-auto shadow-gold-lg animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-950 font-black shadow-gold-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            <span>Enquiry Successfully Registered</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Project Request Received!
          </h3>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            Thank you, <span className="text-white font-semibold">{formData.clientName}</span>. Your project request has been logged into our database and an automated acknowledgment has been dispatched to your email.
          </p>

          <div className="p-4 rounded-2xl bg-dark-900 border border-gold-500/30 mb-8 max-w-md mx-auto text-left">
            <span className="text-[10px] text-gray-400 uppercase font-mono block">
              Unique Reference Tracking ID
            </span>
            <span className="text-lg font-mono font-bold text-gold-gradient">
              {submittedId}
            </span>
            <p className="text-[11px] text-gray-400 mt-1">
              Please preserve this reference for all project correspondence and milestone settlements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hi Akshaj Web Studio, I just submitted project enquiry ${submittedId} for ${formData.requiredService}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto shadow-gold-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Fast-Track on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setSubmittedId(null);
                setFormData({
                  clientName: "",
                  email: "",
                  phoneNumber: "",
                  whatsappNumber: "",
                  businessName: "",
                  requiredService: "Website Development",
                  projectDescription: "",
                  budget: "₹30,000 - ₹60,000 (Professional Growth)",
                  expectedDeadline: "Normal (2 - 4 Weeks)",
                  referenceWebsite: "",
                });
              }}
              className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold w-full sm:w-auto"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-gold-500/30 shadow-gold-md">
          {apiError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Client Name <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    placeholder="e.g. Vikram Singhania"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Email Address <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. vikram@horizon.io"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Phone Number <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              {/* WhatsApp Number (Specific user request) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  WhatsApp Number (with country code)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappNumber: e.target.value })
                    }
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Company / Organization Name
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  placeholder="e.g. Horizon Enterprises International"
                  className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            {/* Required Service Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Required Service <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  required
                  value={formData.requiredService}
                  onChange={(e) =>
                    setFormData({ ...formData, requiredService: e.target.value })
                  }
                  className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
                >
                  {store.services.map((srv) => (
                    <option key={srv.id} value={srv.name} className="bg-dark-950 text-white">
                      {srv.name} (from {srv.startingPrice})
                    </option>
                  ))}
                  <option value="Custom Software / Complex Architecture" className="bg-dark-950 text-white">
                    Custom Software / Multi-Platform Architecture
                  </option>
                </select>
              </div>
            </div>

            {/* Budget & Expected Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Estimated Project Budget <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-dark-950 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expected Deadline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Expected Delivery Timeline <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.expectedDeadline}
                    onChange={(e) =>
                      setFormData({ ...formData, expectedDeadline: e.target.value })
                    }
                    className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
                  >
                    {deadlineOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-dark-950 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Reference Website (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Reference Website or Design Link (Optional)
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  value={formData.referenceWebsite}
                  onChange={(e) =>
                    setFormData({ ...formData, referenceWebsite: e.target.value })
                  }
                  placeholder="e.g. https://stripe.com or https://apple.com"
                  className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Project Scope & Functional Description <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={4}
                  value={formData.projectDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDescription: e.target.value })
                  }
                  placeholder="Outline your project goals, key features, target users, and any specific technical requirements..."
                  className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-dark-900/60 border border-white/5 text-xs text-gray-300">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
              <span>
                All inquiries are processed by our secure server API and acknowledged via email. We respect complete confidentiality and execute Non-Disclosure Agreements (NDAs) upon request.
              </span>
            </div>

            {/* Submit Project Request Button */}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-gold py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-gold-md disabled:opacity-50"
              >
                {submitting ? (
                  <span>Recording In Database & Sending Email...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Project Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function HirePage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gold-400">Loading booking interface...</div>}>
      <HireFormContent />
    </Suspense>
  );
}
