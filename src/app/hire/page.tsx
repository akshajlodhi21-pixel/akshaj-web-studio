"use client";

import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useStudioStore } from "@/lib/store";
import { generateId } from "@/lib/utils";

// RFC 5322 Compliant Email Format Validator
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function HirePage() {
  const store = useStudioStore();

  const [formData, setFormData] = useState({
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

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Read URL query parameters safely on mount without triggering SSR Suspense deopt
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const serviceParam = params.get("service");
        const descParam = params.get("description");
        const budgetParam = params.get("budget");

        if (serviceParam || descParam || budgetParam) {
          setFormData((prev) => ({
            ...prev,
            requiredService: serviceParam || prev.requiredService,
            projectDescription: descParam || prev.projectDescription,
            budget: budgetParam || prev.budget,
          }));
        }
      } catch (e) {
        console.warn("Could not parse search parameters:", e);
      }
    }
  }, []);

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

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.clientName.trim() || formData.clientName.trim().length < 2) {
      errors.clientName = "Please enter your name (at least 2 characters).";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email format (e.g. name@company.com).";
    }

    if (!formData.phoneNumber.trim() || formData.phoneNumber.trim().length < 7) {
      errors.phoneNumber = "Please enter a valid phone number (at least 7 digits).";
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      errors.projectDescription = "Please provide project details (at least 10 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to process inquiry submission. Please verify your details.");
      }

      const assignedId = data.inquiryId || generateId("AWS-REQ");

      // Record in local store for administrative tracking
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
        notes: "Registered via verified client booking system.",
        emailSent: true,
      });

      setSubmittedId(assignedId);
    } catch (err: any) {
      console.error("Inquiry submission error:", err);
      // Clearly communicate the error without pretending the form succeeded
      setApiError(
        err.message ||
          "Could not transmit inquiry to server. Please try again or email your requirements directly to akshajlodhi21@gmail.com."
      );
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
        title="Start Your Project With Us"
        subtitle="Submit your project requirements below. Every inquiry is reviewed directly by Founder & Developer Akshaj Lodhi to deliver an architectural proposal and delivery roadmap."
      />

      {submittedId ? (
        /* Genuine Verified Success Screen */
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-gold-500/40 text-center max-w-2xl mx-auto shadow-gold-lg animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-950 font-black shadow-gold-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            <span>Enquiry Successfully Logged</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Project Request Received!
          </h3>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            Thank you, <span className="text-white font-semibold">{formData.clientName}</span>. Your project request has been recorded into our database and dispatched to <span className="text-gold-300 font-mono font-semibold">akshajlodhi21@gmail.com</span>.
          </p>

          <div className="p-4 rounded-2xl bg-dark-900 border border-gold-500/30 mb-8 max-w-md mx-auto text-left">
            <span className="text-[10px] text-gray-400 uppercase font-mono block">
              Unique Reference Tracking ID
            </span>
            <span className="text-lg font-mono font-bold text-gold-gradient">
              {submittedId}
            </span>
            <p className="text-[11px] text-gray-400 mt-1">
              Please preserve this reference for project correspondence and milestone settlements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hi Akshaj, I have submitted project inquiry ${submittedId} for ${formData.requiredService}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto shadow-gold-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
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
              className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold w-full sm:w-auto hover:bg-white/5 transition-colors"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-gold-500/30 shadow-gold-md">
          {apiError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>Submission Notice</span>
              </div>
              <p>{apiError}</p>
              <div className="pt-2 border-t border-red-500/20 flex flex-wrap gap-3 text-[11px]">
                <a
                  href={`mailto:akshajlodhi21@gmail.com?subject=Project%20Inquiry%20via%20Hire%20Form&body=${encodeURIComponent(
                    `Name: ${formData.clientName}\nService: ${formData.requiredService}\nBudget: ${formData.budget}\nDetails: ${formData.projectDescription}`
                  )}`}
                  className="text-gold-300 underline font-semibold hover:text-white"
                >
                  &rarr; Click here to Email akshajlodhi21@gmail.com directly
                </a>
                <a
                  href={`https://wa.me/919198562197?text=${encodeURIComponent(
                    `Hi Akshaj, I want to discuss a project: ${formData.requiredService}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline font-semibold hover:text-white"
                >
                  &rarr; Or message on WhatsApp (+91 91985 62197)
                </a>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Full Name <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => {
                      setFormData({ ...formData, clientName: e.target.value });
                      if (fieldErrors.clientName) setFieldErrors({ ...fieldErrors, clientName: "" });
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full bg-dark-900 border ${
                      fieldErrors.clientName ? "border-red-500" : "border-white/10"
                    } rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors`}
                  />
                </div>
                {fieldErrors.clientName && (
                  <p className="text-[11px] text-red-400 mt-1">{fieldErrors.clientName}</p>
                )}
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
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                    }}
                    placeholder="e.g. name@company.com"
                    className={`w-full bg-dark-900 border ${
                      fieldErrors.email ? "border-red-500" : "border-white/10"
                    } rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-[11px] text-red-400 mt-1">{fieldErrors.email}</p>
                )}
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
                    onChange={(e) => {
                      setFormData({ ...formData, phoneNumber: e.target.value });
                      if (fieldErrors.phoneNumber) setFieldErrors({ ...fieldErrors, phoneNumber: "" });
                    }}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full bg-dark-900 border ${
                      fieldErrors.phoneNumber ? "border-red-500" : "border-white/10"
                    } rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors`}
                  />
                </div>
                {fieldErrors.phoneNumber && (
                  <p className="text-[11px] text-red-400 mt-1">{fieldErrors.phoneNumber}</p>
                )}
              </div>

              {/* WhatsApp Number (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  WhatsApp Number (Optional)
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

            {/* Business Name (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Company / Organization / Brand Name (Optional)
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  placeholder="e.g. Acme Innovations or Personal Brand"
                  className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            {/* Required Service Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Project Type / Required Service <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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
                      {srv.name} (Starting {srv.startingPrice})
                    </option>
                  ))}
                  <option value="Custom Software / Complex Architecture" className="bg-dark-950 text-white">
                    Custom Software / Multi-Platform Architecture
                  </option>
                  <option value="Custom Quote / Scope Review" className="bg-dark-950 text-white">
                    Custom Quote / Scope Review
                  </option>
                </select>
              </div>
            </div>

            {/* Budget & Expected Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Budget Range <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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
                    <option value="Custom Budget / To Be Discussed" className="bg-dark-950 text-white">
                      Custom Budget / To Be Discussed
                    </option>
                  </select>
                </div>
              </div>

              {/* Expected Deadline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Target Delivery Timeline <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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
                Reference Website or Inspiration Link (Optional)
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  value={formData.referenceWebsite}
                  onChange={(e) =>
                    setFormData({ ...formData, referenceWebsite: e.target.value })
                  }
                  placeholder="e.g. https://example-inspiration.com"
                  className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Project Scope & Requirements <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={4}
                  value={formData.projectDescription}
                  onChange={(e) => {
                    setFormData({ ...formData, projectDescription: e.target.value });
                    if (fieldErrors.projectDescription) setFieldErrors({ ...fieldErrors, projectDescription: "" });
                  }}
                  placeholder="Describe your project goals, key sections, required functionality, and any specific technical preferences..."
                  className={`w-full bg-dark-900 border ${
                    fieldErrors.projectDescription ? "border-red-500" : "border-white/10"
                  } rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors`}
                />
              </div>
              {fieldErrors.projectDescription && (
                <p className="text-[11px] text-red-400 mt-1">{fieldErrors.projectDescription}</p>
              )}
            </div>

            {/* Security Assurance Badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-dark-900/60 border border-white/5 text-xs text-gray-300">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
              <span>
                All inquiries are encrypted and processed by our secure server. We respect client confidentiality and provide Non-Disclosure Agreements (NDAs) upon request.
              </span>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-gold py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-gold-md disabled:opacity-50 transition-all cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing & Dispatching Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Project Request</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Phone & WhatsApp Fallback Channel */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[11px] font-mono text-gold-400 font-bold uppercase tracking-wider block">
                  Prefer Direct Communication?
                </span>
                <span className="text-gray-300">
                  Connect immediately with Founder & Developer Akshaj Lodhi.
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${store.contact.businessPhone.replace(/\s+/g, "")}`}
                  className="px-3.5 py-2 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 font-bold flex items-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Call: {store.contact.businessPhone}</span>
                </a>
                <a
                  href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    "Hi Akshaj, I am interested in hiring AKSHAJ WEB STUDIO for a project."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: {store.contact.whatsapp}</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
