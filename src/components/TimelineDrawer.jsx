import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ArrowUpRight, CheckCircle2, Calendar, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function TimelineDrawer({ exp, onClose }) {
  const { isDark } = useTheme();
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!exp) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Lock background window scroll while drawer is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [exp, onClose]);

  if (!exp) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[99990] flex justify-end"
        data-lenis-prevent="true"
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />

        {/* Slide-out Drawer from Right */}
        <motion.div
          ref={drawerRef}
          data-lenis-prevent="true"
          className="relative h-full max-h-screen z-[99991] flex flex-col border-l shadow-2xl overflow-y-auto"
          style={{
            width: "min(620px, 100vw)",
            borderColor: `${exp.color}40`,
            backgroundColor: isDark ? "#0a0c16" : "#ffffff",
            color: "var(--text-primary)",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor: `${exp.color}60 transparent`,
          }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Gradient Accent Bar */}
          <div
            className="w-full h-1.5 shrink-0 sticky top-0 z-30"
            style={{
              background: `linear-gradient(90deg, ${exp.accent || exp.color}, ${exp.color})`,
            }}
          />

          {/* Sticky Header with Close Button */}
          <div
            className="sticky top-1.5 z-20 px-6 sm:px-8 py-4 flex items-center justify-between border-b backdrop-blur-xl"
            style={{
              backgroundColor: isDark ? "rgba(10, 12, 22, 0.95)" : "rgba(255, 255, 255, 0.95)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: exp.color }}
              />
              <span
                className="font-mono text-xs tracking-wider uppercase font-bold"
                style={{ color: exp.color }}
              >
                {exp.type} // {exp.period}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full border transition-all cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isDark ? "#161929" : "#f1efe7",
                borderColor: "var(--border-subtle)",
                color: "var(--text-primary)",
              }}
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Scrollable Content Container */}
          <div className="p-6 sm:p-8 flex flex-col gap-6 flex-1 pb-24" data-lenis-prevent="true">
            {/* Title & Organization Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight"
                  style={{ fontFamily: '"Oswald", sans-serif', color: "var(--text-primary)" }}
                >
                  {exp.title}
                </h2>

                <div
                  className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shadow-sm"
                  style={{
                    background: `${exp.color}15`,
                    borderColor: `${exp.color}40`,
                  }}
                >
                  {exp.icon}
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-sm font-bold" style={{ color: exp.color }}>
                <span>{exp.org}</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs text-gray-500 mt-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Achievement Badge */}
            {exp.achievement && (
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border self-start"
                style={{
                  background: `${exp.color}12`,
                  borderColor: `${exp.color}40`,
                  color: exp.color,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{exp.achievement}</span>
              </div>
            )}

            <div
              className="w-full h-px border-b"
              style={{ borderColor: "var(--border-subtle)" }}
            />

            {/* Overview / Full Description */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                // Executive Overview
              </p>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {exp.fullDesc}
              </p>
            </div>

            {/* Key Deliverables / LaTeX Resume Bullets */}
            {exp.bullets && exp.bullets.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold">
                  // Key Deliverables & Production Impact
                </p>
                <div className="space-y-3">
                  {exp.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: exp.color }}
                      />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Publication PDF View Button */}
            {exp.pdfUrl && (
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={exp.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer"
                  style={{ backgroundColor: exp.color }}
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {exp.id === 4
                      ? "🏆 View Big Data Computing (Top 2% Topper PDF)"
                      : "View Conference Presentation Certificate (PDF)"}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {exp.mlPdfUrl && (
                  <a
                    href={exp.mlPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer"
                    style={{ backgroundColor: "#0284c7" }}
                  >
                    <FileText className="w-4 h-4" />
                    <span>📜 View Machine Learning (Elite Certificate PDF)</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}

            {/* Technologies Tags */}
            {exp.tags && exp.tags.length > 0 && (
              <div className="pt-2">
                <p className="font-mono text-xs uppercase tracking-widest mb-3 text-gray-400 font-semibold">
                  // Technologies & Competencies
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs px-3 py-1.5 rounded-lg uppercase tracking-wide border font-semibold"
                      style={{
                        background: `${exp.color}10`,
                        color: exp.color,
                        borderColor: `${exp.color}35`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Watermark Station ID */}
            <div
              className="pt-8 font-black select-none pointer-events-none mt-auto"
              style={{
                fontFamily: '"Oswald", sans-serif',
                fontSize: "6rem",
                lineHeight: 1,
                color: `${exp.color}15`,
                letterSpacing: "-0.05em",
              }}
            >
              0{exp.id}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
