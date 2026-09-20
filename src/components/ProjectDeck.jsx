import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Play,
  Grid,
  Layers,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { projectsData, projectCategories } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function ProjectDeck({ onOpenVideo }) {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("deck"); // 'deck' | 'grid'
  const [showRenderNotice, setShowRenderNotice] = useState(false);

  const availableCategories = projectCategories.filter((cat) => {
    return projectsData.some((p) => p.category === cat);
  });

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  const activeProject = filteredProjects[currentIndex] || filteredProjects[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Keyboard arrow navigation for the deck
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== "deck") return;
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredProjects.length, viewMode]);

  const isRenderDomain = activeProject?.links?.live?.includes("onrender.com");

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Section Header with View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wider uppercase">
                // 02. INTERACTIVE SHOWCASE
              </span>
              <span className="text-xs font-mono text-gray-500">
                ({filteredProjects.length} Projects Indexed)
              </span>
            </div>
            <h2
              className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              SELECTED WORKS & <br className="hidden sm:inline" />
              <span style={{ color: "var(--accent-violet)" }}>PRODUCTION DEPLOYMENTS.</span>
            </h2>
          </div>

          {/* Controls: Deck vs Grid View Toggle */}
          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center p-1 rounded-full border"
              style={{
                backgroundColor: isDark ? "#121521" : "#ece9dd",
                borderColor: "var(--border-subtle)",
              }}
            >
              <button
                onClick={() => setViewMode("deck")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "deck"
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-black dark:hover:text-white"
                }`}
                title="Cinematic Deck View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Deck</span>
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-black dark:hover:text-white"
                }`}
                title="Compact Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills Ribbon */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-black/5 dark:border-white/5">
          <button
            onClick={() => handleSelectCategory("All")}
            className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === "All"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            All ({projectsData.length})
          </button>
          {availableCategories.map((cat) => {
            const count = projectsData.filter((p) => p.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* VIEW 1: CINEMATIC INTERACTIVE DECK */}
        {viewMode === "deck" && activeProject && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="theme-card p-6 sm:p-10 relative overflow-hidden"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, #0d101a 0%, #141826 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f7f5ed 100%)",
                }}
              >
                {/* Top Card Navigation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-heading font-black text-3xl sm:text-4xl"
                      style={{ color: activeProject.accent || "var(--accent-violet)" }}
                    >
                      {activeProject.num}
                    </span>
                    <span
                      className="font-mono text-xs px-3 py-1 rounded-full font-semibold border uppercase tracking-wider"
                      style={{
                        borderColor: activeProject.accent || "var(--accent-violet)",
                        color: activeProject.accent || "var(--accent-violet)",
                        backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                      }}
                    >
                      {activeProject.category}
                    </span>
                  </div>

                  {/* Step counter & Arrow buttons */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-gray-500">
                      <span style={{ color: "var(--accent-violet)" }}>{currentIndex + 1}</span> /{" "}
                      {filteredProjects.length}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handlePrev}
                        className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                          borderColor: "var(--border-strong)",
                          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                          color: "var(--text-primary)",
                        }}
                        aria-label="Previous project"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleNext}
                        className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                          borderColor: "var(--border-strong)",
                          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                          color: "var(--text-primary)",
                        }}
                        aria-label="Next project"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Card Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Title, Quote & Highlights */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    <div>
                      {activeProject.status === "In Progress" && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                          Actively Under Construction
                        </div>
                      )}
                      <h3
                        className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {activeProject.title}
                      </h3>
                      {activeProject.date && (
                        <p className="font-mono text-xs text-gray-500 mt-1">
                          {activeProject.date}
                        </p>
                      )}
                    </div>

                    <p
                      className="text-base sm:text-lg leading-relaxed font-normal"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {activeProject.description}
                    </p>

                    {/* Bullet Highlights */}
                    {activeProject.highlights && activeProject.highlights.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {activeProject.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                          >
                            <CheckCircle2
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: activeProject.accent || "var(--accent-violet)" }}
                            />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Architectural Quote & Tech Chips */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                    {/* Architectural Quote Card */}
                    <div
                      className="p-5 rounded-2xl border"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-gray-500 uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                        <span>{activeProject.quoteRole || "Architecture Focus"}</span>
                      </div>
                      <p
                        className="font-display italic text-sm leading-relaxed"
                        style={{ color: "var(--text-primary)" }}
                      >
                        &ldquo;{activeProject.quote}&rdquo;
                      </p>
                    </div>

                    {/* Technologies Pills */}
                    {activeProject.technologies && activeProject.technologies.length > 0 && (
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 mb-2">
                          Technologies Used
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.technologies.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-xs px-2.5 py-1 rounded-md border"
                              style={{
                                backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                                borderColor: "var(--border-subtle)",
                                color: "var(--text-primary)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                      {activeProject.links?.live && (
                        <div className="relative">
                          <a
                            href={activeProject.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => isRenderDomain && setShowRenderNotice(true)}
                            onMouseLeave={() => setShowRenderNotice(false)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                            style={{
                              backgroundColor: activeProject.accent || "var(--accent-violet)",
                            }}
                          >
                            <span>Live Deployment</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>

                          {/* Free tier notice tooltip */}
                          {isRenderDomain && showRenderNotice && (
                            <div className="absolute bottom-full left-0 mb-2 w-56 p-2.5 bg-black/95 text-white rounded-xl shadow-2xl border border-white/20 text-[11px] font-mono leading-tight z-30">
                              <div className="flex items-center gap-1 text-amber-400 font-bold mb-1">
                                <Clock className="w-3.5 h-3.5" />
                                Render Instance Notice
                              </div>
                              Hosted on Render. Server may take ~40 seconds to spin up on cold starts.
                            </div>
                          )}
                        </div>
                      )}

                      {activeProject.links?.github && (
                        <a
                          href={activeProject.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold border transition-all hover:bg-black/5 dark:hover:bg-white/5"
                          style={{
                            borderColor: "var(--border-strong)",
                            color: "var(--text-primary)",
                          }}
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>Code Repository</span>
                        </a>
                      )}

                      {activeProject.video && (
                        <button
                          onClick={() => onOpenVideo(activeProject.video, activeProject.title)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30 transition-all hover:bg-sky-500/25 active:scale-95 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Video Demo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Quick-Jump Pill Bar */}
                <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar">
                  {filteredProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex
                          ? "w-8 bg-violet-600"
                          : "w-2 bg-black/20 dark:bg-white/20 hover:bg-violet-400"
                      }`}
                      aria-label={`Jump to project ${p.title}`}
                      title={p.title}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* VIEW 2: COMPACT 2-COLUMN GRID (FOR FAST SCANNING) */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="theme-card p-5 flex flex-col justify-between hover:translate-y-[-2px] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="font-heading font-black text-xl text-violet-600 dark:text-violet-400">
                      {project.num}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-black/10 dark:border-white/10 text-gray-500">
                      {project.category}
                    </span>
                  </div>
                  <h4
                    className="font-display font-bold text-lg mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h4>
                  <p
                    className="text-xs line-clamp-2 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5 text-gray-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-violet-600 dark:text-violet-400"
                        title="Live Demo"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {project.video && (
                      <button
                        onClick={() => onOpenVideo(project.video, project.title)}
                        className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-sky-500"
                        title="Watch Video"
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
