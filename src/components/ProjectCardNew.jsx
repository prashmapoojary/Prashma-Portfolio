import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play, Clock, Sparkles } from "lucide-react";

export default function ProjectCardNew({ project, onWatchVideo }) {
  const hasLive = Boolean(project.links?.live);
  const hasGithub = Boolean(project.links?.github);
  const hasVideo = Boolean(project.video);
  const hasHighlights = Boolean(project.highlights && project.highlights.length > 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="glass-panel p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Top Accent Gradient Border */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-80"
        style={{
          background: `linear-gradient(90deg, ${project.color || "#8b5cf6"}, ${
            project.accent || "#06b6d4"
          })`,
        }}
      />

      <div>
        {/* Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
              {project.category}
            </span>

            {project.status && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
                {project.status}
              </span>
            )}
          </div>

          {project.date && (
            <span className="font-mono text-[11px] text-white/40 tracking-wider">
              {project.date}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug group-hover:text-[#c084fc] transition-colors mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed font-sans mb-5">
          {project.description}
        </p>

        {/* Highlights */}
        {hasHighlights && (
          <div className="mb-6 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a78bfa] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Key Highlights</span>
            </div>
            <ul className="space-y-1.5">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="text-xs text-white/75 font-mono flex items-start gap-2">
                  <span className="text-[#a78bfa] mt-0.5">▹</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live Demo Link */}
          {hasLive && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-gray-200 transition-all hover:scale-[1.03] shadow-md"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Watch Demo Video Button */}
          {hasVideo && (
            <button
              onClick={() => onWatchVideo(project.video, project.title)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Demo</span>
            </button>
          )}

          {/* GitHub Button */}
          {hasGithub && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>GitHub</span>
            </a>
          )}
        </div>

        {/* Free-tier wake-up note */}
        {hasLive && (
          <span className="font-mono text-[10px] text-white/45 flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#a78bfa]" />
            May take a few sec to wake up
          </span>
        )}
      </div>
    </motion.div>
  );
}
