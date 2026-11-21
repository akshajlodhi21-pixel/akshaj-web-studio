import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
      <SectionHeading
        badge="Legal & Compliance"
        title="Privacy Policy"
        subtitle="Last revised: November 2026. How AKSHAJ WEB STUDIO safeguards your personal and commercial data."
      />

      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-gold-500/20 text-gray-300 text-sm leading-relaxed space-y-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">1. Introduction</h3>
          <p>
            AKSHAJ WEB STUDIO (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the Studio&rdquo;) provides bespoke software engineering, website development, artificial intelligence solutions, and digital consulting. This Privacy Policy details our operational commitments to privacy, data confidentiality, and international compliance across all digital touchpoints.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">2. Data We Collect</h3>
          <p className="mb-2">We collect data strictly required to deliver our professional services:</p>
          <ul className="list-disc list-inside space-y-1.5 text-gray-400 pl-2">
            <li><strong className="text-white">Client Inquiry Data:</strong> Name, corporate email, telephone, company name, project specifications, and budget ranges submitted via our booking portals.</li>
            <li><strong className="text-white">Payment Audit Data:</strong> UPI transaction reference IDs, payer names, and transfer amounts for reconciliation. We never store credit card or raw banking credentials.</li>
            <li><strong className="text-white">Technical Analytics:</strong> Anonymized interaction telemetry to ensure extreme speed, reliability, and security of our web infrastructure.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">3. Non-Disclosure & Intellectual Property</h3>
          <p>
            Every client engagement is treated with enterprise confidentiality. We happily execute mutual Non-Disclosure Agreements (NDAs) prior to architectural code delivery or intellectual property exchange.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">4. Data Storage & Security</h3>
          <p>
            Data is stored using Google Cloud Firebase and encrypted local storage stores. Administrative access is protected by encrypted multi-tier authentication.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">5. Inquiries & Data Rights</h3>
          <p>
            You have the right to request access, correction, or deletion of your client inquiry record at any time by contacting our lead administrative team at <a href="mailto:akshajlodhi21@gmail.com" className="text-gold-400 underline">akshajlodhi21@gmail.com</a>.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
          <Link href="/" className="btn-gold-outline px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Home</span>
          </Link>
          <span className="text-xs text-gray-500">AKSHAJ WEB STUDIO • Privacy & Security</span>
        </div>
      </div>
    </div>
  );
}
