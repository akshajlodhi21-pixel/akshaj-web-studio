"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Tag,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  PlusCircle,
  Eye,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectModal from "@/components/ProjectModal";
import { useStudioStore } from "@/lib/store";
import { ProjectItem } from "@/lib/types";

export default function PortfolioPage() {
  const store = useStudioStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    "All",
    "Web Development",
    "AI Solutions",
    "Android App",
    "Custom Software",
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return store.projects;
    return store.projects.filter((p) => p.category === selectedCategory);
  }, [store.projects, selectedCategory]);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background Glow */}
      <div className="absolute top-28 right-1/4 w-[450px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Header */}
      <SectionHeading
        badge="Engineered Work Showcase"
        title="Featured Client Projects & Solutions"
        subtitle="A curated portfolio of high-performance web systems, AI workflows, native Android applications, and bespoke software engineered for international clients."
      />

      {/* Admin Quick Action Pill */}
      <div className="max-w-2xl mx-auto mb-10 p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between text-xs text-gold-300">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold-400 shrink-0" />
          <span>
            Owner can add, edit, delete, and upload project screenshots via Admin Console
          </span>
        </div>
        <Link
          href="/admin"
          className="btn-gold px-3 py-1 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Manage</span>
        </Link>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-gold-500 text-dark-950 font-bold shadow-gold-sm"
                : "bg-dark-900 border border-white/10 text-gray-300 hover:border-gold-500/40 hover:text-white"
            }`}
          >
            {cat} {cat === "All" && `(${store.projects.length})`}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-gold-500/20 flex flex-col justify-between group"
          >
            {/* Screenshot Header */}
            <div
              className="relative w-full h-56 bg-dark-900 cursor-pointer overflow-hidden"
              onClick={() => setActiveModalProject(project)}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-dark-950/90 border border-gold-500/40 text-[10px] font-bold text-gold-300 uppercase tracking-wider backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* View Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-gold-sm">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Case Study</span>
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => setActiveModalProject(project)}
                  className="text-xl font-bold text-white mb-2 cursor-pointer group-hover:text-gold-200 transition-colors"
                >
                  {project.title}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-dark-900 border border-gold-500/20 text-[10px] text-gold-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-gold-400 font-semibold hover:text-gold-200 flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                  >
                    <span>Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/10 max-w-md mx-auto">
          <p className="text-gray-400 text-sm mb-4">
            No projects found in this category.
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="btn-gold px-4 py-2 rounded-xl text-xs font-bold"
          >
            Show All Projects
          </button>
        </div>
      )}

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
