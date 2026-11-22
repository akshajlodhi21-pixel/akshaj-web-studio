"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { useStudioStore } from "@/lib/store";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const store = useStudioStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin console
  useEffect(() => {
    if (store.isAdminLoggedIn) {
      router.push("/admin");
    }
  }, [store.isAdminLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Try Firebase Auth if configured
      if (isFirebaseConfigured && auth) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const token = await userCredential.user.getIdToken();
          store.loginAdmin(token);
          router.push("/admin");
          return;
        } catch (firebaseErr: any) {
          console.warn("Firebase sign-in fallback to server auth endpoint:", firebaseErr);
        }
      }

      // 2. Server-side cryptographically signed authentication
      const authRes = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const authData = await authRes.json();

      if (authRes.ok && authData.success) {
        store.loginAdmin(authData.token);
        router.push("/admin");
      } else {
        setError(authData.error || "Invalid administrator credentials. Access denied.");
      }
    } catch (err: any) {
      setError(err?.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden py-12">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-md w-full relative z-10 p-8 sm:p-10 rounded-3xl glass-panel border border-gold-500/40 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center text-dark-950 font-black shadow-gold-md">
            <Shield className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-[10px] font-semibold text-gold-400 uppercase tracking-widest mb-2 font-mono">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Encrypted Administration Gateway</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Admin Authentication
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Access AKSHAJ WEB STUDIO business management portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Admin Email / Identifier
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@akshajwebstudio.com"
                className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Security Key / Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-gold-sm disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Access Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Authorized Access Only Notice */}
        <div className="mt-8 p-4 rounded-2xl bg-dark-900/90 border border-gold-500/20 text-xs text-center">
          <span className="font-bold text-gold-400 uppercase font-mono text-[10px] block mb-1">
            Authorized Personnel Only
          </span>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Administrative access is restricted to verified studio operators. All authentication attempts are logged and monitored.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
