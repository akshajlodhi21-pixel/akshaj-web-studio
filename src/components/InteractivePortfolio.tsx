"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  ExternalLink,
  Play,
  Sparkles,
  Code2,
  Globe,
  Filter,
} from "lucide-react";
import { useStudioStore } from "@/lib/store";
import { ProjectItem } from "@/lib/types";
import ProjectModal from "./ProjectModal";

export default function InteractivePortfolio() {
  const store = useStudioStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [inspectingProject, setInspectingProject] = useState<ProjectItem | null>(null);

  // Extract unique categories dynamically from projects
  const categories = useMemo(() => {
    const set = new Set<string>();
    store.projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [store.projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return store.projects;
    return store.projects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [store.projects, selectedCategory]);

  return (
    <div id="interactive-portfolio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Shipped Digital <span className="text-gold-gradient">Assets</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
            Filter through our production assets. Each project is engineered with high-performance frameworks, clean responsive design, and robust architectures.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-dark-900 border border-white/10 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-gold-500 text-dark-950 font-bold shadow-gold-sm"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-3xl overflow-hidden glass-panel border border-gold-500/20 hover:border-gold-500/50 transition-all duration-500 flex flex-col bg-dark-950/80 shadow-md hover:shadow-gold-md"
          >
            {/* Image Preview Container */}
            <div className="relative w-full h-52 bg-dark-900 overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />

              {/* Category Badge */}
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-dark-950/90 border border-gold-500/40 text-[10px] font-mono font-bold text-gold-300 backdrop-blur-md">
                {project.category}
              </span>

              {/* Status Badge */}
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-dark-950/90 border border-gold-500/40 text-[10px] font-mono font-bold text-gold-300 backdrop-blur-md">
                {project.statusLabel || (project.isConcept ? "Concept Project" : "Production")}
              </span>

              {/* Video Walkthrough Indicator if present */}
              {project.videoUrl && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-dark-950/85 border border-gold-500/40 text-gold-300 flex items-center gap-1.5 text-[10px] font-mono backdrop-blur-md">
                  <Play className="w-3 h-3 fill-gold-400 text-gold-400" />
                  <span>Video Demo</span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-gold-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Technology Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-dark-900 border border-white/10 text-[10px] text-gray-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-dark-900 border border-white/5 text-[10px] text-gold-400/80 font-mono">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  onClick={() => setInspectingProject(project)}
                  className="text-gold-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Inspect Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-gold-500/20 text-gray-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-all border border-white/5 hover:border-gold-500/30"
                    >
                      <Globe className="w-3 h-3 text-gold-400" />
                      <span>Live</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-gray-400">
                      Demo Preview Coming Soon
                    </span>
                  )}

                  <Link
                    href={`/hire?service=${encodeURIComponent(project.category || "Website Development")}`}
                    className="text-[11px] text-gray-400 hover:text-gold-300 underline font-medium"
                  >
                    Hire Similar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Project Modal */}
      <ProjectModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />
    </div>
  );
}
