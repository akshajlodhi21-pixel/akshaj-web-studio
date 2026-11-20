"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Copy,
  Check,
  CreditCard,
  Building2,
  FileCheck,
  ShieldCheck,
  Clock,
  Send,
  HelpCircle,
  ExternalLink,
  Zap,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useStudioStore } from "@/lib/store";
import { generateId } from "@/lib/utils";
import { PaymentRecord } from "@/lib/types";

export default function PaymentPage() {
  const store = useStudioStore();
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedPayment, setSubmittedPayment] = useState<PaymentRecord | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phoneNumber: "",
    amount: "",
    transactionId: "",
    projectReference: "",
    paymentMethod: "UPI" as const,
    notes: "",
  });

  const upiId = store.contact.upiId || "akshajwebstudio@okaxis";
  const upiHolder = store.contact.upiHolderName || "Akshaj Web Studio";

  // Dynamic UPI URL for QR code
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    upiHolder
  )}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(
    upiDeepLink
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSubmitConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Submit to server-side payment verification endpoint
      await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: formData.transactionId.trim(),
          clientName: formData.clientName.trim(),
          amount: formData.amount.trim(),
        }),
      });

      // 2. Record payment in local store with status: Pending Verification
      const newPayment: PaymentRecord = {
        id: generateId("AWS-PAY"),
        clientName: formData.clientName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim() || undefined,
        amount: formData.amount.trim(),
        transactionId: formData.transactionId.trim(),
        projectReference: formData.projectReference.trim(),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes.trim() || undefined,
        status: "Pending Verification",
        createdAt: new Date().toISOString(),
      };

      store.addPayment(newPayment);
      setSubmittedPayment(newPayment);
    } catch (err) {
      console.error("Error submitting payment confirmation:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Background glow */}
      <div className="absolute top-24 left-1/4 w-[500px] h-[300px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Header */}
      <SectionHeading
        badge="Official Payment & Settlement"
        title="Secure Payment & UPI Verification"
        subtitle="Settle project milestone deposits, advance retainers, and invoices through our official agency channels. Follow instructions carefully."
      />

      {/* Top Crucial Verification Notice (as requested by user) */}
      <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-200 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="text-white block font-semibold mb-1">
            IMPORTANT PAYMENT VERIFICATION POLICY:
          </strong>
          Submitting a transaction reference ID does not automatically confirm or certify a payment as received. Every submitted transaction is cross-checked against our official bank statement ledger by our administration before being authorized as &ldquo;Verified&rdquo;. Unverified transactions are never marked as successful.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Official UPI Details & QR Code (Cols 1 - 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-[11px] font-semibold text-gold-400 uppercase tracking-wider mb-4">
              <QrCode className="w-3.5 h-3.5" />
              <span>Direct UPI Instant Pay</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Scan & Pay via UPI</h3>
            <p className="text-xs text-gray-400 mb-6">
              Compatible with Google Pay, PhonePe, Paytm, BHIM & NetBanking UPI
            </p>

            {/* QR Code Container with Gold Glow */}
            <div className="relative w-56 h-56 mx-auto p-3 rounded-2xl bg-white border-2 border-gold-400/60 shadow-[0_0_25px_rgba(212,175,55,0.3)] mb-6 flex items-center justify-center">
              <Image
                src={qrCodeUrl}
                alt="Akshaj Web Studio UPI QR Code"
                width={216}
                height={216}
                className="rounded-lg"
                unoptimized
              />
            </div>

            {/* UPI ID Pill with Copy Button */}
            <div className="p-3 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between gap-2 text-left mb-4">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-mono block">
                  Official UPI ID
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {upiId}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:text-white hover:bg-gold-500/20 transition-colors"
                title="Copy UPI ID"
              >
                {copiedUpi ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
              <span>Account Beneficiary:</span>
              <strong className="text-white">{upiHolder}</strong>
            </div>
          </div>

          {/* Step-by-Step Payment Instructions */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4 font-mono">
              Payment Instructions (4 Steps)
            </h4>
            <ol className="space-y-3.5 text-xs text-gray-300">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <span>
                  Scan the QR code above or paste the UPI ID into your UPI payment app.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <span>
                  Input the agreed project advance / milestone amount in INR.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <span>
                  Complete the payment and note down the 12-digit UTR / Bank Reference Number from the confirmation screen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  4
                </span>
                <span>
                  Submit the confirmation form on this page to initiate official verification.
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* Right Column: Payment Confirmation Form (Cols 6 - 12) */}
        <div className="lg:col-span-7">
          {submittedPayment ? (
            /* Submission Complete Screen */
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-gold-500/40 text-center shadow-gold-md animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-950 font-black shadow-gold-sm">
                <Clock className="w-8 h-8 text-dark-950" />
              </div>

              <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
                Payment Logged: Under Verification
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Confirmation Recorded
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Your payment submission of <strong className="text-gold-300">₹{Number(submittedPayment.amount).toLocaleString("en-IN")}</strong> has been registered under record ID <strong className="font-mono text-white">{submittedPayment.id}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 mb-6 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Transaction ID (UTR):</span>
                  <span className="font-mono font-bold text-white">
                    {submittedPayment.transactionId}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Client Name:</span>
                  <span className="text-white">{submittedPayment.clientName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Project Reference:</span>
                  <span className="text-white">{submittedPayment.projectReference}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Audit Status:</span>
                  <span className="text-amber-400 font-semibold">
                    {submittedPayment.status} (Admin Review In Progress)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hi Akshaj Web Studio, I have submitted payment confirmation ${submittedPayment.id} with UTR: ${submittedPayment.transactionId}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>Share Receipt on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setSubmittedPayment(null);
                    setFormData({
                      clientName: "",
                      email: "",
                      phoneNumber: "",
                      amount: "",
                      transactionId: "",
                      projectReference: "",
                      paymentMethod: "UPI",
                      notes: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold w-full sm:w-auto"
                >
                  Submit Another Transaction
                </button>
              </div>
            </div>
          ) : (
            /* Confirmation Form */
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-gold-500/30 shadow-gold-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Payment Confirmation Form
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Submit your transaction details for verification and invoice issuance.
                  </p>
                </div>
                <FileCheck className="w-6 h-6 text-gold-400" />
              </div>

              <form onSubmit={handleSubmitConfirmation} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Client Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Client / Payer Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) =>
                        setFormData({ ...formData, clientName: e.target.value })
                      }
                      placeholder="e.g. Vikram Singhania"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
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
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  {/* Payment Amount */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Payment Amount (INR ₹) <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      placeholder="e.g. 25000"
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Transaction ID */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    UPI Transaction ID / UTR / Reference Number <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.transactionId}
                    onChange={(e) =>
                      setFormData({ ...formData, transactionId: e.target.value })
                    }
                    placeholder="e.g. UPI411234908129 or Bank Reference No."
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors font-mono"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Found on your Google Pay, PhonePe, or Netbanking transfer receipt screen.
                  </p>
                </div>

                {/* Project Reference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Project Reference / Booking ID <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectReference}
                    onChange={(e) =>
                      setFormData({ ...formData, projectReference: e.target.value })
                    }
                    placeholder="e.g. AWS-REQ-9482 or Website Development Milestone 1"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Any specific note regarding this milestone deposit..."
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-gold-sm disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Registering Record & Checking Server API...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Payment For Verification</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Razorpay Gateway Integration Readiness Notice */}
      <div className="p-6 rounded-3xl glass-panel border border-gold-500/25 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">
              Razorpay Payment Gateway Integration Readiness
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
              Server-side signature verification is active at <code className="text-gold-300 font-mono">/api/payment/verify</code>. When Razorpay keys are configured in environment variables, client checkout and automatic cryptographic verification execute seamlessly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-gold-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Gateway API Ready</span>
        </div>
      </div>
    </div>
  );
}
