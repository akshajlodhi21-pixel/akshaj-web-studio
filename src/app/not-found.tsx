import Link from "next/link";
import { Sparkles, ArrowLeft, Home, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 p-8 rounded-3xl glass-panel border border-gold-500/30 shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center text-dark-950 font-black text-2xl shadow-gold-md animate-float">
          404
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs font-semibold text-gold-400 uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Reality Desynchronized</span>
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-2">
          Page Not Found
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          The digital node or coordinate you are trying to access does not exist or has been shifted in the studio matrix.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
