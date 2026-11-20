"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  Calendar,
  Building2,
  Tag,
  Play,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { ProjectItem } from "@/lib/types";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<"image" | "video">("image");

  if (!project) return null;

  // Extract YouTube ID if applicable
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url;
  };

  const embedVideoUrl = getEmbedUrl(project.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-dark-950 border border-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.95)] z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-gold-500/10 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/50 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-colors z-20"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto pr-1">
          {/* Media Header (Image or Video) */}
          <div className="mb-6">
            {project.videoUrl && (
              <div className="flex items-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setActiveMediaTab("image")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeMediaTab === "image"
                      ? "bg-gold-500 text-dark-950 font-bold"
                      : "bg-dark-900 border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Screenshots</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab("video")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeMediaTab === "video"
                      ? "bg-gold-500 text-dark-950 font-bold"
                      : "bg-dark-900 border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Walkthrough</span>
                </button>
              </div>
            )}

            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gold-500/20 bg-dark-900">
              {activeMediaTab === "video" && embedVideoUrl ? (
                <iframe
                  src={embedVideoUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-dark-950/90 border border-gold-500/40 text-xs font-semibold text-gold-300">
                      {project.category}
                    </span>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title & Metadata */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {project.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6 border-b border-white/10 pb-4">
            {project.clientName && (
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-gold-400" />
                <span>Client: {project.clientName}</span>
              </div>
            )}
            {project.completionDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>Delivered: {project.completionDate}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Case Study & Solution Architecture
            </h4>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.fullOverview || project.description}
            </p>
          </div>

          {/* Technologies Used */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-gold-400" />
              <span>Technology Stack & Integrations</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-dark-900 border border-gold-500/25 text-xs text-gold-300 font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold"
          >
            Close
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <span>Visit Production Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
