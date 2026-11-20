"use client";

import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useStudioStore } from "@/lib/store";

export default function WhatsAppFloating() {
  const store = useStudioStore();
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanPhone = store.contact.whatsapp.replace(/[^0-9]/g, "");
  const defaultMessage = encodeURIComponent(
    "Hi Akshaj Web Studio, I am interested in discussing a digital project with you."
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip banner */}
      {showTooltip && (
        <div className="hidden md:flex items-center gap-2 bg-dark-900/95 border border-gold-500/30 text-white text-xs px-3.5 py-2 rounded-full shadow-2xl backdrop-blur-md animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">Direct WhatsApp Consultation</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-white ml-1 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group p-3.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_4px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-gold-400/50"
        aria-label="Chat on WhatsApp with Akshaj Web Studio"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-gold-400/30 animate-ping opacity-75 pointer-events-none" />

        <MessageSquare className="w-6 h-6 fill-current relative z-10" />
      </a>
    </div>
  );
}
