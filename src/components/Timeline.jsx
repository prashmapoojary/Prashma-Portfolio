import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  X,
  RotateCcw,
  ExternalLink,
  Play,
  Pause,
} from "lucide-react";
import { experienceData } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";

// Origami Paper Aeroplane SVG Vector
function OrigamiPaperAeroplane({ className = "w-14 h-14 sm:w-16 sm:h-16", color = "#7c3aed" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: `drop-shadow(0 8px 18px ${color}50)` }}
    >
      {/* Left Main Wing Fold */}
      <polygon
        points="50,12 12,82 50,66"
        fill="#ffffff"
        stroke="#1e293b"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Right Main Wing Fold */}
      <polygon
        points="50,12 88,82 50,66"
        fill="#f1f5f9"
        stroke="#1e293b"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Underwing Left Shading */}
      <polygon
        points="50,66 50,12 44,74"
        fill="#cbd5e1"
        stroke="#1e293b"
        strokeWidth="1.8"
      />
      {/* Underwing Right Shading */}
      <polygon
        points="50,66 50,12 56,74"
        fill="#e2e8f0"
        stroke="#1e293b"
        strokeWidth="1.8"
      />
      {/* Center Spine Crease */}
      <line
        x1="50"
        y1="12"
        x2="50"
        y2="66"
        stroke="#0f172a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Decorative Aerodynamic Creases */}
      <line
        x1="50"
        y1="34"
        x2="28"
        y2="78"
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />
      <line
        x1="50"
        y1="34"
        x2="72"
        y2="78"
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />
    </svg>
  );
}

// Bezier Math Evaluator for Smooth Flight Path and Dynamic Angle
function evaluateCubicBezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
  const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;

  // Tangent derivative for aeroplane rotation
  const dx =
    3 * uu * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * tt * (p3.x - p2.x);
  const dy =
    3 * uu * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * tt * (p3.y - p2.y);

  // Offset by +90 deg because SVG plane nose points vertically up
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

  return { x, y, angle };
}

// Compute dynamic partial Bezier curve path from t=0 to current t
// so the dashed flight line dynamically trails right behind the aeroplane as it flies
function getBezierSubPath(p0, p1, p2, p3, t) {
  const clampT = Math.max(0.001, Math.min(1, t));
  const p01 = { x: p0.x + (p1.x - p0.x) * clampT, y: p0.y + (p1.y - p0.y) * clampT };
  const p12 = { x: p1.x + (p2.x - p1.x) * clampT, y: p1.y + (p2.y - p1.y) * clampT };
  const p23 = { x: p2.x + (p3.x - p2.x) * clampT, y: p2.y + (p3.y - p2.y) * clampT };

  const p012 = { x: p01.x + (p12.x - p01.x) * clampT, y: p01.y + (p12.y - p01.y) * clampT };
  const p123 = { x: p12.x + (p23.x - p12.x) * clampT, y: p12.y + (p23.y - p12.y) * clampT };

  const p0123 = { x: p012.x + (p123.x - p012.x) * clampT, y: p012.y + (p123.y - p012.y) * clampT };

  return `M ${p0.x} ${p0.y} C ${p01.x} ${p01.y}, ${p012.x} ${p012.y}, ${p0123.x} ${p0123.y}`;
}

// 5 Curated Waypoints with Desktop & Mobile Responsive Positions
const fiveExperiences = [
  {
    id: 1,
    tag: "✦ Web Developer",
    title: "RosetteSmartLife Intern",
    preview: "Building modern full-stack web experiences & production REST APIs.",
    theme: "lavender",
    color: "#7c3aed",
    lightBg: "#f5f0ff",
    lightBorder: "#c4b5fd",
    lightText: "#5b21b6",
    lightBadge: "#ede9fe",
    darkBg: "#1e1a36",
    darkBorder: "#4c3d7a",
    darkAccent: "#c4b5fd",
    icon: Briefcase,
    desktopPos: { top: "3%", left: "3%", right: "auto" },
    mobilePos: { top: "2%", left: "4%", right: "auto" },
    fullData: experienceData[0],
  },
  {
    id: 2,
    tag: "✦ MSc Computer Science",
    title: "MSc CS (9.16 CGPA)",
    preview: "Mastering advanced algorithms, web architectures & ML pipelines.",
    theme: "cyan",
    color: "#0284c7",
    lightBg: "#eff9ff",
    lightBorder: "#7dd3fc",
    lightText: "#0369a1",
    lightBadge: "#e0f2fe",
    darkBg: "#0f2840",
    darkBorder: "#1e5a8a",
    darkAccent: "#38bdf8",
    icon: GraduationCap,
    desktopPos: { top: "22%", right: "3%", left: "auto" },
    mobilePos: { top: "21%", right: "4%", left: "auto" },
    fullData: experienceData[1],
  },
  {
    id: 3,
    tag: "✦ Bachelor Degree (BCA)",
    title: "BCA (9.52 Distinction)",
    preview: "First Class Distinction in data structures, OOP Java & database systems.",
    theme: "indigo",
    color: "#4338ca",
    lightBg: "#eef1ff",
    lightBorder: "#a5b4fc",
    lightText: "#3730a3",
    lightBadge: "#e0e7ff",
    darkBg: "#181c45",
    darkBorder: "#313b82",
    darkAccent: "#818cf8",
    icon: Award,
    desktopPos: { top: "42%", left: "3%", right: "auto" },
    mobilePos: { top: "41%", left: "4%", right: "auto" },
    fullData: experienceData[2],
  },
  {
    id: 4,
    tag: "✦ Elite IIT Certifications",
    title: "Top 2% Topper (IIT Kanpur)",
    preview: "Ranked Top 2% nationwide in Big Data Computing (93%) & Elite in ML.",
    theme: "mint",
    color: "#059669",
    lightBg: "#ecfdf5",
    lightBorder: "#6ee7b7",
    lightText: "#065f46",
    lightBadge: "#d1fae5",
    darkBg: "#142e22",
    darkBorder: "#236e4a",
    darkAccent: "#6ee7b7",
    icon: Sparkles,
    desktopPos: { top: "61%", right: "3%", left: "auto" },
    mobilePos: { top: "61%", right: "4%", left: "auto" },
    fullData: experienceData[3],
  },
  {
    id: 5,
    tag: "✦ Data Analytics & Research",
    title: "ICKACS-2026 Research Paper",
    preview: "Presented dynamic pricing & demand elasticity models for Nandini Dairy.",
    theme: "peach",
    color: "#ea580c",
    lightBg: "#fff7ed",
    lightBorder: "#fdba74",
    lightText: "#9a3412",
    lightBadge: "#ffedd5",
    darkBg: "#2e1f16",
    darkBorder: "#6b3a1e",
    darkAccent: "#fdba74",
    icon: FileText,
    desktopPos: { top: "80%", left: "3%", right: "auto" },
    mobilePos: { top: "81%", left: "4%", right: "auto" },
    fullData: experienceData[4],
  },
];

// Desktop SVG Curve Waypoints (viewBox: 0 0 1000 850)
// Mathematically C1-continuous smooth S-curves with vertical colinear tangents at every apex
// Moved away from cards for generous breathing room and flawless rounded arcs
const desktopCurves = [
  // Stop 1 → Stop 2: smooth, rounded arc from Left waypoint to Right waypoint
  {
    p0: { x: 370, y: 90 },
    p1: { x: 370, y: 160 },
    p2: { x: 620, y: 185 },
    p3: { x: 620, y: 255 },
  },
  // Stop 2 → Stop 3: seamlessly continues tangent at Stop 2, gliding back to Left
  {
    p0: { x: 620, y: 255 },
    p1: { x: 620, y: 325 },
    p2: { x: 370, y: 350 },
    p3: { x: 370, y: 420 },
  },
  // Stop 3 → Stop 4: seamlessly continues tangent at Stop 3, gliding back to Right
  {
    p0: { x: 370, y: 420 },
    p1: { x: 370, y: 490 },
    p2: { x: 620, y: 515 },
    p3: { x: 620, y: 585 },
  },
  // Stop 4 → Stop 5: seamlessly continues tangent at Stop 4, gliding to Final Left stop
  {
    p0: { x: 620, y: 585 },
    p1: { x: 620, y: 655 },
    p2: { x: 370, y: 680 },
    p3: { x: 370, y: 750 },
  },
];

// Mobile SVG Curve Waypoints (viewBox: 0 0 380 980)
// Seamlessly rounded C1-continuous mobile curves with proper clearance
const mobileCurves = [
  // Stop 1 → Stop 2
  {
    p0: { x: 110, y: 80 },
    p1: { x: 110, y: 160 },
    p2: { x: 270, y: 200 },
    p3: { x: 270, y: 280 },
  },
  // Stop 2 → Stop 3
  {
    p0: { x: 270, y: 280 },
    p1: { x: 270, y: 360 },
    p2: { x: 110, y: 400 },
    p3: { x: 110, y: 480 },
  },
  // Stop 3 → Stop 4
  {
    p0: { x: 110, y: 480 },
    p1: { x: 110, y: 560 },
    p2: { x: 270, y: 600 },
    p3: { x: 270, y: 680 },
  },
  // Stop 4 → Stop 5
  {
    p0: { x: 270, y: 680 },
    p1: { x: 270, y: 760 },
    p2: { x: 110, y: 800 },
    p3: { x: 110, y: 880 },
  },
];

export default function Timeline() {
  const { isDark } = useTheme();

  // Responsive state
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeCurves = isMobile ? mobileCurves : desktopCurves;

  // Flight states
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStop, setCurrentStop] = useState(0); // 0 to 4
  const [isFlying, setIsFlying] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Section ref for IntersectionObserver auto-start
  const sectionRef = useRef(null);
  const hasAutoStartedRef = useRef(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Dynamic real-time flight trail progress
  const [flightProgress, setFlightProgress] = useState({
    segmentIdx: 0,
    t: 0,
    active: false,
  });

  // Plane coordinates and angle
  const [planeCoord, setPlaneCoord] = useState(() =>
    isMobile
      ? { x: mobileCurves[0].p0.x, y: mobileCurves[0].p0.y, angle: 30 }
      : { x: desktopCurves[0].p0.x, y: desktopCurves[0].p0.y, angle: 30 }
  );

  // Array of completed path segments: [true, false, false, false]
  const [pathsDrawn, setPathsDrawn] = useState([false, false, false, false]);

  const isFlyingRef = useRef(false);
  const animFrameRef = useRef(null);

  // Synchronize plane coordinate with responsive breakpoint when idle
  useEffect(() => {
    if (!isFlyingRef.current) {
      if (!hasStarted) {
        setPlaneCoord(
          isMobile
            ? { x: mobileCurves[0].p0.x, y: mobileCurves[0].p0.y, angle: 30 }
            : { x: desktopCurves[0].p0.x, y: desktopCurves[0].p0.y, angle: 30 }
        );
      } else {
        const pt =
          currentStop === 0
            ? activeCurves[0].p0
            : activeCurves[currentStop - 1].p3;
        setPlaneCoord((prev) => ({ ...prev, x: pt.x, y: pt.y }));
      }
    }
  }, [isMobile, hasStarted, currentStop, activeCurves]);

  // IntersectionObserver: Auto-start flight when section scrolls into view
  useEffect(() => {
    if (hasAutoStartedRef.current || hasStarted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoStartedRef.current) {
          hasAutoStartedRef.current = true;
          setHasStarted(true);
          setCurrentStop(0);
          setIsAutoPlaying(true);
          setFlightProgress({ segmentIdx: 0, t: 0, active: false });
          const startPt = activeCurves[0].p0;
          setPlaneCoord({ x: startPt.x, y: startPt.y, angle: 35 });
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted, activeCurves]);

  // Initial take-off handler: Starts flight sequence immediately
  const handleStartFlight = () => {
    setHasStarted(true);
    setCurrentStop(0);
    setIsAutoPlaying(true);
    setFlightProgress({ segmentIdx: 0, t: 0, active: false });
    const startPt = activeCurves[0].p0;
    setPlaneCoord({ x: startPt.x, y: startPt.y, angle: 35 });
  };

  // Animate aeroplane smoothly along the curve between stops
  // Supports forward-only single-segment flights AND a full reset-jump for looping
  const flyToStop = (targetStop, isLoopReset = false) => {
    if (isFlyingRef.current) return;
    if (!isLoopReset && targetStop === currentStop) return;

    // If this is a loop reset (jumping from stop 4 back to stop 0),
    // instantly teleport the plane to the start and reset drawn paths
    if (isLoopReset) {
      const startPt = activeCurves[0].p0;
      setPlaneCoord({ x: startPt.x, y: startPt.y, angle: 35 });
      setCurrentStop(0);
      setPathsDrawn([false, false, false, false]);
      setFlightProgress({ segmentIdx: 0, t: 0, active: false });
      return;
    }

    isFlyingRef.current = true;
    setIsFlying(true);

    const segmentIdx = targetStop > currentStop ? currentStop : targetStop;
    const curve = activeCurves[Math.min(segmentIdx, 3)];
    const isForward = targetStop > currentStop;

    let start = null;
    const duration = 2500; // Slow, graceful 2.5s gliding flight

    const stepAnimation = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const t = isForward ? easeProgress : 1 - easeProgress;

      const point = evaluateCubicBezier(curve.p0, curve.p1, curve.p2, curve.p3, t);
      setPlaneCoord(point);
      setFlightProgress({ segmentIdx, t, active: true });

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(stepAnimation);
      } else {
        // Flight segment reached target
        isFlyingRef.current = false;
        setIsFlying(false);
        setFlightProgress({ segmentIdx, t: 1, active: false });
        setCurrentStop(targetStop);

        // Mark all traversed paths as permanently drawn
        setPathsDrawn((prev) => {
          const updated = [...prev];
          for (let i = 0; i < targetStop; i++) {
            updated[i] = true;
          }
          return updated;
        });
      }
    };

    animFrameRef.current = requestAnimationFrame(stepAnimation);
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Jump to specific stop (via dots or navigation buttons)
  const handleSelectStop = (idx) => {
    if (!hasStarted) setHasStarted(true);
    setIsAutoPlaying(false); // Pause auto-flight when user manually interacts
    flyToStop(idx);
  };

  // Automatic infinite loop progression through all 5 stops
  // Pauses 2 seconds at each stop, then flies to the next. After stop 4, resets to stop 0 and loops.
  useEffect(() => {
    if (!hasStarted || selectedExperience || !isAutoPlaying || isFlying) return;

    const timer = setTimeout(() => {
      if (currentStop >= 4) {
        // Reset back to start for infinite loop
        flyToStop(0, true);
      } else {
        flyToStop(currentStop + 1);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasStarted, currentStop, selectedExperience, isAutoPlaying, isFlying]);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedExperience(null);
      }
    };
    if (selectedExperience) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedExperience]);

  // Reset to initial pre-flight state
  const handleReset = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    isFlyingRef.current = false;
    setIsFlying(false);
    setHasStarted(false);
    setCurrentStop(0);
    setIsAutoPlaying(true);
    setSelectedExperience(null);
    setFlightProgress({ segmentIdx: 0, t: 0, active: false });
    setPathsDrawn([false, false, false, false]);
    setPlaneCoord(
      isMobile
        ? { x: mobileCurves[0].p0.x, y: mobileCurves[0].p0.y, angle: 30 }
        : { x: desktopCurves[0].p0.x, y: desktopCurves[0].p0.y, angle: 30 }
    );
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-16 md:py-24 overflow-hidden border-t border-black/10 dark:border-white/10"
      style={{
        background: isDark
          ? "radial-gradient(ellipse at 50% 20%, #0d1222 0%, #07080f 100%)"
          : "radial-gradient(ellipse at 50% 15%, #f1f5f9 0%, #ffffff 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wider uppercase">
                // 04. PROFESSIONAL EXPERIENCE & ACADEMIC MILESTONES
              </span>
            </div>
            <h2
              className="font-heading font-black text-2xl sm:text-4xl md:text-5xl tracking-tight uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              CAREER & ACADEMIC MILESTONES
            </h2>
          </div>

          {/* Controls: Auto-Play toggle & Reset Sky */}
          {hasStarted && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs border transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: isDark ? "#121521" : "#ffffff",
                  borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                  color: isAutoPlaying ? "#059669" : "var(--text-secondary)",
                }}
                title={isAutoPlaying ? "Pause Auto Flight" : "Resume Auto Flight"}
              >
                {isAutoPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span className="text-[11px] sm:text-xs font-semibold">
                  {isAutoPlaying ? "Auto-Progressing" : "Paused"}
                </span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs border transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: isDark ? "#121521" : "#ffffff",
                  borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                  color: "var(--text-secondary)",
                }}
                title="Reset Sky to Initial State"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] sm:text-xs">Reset</span>
              </button>
            </div>
          )}
        </div>

        {/* Flight Stage Container (Responsive Height for Desktop & Mobile) */}
        <div className="relative w-full min-h-[960px] md:min-h-[820px] rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden p-2 sm:p-6 backdrop-blur-sm">
          {/* SVG Flight Trail Canvas */}
          <svg
            viewBox={isMobile ? "0 0 380 980" : "0 0 1000 850"}
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
            preserveAspectRatio={isMobile ? "none" : "xMidYMid meet"}
          >
            <defs>
              <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="curveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="curveGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4338ca" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="curveGrad4" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Dynamic Flight Paths: Traversed segments stay drawn, active segment renders small dashed trail in real-time */}
            {hasStarted && (
              <>
                {/* Segment 1: Stop 1 -> Stop 2 */}
                {(pathsDrawn[0] || currentStop >= 1) ? (
                  <path
                    d={`M ${activeCurves[0].p0.x} ${activeCurves[0].p0.y} C ${activeCurves[0].p1.x} ${activeCurves[0].p1.y}, ${activeCurves[0].p2.x} ${activeCurves[0].p2.y}, ${activeCurves[0].p3.x} ${activeCurves[0].p3.y}`}
                    fill="none"
                    stroke="url(#curveGrad1)"
                    strokeWidth={isMobile ? "3" : "3.2"}
                    strokeDasharray="7 7"
                    strokeLinecap="round"
                  />
                ) : (
                  flightProgress.active &&
                  flightProgress.segmentIdx === 0 && (
                    <path
                      d={getBezierSubPath(
                        activeCurves[0].p0,
                        activeCurves[0].p1,
                        activeCurves[0].p2,
                        activeCurves[0].p3,
                        flightProgress.t
                      )}
                      fill="none"
                      stroke="url(#curveGrad1)"
                      strokeWidth={isMobile ? "3" : "3.2"}
                      strokeDasharray="7 7"
                      strokeLinecap="round"
                    />
                  )
                )}

                {/* Segment 2: Stop 2 -> Stop 3 */}
                {(pathsDrawn[1] || currentStop >= 2) ? (
                  <path
                    d={`M ${activeCurves[1].p0.x} ${activeCurves[1].p0.y} C ${activeCurves[1].p1.x} ${activeCurves[1].p1.y}, ${activeCurves[1].p2.x} ${activeCurves[1].p2.y}, ${activeCurves[1].p3.x} ${activeCurves[1].p3.y}`}
                    fill="none"
                    stroke="url(#curveGrad2)"
                    strokeWidth={isMobile ? "3" : "3.2"}
                    strokeDasharray="7 7"
                    strokeLinecap="round"
                  />
                ) : (
                  flightProgress.active &&
                  flightProgress.segmentIdx === 1 && (
                    <path
                      d={getBezierSubPath(
                        activeCurves[1].p0,
                        activeCurves[1].p1,
                        activeCurves[1].p2,
                        activeCurves[1].p3,
                        flightProgress.t
                      )}
                      fill="none"
                      stroke="url(#curveGrad2)"
                      strokeWidth={isMobile ? "3" : "3.2"}
                      strokeDasharray="7 7"
                      strokeLinecap="round"
                    />
                  )
                )}

                {/* Segment 3: Stop 3 -> Stop 4 */}
                {(pathsDrawn[2] || currentStop >= 3) ? (
                  <path
                    d={`M ${activeCurves[2].p0.x} ${activeCurves[2].p0.y} C ${activeCurves[2].p1.x} ${activeCurves[2].p1.y}, ${activeCurves[2].p2.x} ${activeCurves[2].p2.y}, ${activeCurves[2].p3.x} ${activeCurves[2].p3.y}`}
                    fill="none"
                    stroke="url(#curveGrad3)"
                    strokeWidth={isMobile ? "3" : "3.2"}
                    strokeDasharray="7 7"
                    strokeLinecap="round"
                  />
                ) : (
                  flightProgress.active &&
                  flightProgress.segmentIdx === 2 && (
                    <path
                      d={getBezierSubPath(
                        activeCurves[2].p0,
                        activeCurves[2].p1,
                        activeCurves[2].p2,
                        activeCurves[2].p3,
                        flightProgress.t
                      )}
                      fill="none"
                      stroke="url(#curveGrad3)"
                      strokeWidth={isMobile ? "3" : "3.2"}
                      strokeDasharray="7 7"
                      strokeLinecap="round"
                    />
                  )
                )}

                {/* Segment 4: Stop 4 -> Stop 5 */}
                {(pathsDrawn[3] || currentStop >= 4) ? (
                  <path
                    d={`M ${activeCurves[3].p0.x} ${activeCurves[3].p0.y} C ${activeCurves[3].p1.x} ${activeCurves[3].p1.y}, ${activeCurves[3].p2.x} ${activeCurves[3].p2.y}, ${activeCurves[3].p3.x} ${activeCurves[3].p3.y}`}
                    fill="none"
                    stroke="url(#curveGrad4)"
                    strokeWidth={isMobile ? "3" : "3.2"}
                    strokeDasharray="7 7"
                    strokeLinecap="round"
                  />
                ) : (
                  flightProgress.active &&
                  flightProgress.segmentIdx === 3 && (
                    <path
                      d={getBezierSubPath(
                        activeCurves[3].p0,
                        activeCurves[3].p1,
                        activeCurves[3].p2,
                        activeCurves[3].p3,
                        flightProgress.t
                      )}
                      fill="none"
                      stroke="url(#curveGrad4)"
                      strokeWidth={isMobile ? "3" : "3.2"}
                      strokeDasharray="7 7"
                      strokeLinecap="round"
                    />
                  )
                )}

                {/* Initial Starting Origin Dot only; destination/ending point has the paper aeroplane */}
                <circle cx={activeCurves[0].p0.x} cy={activeCurves[0].p0.y} r="5.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
              </>
            )}

            {/* Aeroplane Icon gliding dynamically along the SVG curve */}
            <g
              transform={`translate(${planeCoord.x}, ${planeCoord.y}) rotate(${planeCoord.angle}) translate(-26, -26)`}
              className="transition-transform duration-75 ease-out"
            >
              <foreignObject width="52" height="52">
                <div
                  onClick={!hasStarted ? handleStartFlight : () => handleSelectStop((currentStop + 1) % 5)}
                  className="cursor-pointer"
                  title="Touch paper aeroplane"
                >
                  <OrigamiPaperAeroplane
                    className="w-12 h-12 sm:w-14 sm:h-14"
                    color={fiveExperiences[currentStop]?.color || "#7c3aed"}
                  />
                </div>
              </foreignObject>
            </g>
          </svg>

          {/* 1. INITIAL STATE: Clean, spacious with "Touch this" */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="absolute top-[4%] left-[4%] sm:top-[12%] sm:left-[8%] z-30 flex flex-col items-start gap-2 sm:gap-3 select-none"
              >
                <button
                  onClick={handleStartFlight}
                  className="group flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-mono text-xs sm:text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
                  style={{
                    backgroundColor: "#e07a75",
                    boxShadow: "0 10px 25px -4px rgba(224, 122, 117, 0.55)",
                  }}
                >
                  <span className="text-base group-hover:-translate-y-0.5 transition-transform">👆</span>
                  <span>Touch this</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. THE 5 MINIMAL EXPERIENCE CARDS (Appear automatically as the plane visits each stop) */}
          <div className="relative w-full h-full min-h-[960px] md:min-h-[820px] pointer-events-none">
            {fiveExperiences.map((exp, idx) => {
              const isVisible = hasStarted && currentStop >= idx;
              const isCurrent = currentStop === idx;
              const Icon = exp.icon;
              const cardPosition = isMobile ? exp.mobilePos : exp.desktopPos;

              return (
                <AnimatePresence key={exp.id}>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => {
                        setSelectedExperience(exp.fullData);
                        setIsAutoPlaying(false);
                      }}
                      className={`absolute pointer-events-auto cursor-pointer max-w-[255px] sm:max-w-[290px] md:max-w-[315px] w-full p-3.5 sm:p-4 md:p-5 rounded-2xl border shadow-lg transition-all duration-300 hover:scale-[1.03] group ${
                        isCurrent ? "ring-2" : ""
                      }`}
                      style={{
                        ...cardPosition,
                        backgroundColor: isDark ? exp.darkBg : exp.lightBg,
                        borderColor: isDark ? exp.darkBorder : exp.lightBorder,
                        borderLeftWidth: "3.5px",
                        borderLeftColor: exp.color,
                        ringColor: exp.color,
                        boxShadow: isDark
                          ? `0 14px 35px -10px rgba(0,0,0,0.65), 0 0 20px -3px ${exp.color}40`
                          : `0 8px 30px -5px ${exp.color}25, 0 2px 8px -1px rgba(0,0,0,0.08)`,
                      }}
                    >
                      {/* Card Header Pill */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
                        <span
                          className="font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider truncate"
                          style={{
                            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : exp.lightBadge,
                            borderColor: isDark ? exp.darkBorder : exp.lightBorder,
                            color: isDark ? exp.darkAccent : exp.lightText,
                          }}
                        >
                          {exp.tag}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 shrink-0">
                          0{idx + 1}/05
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"
                          style={{ backgroundColor: exp.color }}
                        >
                          <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <h4
                          className="font-display font-bold text-xs sm:text-sm md:text-base leading-snug truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {exp.title}
                        </h4>
                      </div>

                      {/* Preview Sentence */}
                      <p
                        className="text-[10px] sm:text-xs leading-relaxed mb-2 line-clamp-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {exp.preview}
                      </p>

                      {/* Tap for Details Link */}
                      <div
                        className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono font-semibold pt-1.5 border-t border-black/5 dark:border-white/5"
                        style={{ color: exp.color }}
                      >
                        <span>Inspect particulars</span>
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>
        </div>


      </div>

      {/* 3. RESPONSIVE SLIDE-IN (DESKTOP) & NATIVE BOTTOM-SHEET (MOBILE) SIDEBAR */}
      <AnimatePresence>
        {selectedExperience && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedExperience(null)}
              className="fixed inset-0 z-[99998] bg-black/65 backdrop-blur-xs cursor-pointer"
            />

            {/* Sidebar Drawer: Slides from Right on Desktop, Bottom-Sheet Drawer on Mobile */}
            <motion.div
              initial={{
                x: typeof window !== "undefined" && window.innerWidth < 640 ? 0 : "100%",
                y: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : 0,
                opacity: 0,
              }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{
                x: typeof window !== "undefined" && window.innerWidth < 640 ? 0 : "100%",
                y: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : 0,
                opacity: 0,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="fixed inset-x-0 bottom-0 max-h-[90vh] w-full sm:max-h-screen sm:h-full sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[480px] lg:w-[520px] z-[99999] rounded-t-3xl sm:rounded-none border-t sm:border-t-0 sm:border-l shadow-2xl flex flex-col overflow-hidden"
              style={{
                backgroundColor: isDark ? "#0d111d" : "#ffffff",
                borderColor: isDark ? `${selectedExperience.color}50` : "#cbd5e1",
              }}
            >
              {/* Mobile Drawer Grab Handle */}
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

              {/* Top Accent Gradient Line */}
              <div
                className="w-full h-1.5 shrink-0 hidden sm:block"
                style={{
                  background: `linear-gradient(90deg, ${selectedExperience.color}, transparent)`,
                }}
              />

              {/* Sidebar Header */}
              <div
                className="p-4 sm:p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between shrink-0"
                style={{
                  backgroundColor: isDark ? "rgba(13, 17, 29, 0.98)" : "rgba(255, 255, 255, 0.98)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: selectedExperience.color }}
                  />
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider"
                    style={{ color: selectedExperience.color }}
                  >
                    {selectedExperience.type || "Waypoint Particulars"}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedExperience(null)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-all cursor-pointer"
                  style={{ borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1" }}
                  aria-label="Close sidebar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sidebar Body Content (100% Scrollable & Lenis-Safe) */}
              <div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                tabIndex={0}
                className="p-5 sm:p-8 space-y-5 flex-1 min-h-0 overflow-y-auto overscroll-contain focus:outline-none"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: `${selectedExperience.color}60 transparent`,
                }}
              >
                {/* Period & Achievement Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedExperience.period}
                  </span>
                  {selectedExperience.achievement && (
                    <span
                      className="font-bold px-2.5 py-0.5 rounded-full border text-[11px]"
                      style={{
                        backgroundColor: `${selectedExperience.color}15`,
                        borderColor: `${selectedExperience.color}35`,
                        color: selectedExperience.color,
                      }}
                    >
                      {selectedExperience.achievement}
                    </span>
                  )}
                </div>

                {/* Title & Organization */}
                <div>
                  <h3
                    className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tight leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedExperience.title}
                  </h3>
                  <p
                    className="font-mono text-xs sm:text-sm font-semibold mt-1"
                    style={{ color: selectedExperience.color }}
                  >
                    {selectedExperience.org}
                  </p>
                </div>

                {/* Complete Narrative Overview */}
                <p
                  className="text-xs sm:text-sm md:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {selectedExperience.fullDesc || selectedExperience.shortDesc}
                </p>

                {/* Verified Deliverables (LaTeX Technical Bullets) */}
                {selectedExperience.bullets && selectedExperience.bullets.length > 0 && (
                  <div className="space-y-2.5 sm:space-y-3 pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-semibold block">
                      // Verified Technical Deliverables
                    </span>
                    {selectedExperience.bullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed"
                        style={{
                          backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                          borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                          color: "var(--text-primary)",
                        }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: selectedExperience.color }}
                        />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Core Stacks & Tooling Tags */}
                {selectedExperience.tags && selectedExperience.tags.length > 0 && (
                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-2">
                      // Core Stacks & Architecture
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedExperience.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md border font-medium"
                          style={{
                            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#f1f5f9",
                            borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                            color: isDark ? "var(--text-secondary)" : "#334155",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificate / Research PDF Direct Buttons */}
                <div className="pt-3 flex flex-col gap-2.5">
                  {selectedExperience.pdfUrl && (
                    <a
                      href={selectedExperience.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                      style={{ backgroundColor: selectedExperience.color }}
                    >
                      <FileText className="w-4 h-4" />
                      <span>
                        {selectedExperience.type === "Publication"
                          ? "📄 View Conference Paper (PDF)"
                          : "🏆 View Big Data Topper (PDF)"}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {selectedExperience.mlPdfUrl && (
                    <a
                      href={selectedExperience.mlPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                      style={{ backgroundColor: "#0284c7" }}
                    >
                      <FileText className="w-4 h-4" />
                      <span>📜 View Machine Learning Elite (PDF)</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Sidebar Footer */}
              <div
                className="p-4 border-t flex items-center justify-between shrink-0"
                style={{
                  backgroundColor: isDark ? "#0a0e1a" : "#f8fafc",
                  borderColor: isDark ? "rgba(255,255,255,0.08)" : "#cbd5e1",
                }}
              >
                <span className="font-mono text-[11px] sm:text-xs text-gray-500">
                  Verified Credentials
                </span>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="px-4 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  style={{
                    borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                    color: "var(--text-primary)",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
