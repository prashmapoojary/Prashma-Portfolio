import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  ChevronDown,
  Layers,
  Activity,
  Terminal,
  Cpu,
  TrendingUp,
  Radio,
} from "lucide-react";
import { projectsData } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";

function GithubIcon({ className = "w-4 h-4" }) {
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

/**
 * Curated 10 distinct designer palettes:
 * In Light Mode: Each card has its own rich, identifiable, solid pastel hue (no ghosting, 100% opaque).
 * In Dark Mode: Corresponding deep obsidian neon tone.
 */
const projectColorPalettes = [
  // 01 CollabBoard - Electric Indigo Lavender
  {
    lightSolidBg: "#eef2ff",
    lightBg: "linear-gradient(145deg, #eef2ff 0%, #e0e7ff 100%)",
    lightBorder: "#a5b4fc",
    lightAccent: "#4f46e5",
    lightTextPrimary: "#1e1b4b",
    lightTextSecondary: "#3730a3",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#14172e",
    darkBg: "linear-gradient(145deg, #1e2246 0%, #101326 100%)",
    darkBorder: "rgba(129, 140, 248, 0.45)",
    darkAccent: "#818cf8",
    color: "#4f46e5",
  },
  // 02 My Finance App - Fresh Mint Wealth Green
  {
    lightSolidBg: "#ecfdf5",
    lightBg: "linear-gradient(145deg, #ecfdf5 0%, #d1fae5 100%)",
    lightBorder: "#6ee7b7",
    lightAccent: "#059669",
    lightTextPrimary: "#064e3b",
    lightTextSecondary: "#065f46",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#0d281a",
    darkBg: "linear-gradient(145deg, #143d28 0%, #0a1f14 100%)",
    darkBorder: "rgba(74, 222, 128, 0.45)",
    darkAccent: "#4ade80",
    color: "#059669",
  },
  // 03 StockManagement - Warm Honey Amber Gold
  {
    lightSolidBg: "#fffbeb",
    lightBg: "linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%)",
    lightBorder: "#fde68a",
    lightAccent: "#d97706",
    lightTextPrimary: "#78350f",
    lightTextSecondary: "#92400e",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#2a1708",
    darkBg: "linear-gradient(145deg, #3d230e 0%, #1f1105 100%)",
    darkBorder: "rgba(251, 191, 36, 0.45)",
    darkAccent: "#fbbf24",
    color: "#d97706",
  },
  // 04 College Website Portal - Royal Sapphire Cobalt
  {
    lightSolidBg: "#eff6ff",
    lightBg: "linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)",
    lightBorder: "#93c5fd",
    lightAccent: "#2563eb",
    lightTextPrimary: "#1e3a8a",
    lightTextSecondary: "#1d4ed8",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#102042",
    darkBg: "linear-gradient(145deg, #193268 0%, #0b1730 100%)",
    darkBorder: "rgba(96, 165, 250, 0.45)",
    darkAccent: "#60a5fa",
    color: "#2563eb",
  },
  // 05 E-Commerce Intelligence - Emerald Sage Analytics
  {
    lightSolidBg: "#f0fdfa",
    lightBg: "linear-gradient(145deg, #f0fdfa 0%, #ccfbf1 100%)",
    lightBorder: "#5eead4",
    lightAccent: "#0d9488",
    lightTextPrimary: "#134e4a",
    lightTextSecondary: "#115e59",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#0a2924",
    darkBg: "linear-gradient(145deg, #103f37 0%, #071f1b 100%)",
    darkBorder: "rgba(45, 212, 191, 0.45)",
    darkAccent: "#2dd4bf",
    color: "#0d9488",
  },
  // 06 Dynamic Pricing Strategy (ICKACS-2026) - Radiant Orchid Raspberry
  {
    lightSolidBg: "#fff1f2",
    lightBg: "linear-gradient(145deg, #fff1f2 0%, #ffe4e6 100%)",
    lightBorder: "#fda4af",
    lightAccent: "#e11d48",
    lightTextPrimary: "#881337",
    lightTextSecondary: "#9f1239",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#2d0f1b",
    darkBg: "linear-gradient(145deg, #441729 0%, #200a13 100%)",
    darkBorder: "rgba(251, 113, 133, 0.45)",
    darkAccent: "#fb7185",
    color: "#e11d48",
  },
  // 07 Customer Review Intelligence - Royal Amethyst Purple
  {
    lightSolidBg: "#faf5ff",
    lightBg: "linear-gradient(145deg, #faf5ff 0%, #f3e8ff 100%)",
    lightBorder: "#d8b4fe",
    lightAccent: "#9333ea",
    lightTextPrimary: "#3b0764",
    lightTextSecondary: "#581c87",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#240f38",
    darkBg: "linear-gradient(145deg, #381857 0%, #190a27 100%)",
    darkBorder: "rgba(192, 132, 252, 0.45)",
    darkAccent: "#c084fc",
    color: "#9333ea",
  },
  // 08 Multi-Agent Research Assistant - Sunset Coral Ruby
  {
    lightSolidBg: "#fff7ed",
    lightBg: "linear-gradient(145deg, #fff7ed 0%, #ffedd5 100%)",
    lightBorder: "#fdba74",
    lightAccent: "#ea580c",
    lightTextPrimary: "#7c2d12",
    lightTextSecondary: "#9a3412",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#2d140b",
    darkBg: "linear-gradient(145deg, #441f12 0%, #200e07 100%)",
    darkBorder: "rgba(251, 146, 60, 0.45)",
    darkAccent: "#fb923c",
    color: "#ea580c",
  },
  // 09 RAG Q&A Project - Electric Fuchsia Berry
  {
    lightSolidBg: "#fdf4ff",
    lightBg: "linear-gradient(145deg, #fdf4ff 0%, #fae8ff 100%)",
    lightBorder: "#f0abfc",
    lightAccent: "#c026d3",
    lightTextPrimary: "#4a044e",
    lightTextSecondary: "#701a75",
    lightCardSurface: "#ffffff",
    darkSolidBg: "#290a2c",
    darkBg: "linear-gradient(145deg, #3f1144 0%, #1d0720 100%)",
    darkBorder: "rgba(232, 121, 249, 0.45)",
    darkAccent: "#e879f9",
    color: "#c026d3",
  },
];

/**
 * Interactive Device Mockup & Telemetry Preview for each project
 */
function ProjectVisualMockup({ project, palette, onOpenVideo, isDark }) {
  if (project.video) {
    return (
      <div
        onClick={() => onOpenVideo(project.video, project.title)}
        className="relative w-full aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden border shadow-lg group cursor-pointer flex flex-col justify-between p-4 transition-transform hover:scale-[1.02]"
        style={{
          backgroundColor: isDark ? "#090e17" : "#ffffff",
          borderColor: isDark ? "rgba(56, 189, 248, 0.3)" : palette.lightBorder,
          boxShadow: isDark
            ? "0 10px 30px rgba(0,0,0,0.6)"
            : "0 10px 25px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-between z-10 font-mono text-[10px]">
          <span className="flex items-center gap-1.5 text-sky-500 font-bold">
            <Radio className="w-3 h-3 animate-pulse" />
            LIVE VIDEO DEMO
          </span>
          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-300 font-bold">
            LOOM HD DEMO
          </span>
        </div>

        <div className="my-auto flex flex-col items-center justify-center gap-2 z-10">
          <div className="w-14 h-14 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
          <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-300">
            Click to Play Loom Demo
          </span>
        </div>

        <div className="flex items-center justify-between z-10 font-mono text-[10px] text-gray-500">
          <span>Live Telemetry · Interactive Demo</span>
          <span>1080p HD</span>
        </div>
      </div>
    );
  }

  if (project.links?.paper) {
    return (
      <a
        href={project.links.paper}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden border shadow-lg group cursor-pointer flex flex-col justify-between p-4 sm:p-5 transition-transform hover:scale-[1.02]"
        style={{
          backgroundColor: isDark ? "#240c1a" : "#ffffff",
          borderColor: isDark ? "rgba(244, 114, 182, 0.35)" : palette.lightBorder,
          boxShadow: isDark
            ? "0 10px 30px rgba(0,0,0,0.6)"
            : "0 10px 25px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-between z-10 font-mono text-[10px]">
          <span className="flex items-center gap-1.5 text-pink-500 font-bold">
            <Sparkles className="w-3 h-3" />
            CONFERENCE PUBLICATION
          </span>
          <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-600 dark:text-pink-300 font-bold">
            ICKACS-2026
          </span>
        </div>

        <div className="my-auto flex flex-col items-center text-center gap-2 z-10 p-2">
          <div className="w-12 h-12 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <FileText className="w-6 h-6" />
          </div>
          <div className="font-display font-bold text-xs sm:text-sm leading-tight" style={{ color: isDark ? "#f472b6" : palette.lightAccent }}>
            Nandini Dairy Pricing Strategy Models
          </div>
          <span className="font-mono text-[10px] font-semibold underline flex items-center gap-1" style={{ color: isDark ? "#fbcfe8" : palette.lightAccent }}>
            Open Conference Paper (PDF) <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <div className="flex items-center justify-between z-10 font-mono text-[10px] text-gray-500">
          <span>Kongunadu Arts & Science College</span>
          <span>Verified Certificate</span>
        </div>
      </a>
    );
  }

  // General Interactive Telemetry Glass Frame (100% Solid Opaque)
  return (
    <div
      className="relative w-full aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden border shadow-lg flex flex-col justify-between p-4 transition-transform hover:scale-[1.01]"
      style={{
        backgroundColor: isDark ? "#0d101c" : palette.lightCardSurface,
        borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : palette.lightBorder,
        boxShadow: isDark
          ? "0 10px 30px rgba(0,0,0,0.5)"
          : "0 10px 25px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top Header of Simulated Frame */}
      <div className="flex items-center justify-between font-mono text-[10px] pb-2 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="ml-1 text-gray-500">{project.id}.sys</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-emerald-500">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>STATUS: 200 OK</span>
        </div>
      </div>

      {/* Simulated Live UI Metrics */}
      <div className="my-auto py-2 flex flex-col gap-2 font-mono text-[11px]">
        <div
          className="p-2.5 rounded-xl border flex items-center justify-between"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : palette.lightSolidBg,
            borderColor: isDark ? "rgba(255,255,255,0.08)" : palette.lightBorder,
          }}
        >
          <span className="flex items-center gap-1.5 text-gray-400">
            <Cpu className="w-3.5 h-3.5" style={{ color: isDark ? palette.darkAccent : palette.lightAccent }} />
            Core Stack
          </span>
          <span className="font-bold" style={{ color: isDark ? "#ffffff" : palette.lightTextPrimary }}>
            {project.technologies[0] || "Full Stack"}
          </span>
        </div>

        <div
          className="p-2.5 rounded-xl border flex items-center justify-between"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : palette.lightSolidBg,
            borderColor: isDark ? "rgba(255,255,255,0.08)" : palette.lightBorder,
          }}
        >
          <span className="flex items-center gap-1.5 text-gray-400">
            <TrendingUp className="w-3.5 h-3.5" style={{ color: isDark ? palette.darkAccent : palette.lightAccent }} />
            Performance
          </span>
          <span className="font-bold text-emerald-500">
            &lt; 35ms Latency
          </span>
        </div>
      </div>

      {/* Frame Footer */}
      <div className="flex items-center justify-between font-mono text-[10px] text-gray-500 pt-2 border-t border-black/5 dark:border-white/5">
        <span className="flex items-center gap-1">
          <Terminal className="w-3 h-3 text-violet-400" />
          {project.category}
        </span>
        <span className="font-bold" style={{ color: isDark ? palette.darkAccent : palette.lightAccent }}>
          PRASHMA.ENGINEERING
        </span>
      </div>
    </div>
  );
}

/**
 * DeckCard: 3D Stacked Card
 * - 100% Solid Opaque Background: NEVER bleeds text through from cards behind.
 * - Gentle, slow, graceful peel movement with 65deg tilt angle.
 * - Distinct light mode colors for each of the 10 project cards.
 */
function DeckCard({
  project,
  index,
  total,
  smoothProgress,
  onOpenVideo,
  isDark,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isRender =
    project.links?.live && project.links.live.includes("onrender.com");

  // Get the custom color palette for this project
  const palette = projectColorPalettes[index % projectColorPalettes.length];

  // Step between cards
  const step = 1 / Math.max(1, total - 1);
  const c = [];
  const l = []; // scale
  const u = []; // y
  const d = []; // rotateX
  const f = []; // opacity

  for (let e = 0; e < total; e++) {
    c.push(e * step);
    if (e < index) {
      // Before this card: resting layered in stack behind
      const dist = index - e;
      if (dist === 1) {
        // Card sitting directly behind: peeks out slightly
        l.push(0.96);
        u.push("3.5vh");
        d.push(0);
        f.push(0.95);
      } else {
        // Cards 2+ steps behind: completely invisible! Zero ghosting.
        l.push(0.92);
        u.push("7vh");
        d.push(0);
        f.push(0);
      }
    } else if (e === index) {
      // Active front card: 100% visible, fully opaque
      l.push(1);
      u.push("0vh");
      d.push(0);
      f.push(1);
    } else if (e === index + 1) {
      // Gently peels forward/up and slowly glides away
      l.push(0.94);
      u.push("-8vh");
      d.push(65); // Gentle, natural tilt angle
      f.push(0); // Smoothly fades to 0 as it tilts
    } else {
      // Scrolled far past this card: completely gone
      l.push(0.9);
      u.push("-14vh");
      d.push(85);
      f.push(0);
    }
  }

  const scale = useTransform(smoothProgress, c, l);
  const y = useTransform(smoothProgress, c, u);
  const rotateX = useTransform(smoothProgress, c, d);
  const opacity = useTransform(smoothProgress, c, f);

  // Background and borders based on theme:
  // In Light Mode: 100% Solid Opaque distinct colored card (palette.lightSolidBg & palette.lightBg)
  // In Dark Mode: Deep obsidian neon glow
  const cardBgColor = isDark ? palette.darkSolidBg : palette.lightSolidBg;
  const cardBgImage = isDark ? palette.darkBg : palette.lightBg;
  const cardBorder = isDark ? palette.darkBorder : palette.lightBorder;
  const primaryTextColor = isDark ? "#ffffff" : palette.lightTextPrimary;
  const secondaryTextColor = isDark ? "#9ca3af" : palette.lightTextSecondary;
  const accentColor = isDark ? palette.darkAccent : palette.lightAccent;

  return (
    <motion.div
      className="deck-card absolute flex flex-col justify-between overflow-hidden"
      style={{
        width: "min(1140px, 94vw)",
        height: "min(700px, 80vh)",
        zIndex: total - index,
        transformOrigin: "top center",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
        scale,
        y,
        rotateX,
        opacity,
        borderRadius: "36px",
        backgroundColor: cardBgColor, // 100% Solid Opaque base! No ghost bleed through!
        backgroundImage: cardBgImage,
        border: `1.5px solid ${cardBorder}`,
        boxShadow: isDark
          ? `0 30px 80px rgba(0,0,0,0.7), 0 0 40px -10px ${palette.color}40, inset 0 1px 0 rgba(255,255,255,0.15)`
          : `0 25px 60px rgba(0,0,0,0.07), 0 0 30px -10px ${palette.lightAccent}20, inset 0 1px 0 rgba(255,255,255,0.9)`,
      }}
    >
      {/* Top Accent Line */}
      <div
        className="w-full h-1.5 shrink-0"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, transparent 80%)`,
        }}
      />

      {/* Card Inner Content */}
      <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full overflow-y-auto no-scrollbar relative z-10">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="font-heading font-black text-2xl sm:text-3xl md:text-4xl tracking-tight"
              style={{ color: accentColor }}
            >
              ({project.num})
            </span>
            <span
              className="font-mono text-[11px] sm:text-xs px-3 py-1 rounded-full font-bold border uppercase tracking-wider"
              style={{
                borderColor: `${accentColor}40`,
                color: accentColor,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : palette.lightCardSurface,
              }}
            >
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.status === "In Progress" && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                In Progress
              </span>
            )}

            {project.status === "Published at ICKACS-2026" && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/30">
                <Sparkles className="w-3 h-3" />
                Published at ICKACS-2026
              </span>
            )}

            <span
              className="font-mono text-xs font-bold"
              style={{ color: isDark ? "#9ca3af" : palette.lightAccent }}
            >
              [{project.num} / {String(total).padStart(2, "0")}]
            </span>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center my-auto py-3">
          {/* Left Column: Title, Description, Quote & Highlights */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
            <h3
              className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] tracking-tight leading-tight"
              style={{ color: primaryTextColor }}
            >
              {project.title}
            </h3>

            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed font-normal"
              style={{ color: secondaryTextColor }}
            >
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm"
                    style={{ color: secondaryTextColor }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: accentColor }}
                    />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture Quote */}
            {project.quote && (
              <div
                className="p-3.5 sm:p-4 rounded-2xl border"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.03)"
                    : palette.lightCardSurface,
                  borderColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : palette.lightBorder,
                }}
              >
                <div className="flex items-center gap-1.5 mb-1 font-mono text-[10px] uppercase tracking-wider" style={{ color: accentColor }}>
                  <Sparkles className="w-3 h-3" />
                  <span>{project.quoteRole || "Core Architecture"}</span>
                </div>
                <p
                  className="font-display italic text-xs sm:text-sm leading-relaxed"
                  style={{ color: primaryTextColor }}
                >
                  &ldquo;{project.quote}&rdquo;
                </p>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-2.5 py-1 rounded-md border font-medium"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : palette.lightCardSurface,
                      borderColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : palette.lightBorder,
                      color: isDark ? "#ffffff" : palette.lightAccent,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Device/System Preview Frame & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
            <ProjectVisualMockup
              project={project}
              palette={palette}
              onOpenVideo={onOpenVideo}
              isDark={isDark}
            />

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {project.links?.live && (
                <div className="relative">
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => isRender && setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: accentColor,
                    }}
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {isRender && showTooltip && (
                    <div className="absolute bottom-full left-0 mb-2 w-56 p-2.5 bg-black/95 text-white rounded-xl shadow-2xl border border-white/20 text-[11px] font-mono leading-tight z-30 pointer-events-none">
                      <div className="flex items-center gap-1 text-amber-400 font-bold mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        Render Cold Start Notice
                      </div>
                      Hosted on Render free tier. May take 30-50s to wake up on first visit.
                    </div>
                  )}
                </div>
              )}

              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl font-mono text-xs font-semibold border transition-all hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  style={{
                    borderColor: isDark ? "rgba(255,255,255,0.2)" : palette.lightBorder,
                    color: primaryTextColor,
                    backgroundColor: isDark ? "transparent" : palette.lightCardSurface,
                  }}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>
              )}

              {/* Published Conference Paper Link */}
              {project.links?.paper && (
                <a
                  href={project.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: accentColor,
                  }}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Conference Paper (PDF)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {/* Video Demo Button */}
              {project.video && (
                <button
                  onClick={() => onOpenVideo(project.video, project.title)}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30 transition-all hover:bg-sky-500/25 active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video Demo</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Faint Watermark Number at Bottom Right */}
        <div
          className="absolute right-6 bottom-2 font-heading font-black select-none pointer-events-none"
          style={{
            fontSize: "clamp(4rem, 12vw, 9rem)",
            lineHeight: 0.8,
            color: accentColor,
            opacity: isDark ? 0.06 : 0.08,
          }}
        >
          {project.num}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ onOpenVideo }) {
  const { isDark } = useTheme();
  const trackRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Scroll tracking for the 3D deck
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 5%", "end end"],
  });

  // Silky, slow, damped spring physics for graceful, slow-motion peeling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    mass: 0.9,
    restDelta: 0.0005,
  });

  // Keep track of active card index for HUD pagination
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const idx = Math.min(
        projectsData.length - 1,
        Math.max(0, Math.round(latest * (projectsData.length - 1)))
      );
      setActiveCardIndex(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Jump to card by scrolling
  const scrollToCard = (index) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const scrollableDistance =
      trackRef.current.offsetHeight - window.innerHeight * 0.88;
    const targetScroll =
      trackTop + (index / (projectsData.length - 1)) * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section id="work" className="relative pt-24 pb-16 overflow-visible">
      {/* Background Watermark Section Number */}
      <div
        className="absolute right-4 md:right-12 top-12 font-heading font-black select-none pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          fontSize: "clamp(8rem, 20vw, 20rem)",
          lineHeight: 0.75,
          color: "var(--text-primary)",
        }}
      >
        03
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wider uppercase">
              // 03. FEATURED WORK & PRODUCTION DECK
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                Engineered Systems & <br className="hidden sm:inline" />
                <span style={{ color: "var(--accent-violet)" }}>
                  Interactive Deck.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-gray-500 dark:text-gray-400">
              <Layers className="w-4 h-4 text-violet-500" />
              <span>Scroll down slowly to peel cards & reveal the next project</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-violet-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scroll Track: Increased to 140vh per card for graceful, slow movement */}
      <div
        ref={trackRef}
        style={{
          height: `${projectsData.length * 140}vh`,
          position: "relative",
        }}
      >
        {/* Sticky 3D Deck Viewport */}
        <div
          className="deck-viewport sticky top-[9vh] sm:top-[11vh] h-[82vh] sm:h-[84vh] flex flex-col items-center justify-start overflow-hidden"
          style={{ perspective: "2000px" }}
        >
          {/* Card Stack Container */}
          <div className="relative w-full flex items-start justify-center flex-1 pt-2 sm:pt-4">
            {projectsData.map((project, index) => (
              <DeckCard
                key={project.id}
                project={project}
                index={index}
                total={projectsData.length}
                smoothProgress={smoothProgress}
                onOpenVideo={onOpenVideo}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Bottom HUD: Deck Navigator & Status Indicator */}
          <div className="relative z-50 mb-3 px-4 py-2.5 rounded-full border backdrop-blur-md shadow-xl flex items-center gap-4 text-xs font-mono transition-all">
            <div className="flex items-center gap-2">
              <span className="font-bold text-violet-600 dark:text-violet-400">
                PROJECT {String(activeCardIndex + 1).padStart(2, "0")} /{" "}
                {String(projectsData.length).padStart(2, "0")}
              </span>
            </div>

            <div className="h-3 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />

            {/* Quick Click Dot Pagination */}
            <div className="flex items-center gap-1.5">
              {projectsData.map((_, i) => {
                const dotPalette = projectColorPalettes[i % projectColorPalettes.length];
                const dotColor = isDark ? dotPalette.darkAccent : dotPalette.lightAccent;
                return (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    aria-label={`Jump to project ${i + 1}`}
                    className="transition-all rounded-full cursor-pointer focus:outline-none"
                    style={{
                      width: i === activeCardIndex ? "24px" : "8px",
                      height: "8px",
                      backgroundColor:
                        i === activeCardIndex
                          ? dotColor
                          : isDark
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.18)",
                    }}
                  />
                );
              })}
            </div>

            <div className="h-3 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />

            <span className="text-[11px] text-gray-500 hidden md:inline">
              {projectsData[activeCardIndex]?.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
