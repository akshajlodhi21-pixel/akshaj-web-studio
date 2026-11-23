"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, LogIn, ArrowLeft } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for diagnostics
    console.error("Admin Console Runtime Exception:", error);
  }, [error]);

  const handleResetSession = () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("aws_store_admin_auth_v4");
        sessionStorage.removeItem("aws_store_admin_auth_v2");
        window.location.href = "/admin/login";
      }
    } catch {
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full p-8 rounded-3xl glass-panel border border-gold-500/30 text-center shadow-2xl">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center text-white shadow-lg">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-3 font-mono">
          <span>Client-Side Runtime Recovery</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
          Admin Console Interruption
        </h2>

        <p className="text-xs text-gray-400 mb-6 leading-relaxed">
          The administrative console encountered an unexpected client state or session synchronization issue. Your saved website data remains safe.
        </p>

        {error?.message && (
          <div className="p-3 rounded-xl bg-dark-900 border border-white/10 text-left font-mono text-[11px] text-gray-400 mb-6 max-h-28 overflow-y-auto">
            <span className="text-red-400 font-bold block mb-1">Diagnostic Detail:</span>
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Dashboard</span>
          </button>

          <button
            type="button"
            onClick={handleResetSession}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Re-authenticate</span>
          </button>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>
      </div>
    </div>
  );
}
