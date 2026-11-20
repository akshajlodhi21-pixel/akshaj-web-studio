import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
      <SectionHeading
        badge="Legal & Contracts"
        title="Terms and Conditions"
        subtitle="Last revised: November 2026. Commercial framework governing software engineering contracts and project deliveries."
      />

      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-gold-500/20 text-gray-300 text-sm leading-relaxed space-y-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">1. Scope of Engagements</h3>
          <p>
            All website development, Android application engineering, AI solutions, and custom software delivered by AKSHAJ WEB STUDIO are governed by signed milestone agreements or authorized project bookings.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">2. Pricing & Milestone Payments</h3>
          <p>
            Starting prices advertised on the public website represent baseline specifications. Custom architectural additions are itemized in formal project proposals. Unless agreed otherwise, standard project milestones require an initial deposit prior to sprint commencement, with subsequent milestone balances due upon demonstrated staging reviews.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">3. Payment Verification Clause</h3>
          <p>
            Submission of a UPI transaction reference or bank transfer identifier through our payment portal does not constitute verified settlement until reconciled against official bank statements by our finance team.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">4. Code Ownership & Intellectual Property</h3>
          <p>
            Upon settlement of final milestone balances, full commercial and intellectual property rights to custom codebases, design assets, and database schemas are transferred to the client.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">5. Warranty & Maintenance</h3>
          <p>
            All custom production deliveries are backed by dedicated post-launch technical warranty coverage (30 to 90 days depending on package tier) covering bug remediation, browser compatibility, and server runtime stability.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
          <Link href="/" className="btn-gold-outline px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Home</span>
          </Link>
          <span className="text-xs text-gray-500">AKSHAJ WEB STUDIO • Commercial Terms</span>
        </div>
      </div>
    </div>
  );
}
