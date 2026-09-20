import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Clock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ProjectCard({ project, onOpenVideo }) {
  const { isDark } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const isRender = project.links.live && project.links.live.includes("onrender.com");
  const isInProgress = project.status === "In Progress";
  const hasHighlights = project.highlights && project.highlights.length > 0;
  const hasTech = project.technologies && project.technologies.length > 0;

  // Domain accent colors
  const domainColors = {
    "Full Stack Web Developer": {
      badge: isDark ? "bg-violet-500/10 text-violet-300 border-violet-500/30" : "bg-violet-50 text-violet-700 border-violet-200",
      accent: "#7c3aed",
    },
    "Data Analytics": {
      badge: isDark ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" : "bg-emerald-50 text-emerald-700 border-emerald-200",
      accent: "#059669",
    },
    "Generative AI": {
      badge: isDark ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30" : "bg-indigo-50 text-indigo-700 border-indigo-200",
      accent: "#4f46e5",
    },
    "DevOps": {
      badge: isDark ? "bg-sky-500/10 text-sky-300 border-sky-500/30" : "bg-sky-50 text-sky-700 border-sky-200",
      accent: "#0284c7",
    },
  };

  const domain = domainColors[project.category] || domainColors["Full Stack Web Developer"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="theme-card flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden group hover:translate-y-[-3px]"
    >
      {/* Top Header: Index Num & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <span
              className="font-heading font-black text-2xl tracking-tighter"
              style={{ color: domain.accent }}
            >
              {project.num}
            </span>
            <span
              className={`font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${domain.badge}`}
            >
              {project.category}
            </span>
          </div>

          {/* Status Badge */}
          {isInProgress ? (
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              In Progress
            </span>
          ) : project.date ? (
            <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
              {project.date}
            </span>
          ) : null}
        </div>

        {/* Project Title */}
        <h3
          className="font-display font-bold text-xl sm:text-2xl mb-3 tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5 font-normal"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Key Highlights Bullet Points */}
        {hasHighlights && (
          <div className="mb-5 space-y-1.5">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: domain.accent }}
                />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Block: Technologies & Actions */}
      <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/5 space-y-4">
        {/* Technologies Pills */}
        {hasTech && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  borderColor: "var(--border-subtle)",
                  color: isDark ? "#cbd5e1" : "#475569",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* Live Link */}
          {project.links.live && (
            <div className="relative">
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 shadow-sm"
                style={{ backgroundColor: domain.accent }}
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Render Wake-up Tooltip */}
              {isRender && showTooltip && (
                <div className="absolute bottom-full left-0 mb-2 w-52 p-2 bg-black/90 backdrop-blur-md border border-white/20 text-white rounded-lg shadow-xl text-[10px] font-mono leading-tight z-30 pointer-events-none">
                  <div className="flex items-center gap-1 text-amber-400 font-bold mb-0.5">
                    <Clock className="w-3 h-3" />
                    Free Tier Notice
                  </div>
                  Hosted on Render. May take 30-50s to wake up on first visit.
                </div>
              )}
            </div>
          )}

          {/* GitHub Link */}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
              }}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}

          {/* Video Demo Button (e.g. Project 10) */}
          {project.video && (
            <button
              onClick={() => onOpenVideo(project.video, project.title)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30 transition-all duration-200 hover:bg-sky-500/25 active:scale-95 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Watch Video Demo</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
