"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bot,
  X,
  Send,
  Sparkles,
  MessageSquare,
  Mail,
  Instagram,
  Phone,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  HelpCircle,
} from "lucide-react";
import { useStudioStore } from "@/lib/store";

interface Message {
  id: string;
  sender: "assistant" | "user";
  text: string;
  options?: Array<{ label: string; action: () => void }>;
  contactLinks?: boolean;
}

const FAQ_KNOWLEDGE: Array<{
  triggers: string[];
  reply: string;
  hasContact?: boolean;
}> = [
  {
    triggers: ["service", "what do you do", "offer", "provide", "capabilities"],
    reply:
      "AKSHAJ WEB STUDIO specializes in 4 core digital engineering verticals:\n\n• Custom Website Development: Bespoke, ultra-fast websites built with Next.js, React, and TypeScript.\n• Native & Cross-Platform Mobile Apps: Android and multi-platform applications engineered for reliability.\n• Intelligent AI Solutions: LLM integrations, conversational agents, custom vector workflows, and automation.\n• High-Converting UI/UX & Web Design: Dark luxury, glassmorphism, and responsive design systems.\n\nEvery project is personally architected and delivered by Founder Akshaj Lodhi.",
    hasContact: true,
  },
  {
    triggers: ["cost", "price", "pricing", "rate", "budget", "how much", "quote"],
    reply:
      "Our investment tiers are transparent and tailored to project scope:\n\n• Standard Web Solutions: Starting from ₹14,999 ($180)\n• Corporate & Business Portals: Starting from ₹24,999 ($300)\n• High-Conversion E-Commerce Stores: Starting from ₹34,999 ($420)\n• Custom AI Workflows & Automation: Starting from ₹39,999 ($480)\n• Android & Mobile Applications: Starting from ₹49,999 ($600)\n\nYou can also use our interactive Project Cost Estimator on the homepage for an instant calculation!",
    hasContact: true,
  },
  {
    triggers: ["time", "duration", "turnaround", "how long", "timeline", "deadline"],
    reply:
      "Typical turnaround times for AKSHAJ WEB STUDIO projects:\n\n• Landing Pages & Simple Websites: 5 - 7 business days\n• Corporate Portals & E-Commerce: 10 - 18 business days\n• Mobile Apps & Custom AI Integrations: 2 - 4 weeks\n• Enterprise Platforms: Sprinted in 3 - 6 weeks\n\nExpress sprint delivery is also available for urgent launches.",
    hasContact: false,
  },
  {
    triggers: ["ai", "artificial intelligence", "workflow", "automation", "llm", "gemini", "gpt"],
    reply:
      "We build production AI systems designed to solve real business problems:\n\n• Intelligent conversational agents and 24/7 customer assistants\n• Autonomous data extraction and document processing workflows\n• Custom LLM API integrations (Google Gemini, OpenAI, Claude)\n• Vector search, semantic knowledge vaults, and CRM automations\n\nAll AI tools are engineered without exposing private keys or customer data.",
    hasContact: true,
  },
  {
    triggers: ["founder", "akshaj", "who is", "about", "developer", "experience"],
    reply:
      "Akshaj Lodhi is the Founder and Lead Developer of AKSHAJ WEB STUDIO.\n\nHe oversees every client project end-to-end — from architectural design and UX prototyping to full-stack code and cloud deployment. He focuses on modern web engineering (Next.js/TypeScript), AI workflows, and Android software with 100% commitment to bespoke craftsmanship.",
    hasContact: true,
  },
  {
    triggers: ["contact", "hire", "talk", "email", "whatsapp", "call", "instagram", "consult"],
    reply:
      "You can connect directly with Founder Akshaj Lodhi through any of our official channels:\n\n• WhatsApp: +91 91985 62197 (Instant Chat)\n• Email: akshajlodhi21@gmail.com\n• Instagram: @luckybro_9198\n• Phone: +91 91985 62197\n• Book Project Consultation: Use our online Hire portal!",
    hasContact: true,
  },
];

export default function AIAssistant() {
  const store = useStudioStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Hello! I am the AKSHAJ WEB STUDIO AI Assistant — an automated digital assistant designed by Founder Akshaj Lodhi. How can I help you today?",
      options: [
        { label: "What services do you offer?", action: () => handlePreset("What services do you offer?") },
        { label: "How much does a website cost?", action: () => handlePreset("How much does a website cost?") },
        { label: "What is your typical timeline?", action: () => handlePreset("What is your typical project timeline?") },
        { label: "How can I hire Akshaj Lodhi?", action: () => handlePreset("How can I hire Akshaj Lodhi?") },
      ],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handlePreset = (text: string) => {
    sendMessage(text);
  };

  const sendMessage = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userText.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Generate intelligent studio response
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let match = FAQ_KNOWLEDGE.find((faq) =>
        faq.triggers.some((t) => lower.includes(t))
      );

      let replyText = "";
      let hasContact = false;

      if (match) {
        replyText = match.reply;
        hasContact = match.hasContact || false;
      } else {
        replyText = `Thank you for your message! At AKSHAJ WEB STUDIO, we engineer custom Websites, Android Apps, AI Workflows, and High-Converting UI/UX.\n\nFor custom questions or specific architectural requirements, Founder Akshaj Lodhi is available to review your project scope directly.`;
        hasContact = true;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: replyText,
        contactLinks: hasContact,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "assistant",
        text: "Conversation refreshed. I am the AKSHAJ WEB STUDIO AI Assistant. How can I assist your project today?",
        options: [
          { label: "Explore Services", action: () => handlePreset("What services do you offer?") },
          { label: "Project Cost Estimator", action: () => handlePreset("How much does a website cost?") },
          { label: "Book Consultation", action: () => handlePreset("How can I hire Akshaj Lodhi?") },
        ],
      },
    ]);
  };

  const cleanPhone = store.contact.whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hello Akshaj Lodhi, I am chatting with your AI Assistant and would like to discuss a project with AKSHAJ WEB STUDIO."
  )}`;
  const mailUrl = `mailto:${store.contact.email || "akshajlodhi21@gmail.com"}?subject=Consultation%20Inquiry%20via%20AI%20Assistant`;
  const igUrl = store.contact.instagramUrl || "https://www.instagram.com/luckybro_9198/";

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      {/* Floating Assistant Launcher Button */}
      {!isOpen && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative p-3.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border-2 border-gold-500/50 hover:border-gold-400 text-white shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md"
            aria-label="Open AKSHAJ WEB STUDIO AI Assistant"
          >
            {/* Glowing ring animation */}
            <span className="absolute -inset-1 rounded-full bg-gold-400/25 animate-ping opacity-60 pointer-events-none" />

            <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                <span>AI Assistant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[10px] text-gold-400/90 font-mono">Ask about services & costs</span>
            </div>

            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold-400 border-2 border-dark-950 flex items-center justify-center text-[9px] font-bold text-dark-950">
                1
              </span>
            )}
          </button>
        </div>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[420px] h-[550px] max-h-[85vh] rounded-3xl bg-dark-950/95 border-2 border-gold-500/40 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-fade-in text-xs">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border-b border-gold-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-400 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-dark-950" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-white text-sm">AKSHAJ STUDIO AI</h4>
                  <span className="px-1.5 py-0.2 rounded bg-gold-500/20 text-gold-300 font-mono text-[9px] uppercase font-bold">
                    Virtual Assistant
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">
                  Instant guidance for web, app & AI solutions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close AI Assistant"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transparent AI Disclaimer Bar */}
          <div className="px-3.5 py-1.5 bg-gold-500/10 border-b border-gold-500/15 text-[10px] text-gold-300/90 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
            <span>Automated AI Assistant. For live inquiries, connect directly with Akshaj Lodhi.</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-gold-500/20">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-dark-950 font-medium rounded-tr-none shadow-gold-sm"
                      : "bg-dark-900/90 border border-white/10 text-gray-200 rounded-tl-none shadow-md"
                  }`}
                >
                  {m.text}

                  {/* Contact Options Card when relevant */}
                  {m.contactLinks && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[11px]">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1 border border-emerald-500/30 transition-all"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp Chat</span>
                      </a>
                      <a
                        href={mailUrl}
                        className="px-2.5 py-1.5 rounded-lg bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 font-semibold flex items-center gap-1 border border-gold-500/30 transition-all"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Email Me</span>
                      </a>
                      {store.contact.instagramEnabled !== false && (
                        <a
                          href={igUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 font-semibold flex items-center gap-1 border border-pink-500/30 transition-all"
                        >
                          <Instagram className="w-3 h-3" />
                          <span>Instagram</span>
                        </a>
                      )}
                      <Link
                        href="/hire"
                        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1 transition-all"
                      >
                        <span>Book Project &rarr;</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick Interactive Options */}
                {m.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {m.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={opt.action}
                        className="px-2.5 py-1 rounded-full bg-dark-900 hover:bg-gold-500/20 border border-gold-500/30 hover:border-gold-500/60 text-gold-300 hover:text-white text-[10px] font-medium transition-all"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Shortcuts */}
          <div className="px-3 py-1.5 border-t border-white/5 bg-dark-900/50 flex items-center gap-1 overflow-x-auto text-[10px]">
            <button
              onClick={() => handlePreset("Tell me about custom AI solutions")}
              className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-gold-500/10 text-gray-400 hover:text-gold-300 whitespace-nowrap transition-colors"
            >
              🤖 AI Solutions
            </button>
            <button
              onClick={() => handlePreset("How much does e-commerce development cost?")}
              className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-gold-500/10 text-gray-400 hover:text-gold-300 whitespace-nowrap transition-colors"
            >
              🛒 E-Commerce Cost
            </button>
            <button
              onClick={() => handlePreset("Can you build Android apps?")}
              className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-gold-500/10 text-gray-400 hover:text-gold-300 whitespace-nowrap transition-colors"
            >
              📱 Android Apps
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="p-3 bg-dark-900 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about our services, pricing, or tech stack..."
              className="flex-1 bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/60"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:opacity-40 disabled:hover:bg-gold-500 text-dark-950 font-bold transition-all shrink-0"
              aria-label="Send message to AI Assistant"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
