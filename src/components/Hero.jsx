import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, Code2, BarChart3 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import profileImg from "../assets/Prashma Poojary.jpeg";
import prashImg from "../assets/prash.jpeg";

// Physics-driven individual character that repels mouse cursor
function KineticChar({ char, _index }) {
  const ref = useRef(null);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);

  const springConfig = { stiffness: 220, damping: 14, mass: 0.7 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    springX.set(targetX);
    springY.set(targetY);
  }, [targetX, targetY, springX, springY]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 140;
      if (dist < maxDist && dist > 0) {
        const force = Math.pow((maxDist - dist) / maxDist, 1.8);
        const repelX = -(dx / dist) * force * 70;
        const repelY = -(dy / dist) * force * 70;
        setTargetX(repelX);
        setTargetY(repelY);
      } else {
        setTargetX(0);
        setTargetY(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.span
      ref={ref}
      style={{
        display: "inline-block",
        x: springX,
        y: springY,
        willChange: "transform",
      }}
      className="physics-char"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function KineticTitleLine({ text, className, color }) {
  return (
    <div
      className={`flex flex-wrap leading-none tracking-tight select-none ${className}`}
      style={{ color }}
    >
      {text.split("").map((char, index) => (
        <KineticChar key={index} char={char} _index={index} />
      ))}
    </div>
  );
}

export default function Hero() {
  const { isDark } = useTheme();
  const [perspective, setPerspective] = useState("web"); // 'web' | 'data'
  const [isAlternateImg, setIsAlternateImg] = useState(false);

  const webDetails = {
    tag: "// SYSTEM.DEV_CORE",
    role: "Full Stack Engineer",
    summary:
      "Crafting production-ready web architectures with React, Node.js, Express, and PostgreSQL/MongoDB. Specializing in real-time Socket.io pipelines, resilient JWT auth, and high-performance REST APIs.",
    tags: ["React 19", "Node.js", "PostgreSQL", "Socket.io", "Express", "Tailwind CSS"],
  };

  const dataDetails = {
    tag: "// SYSTEM.ANALYTICS_CORE",
    role: "Data & BI Analyst",
    summary:
      "Transforming raw business telemetry into strategic intelligence. Building predictive pipelines with Python, SQL, and Scikit-learn, coupled with executive dashboards in Power BI and Tableau.",
    tags: ["Python", "SQL", "Power BI", "Tableau", "XGBoost", "NLP & RAG"],
  };

  const current = perspective === "web" ? webDetails : dataDetails;

  return (
    <section
      id="home"
      className="relative min-h-[96vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle Ambient Grid */}
      <div className="ambient-grid" />

      {/* Large Watermark Background Number 01 */}
      <div
        className="absolute right-4 md:right-16 top-24 font-heading font-black select-none pointer-events-none text-right opacity-[0.04] dark:opacity-[0.05]"
        style={{
          fontSize: "clamp(10rem, 25vw, 24rem)",
          lineHeight: 0.75,
          color: "var(--text-primary)",
        }}
      >
        01
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        {/* Top Metadata Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs tracking-wider uppercase px-2.5 py-1 rounded-md border font-semibold"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                color: "var(--accent-violet)",
              }}
            >
              PRASHMA POOJARY
            </span>
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
              {current.tag}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Udupi / Manipal, India
            </span>
            <span className="hidden sm:inline-block">•</span>
            <span className="hidden sm:inline-block font-bold text-violet-600 dark:text-violet-400">
              9.16 MSc CGPA
            </span>
          </div>
        </motion.div>

        {/* Dual-Perspective Interactive Switcher Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center p-1 rounded-full mb-8 border"
          style={{
            backgroundColor: isDark ? "#121521" : "#ffffff",
            borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
          }}
        >
          <button
            onClick={() => setPerspective("web")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 cursor-pointer ${
              perspective === "web"
                ? "bg-violet-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Full Stack Web
          </button>
          <button
            onClick={() => setPerspective("data")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 cursor-pointer ${
              perspective === "data"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Data & BI Analytics
          </button>
        </motion.div>

        {/* Monumental Kinetic Headline */}
        <div className="mb-8 cursor-default">
          <KineticTitleLine
            text="FULL STACK"
            className="font-heading font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
            color="var(--accent-violet)"
          />
          <KineticTitleLine
            text={perspective === "web" ? "DEVELOPER." : "ANALYST."}
            className="font-heading font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
            color="var(--text-primary)"
          />
        </div>

        {/* Grid: Bio Left & Stunning Portrait Frame Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-6">
          {/* Left: Bio & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col items-start gap-6"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={perspective}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-base sm:text-lg leading-relaxed max-w-xl font-normal"
                style={{ color: "var(--text-secondary)" }}
              >
                {current.summary}
              </motion.p>
            </AnimatePresence>

            {/* Quick Tech Badges */}
            <div className="flex flex-wrap gap-2">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-md border"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
                    borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                    color: "var(--text-primary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: perspective === "web" ? "#6d28d9" : "#4338ca",
                }}
              >
                Explore Works
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                  borderColor: isDark ? "var(--border-strong)" : "#cbd5e1",
                  color: "var(--text-primary)",
                }}
              >
                Get In Touch 💬
              </a>

              {/* Social Links Strip */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href="https://github.com/prashmapoojary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-110 cursor-pointer"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                    borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                    color: "var(--text-primary)",
                  }}
                  title="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/prashma-poojary-3843522b5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-110 cursor-pointer"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                    borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                    color: "#0a66c2",
                  }}
                  title="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Stunning Framed Portrait Card with Floating HUD Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex items-center justify-center relative pt-4 pb-6"
          >
            {/* Ambient Halo Glow */}
            <div
              className="absolute w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none -z-10"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 80%)"
                  : "radial-gradient(circle, rgba(109, 40, 217, 0.35) 0%, rgba(67, 56, 202, 0.15) 60%, transparent 80%)",
              }}
            />

            {/* Main Portrait Frame */}
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative rounded-[32px] p-2.5 sm:p-3 border shadow-2xl backdrop-blur-md overflow-visible max-w-[340px] sm:max-w-[370px] w-full group"
              style={{
                backgroundColor: isDark ? "rgba(14, 17, 26, 0.85)" : "#ffffff",
                borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "#cbd5e1",
                boxShadow: isDark
                  ? "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(139, 92, 246, 0.3)"
                  : "0 25px 50px -15px rgba(109, 40, 217, 0.15), 0 10px 25px -5px rgba(15, 23, 42, 0.08)",
              }}
            >
              {/* Image Container with Click Toggle */}
              <div
                onClick={() => setIsAlternateImg(!isAlternateImg)}
                className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-black/5 shadow-inner cursor-pointer"
                title="Click to toggle portrait view"
              >
                <img
                  src={isAlternateImg ? prashImg : profileImg}
                  alt="Prashma Poojary — Full Stack Web Developer & Data Analyst"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-all duration-500 group-hover:scale-105"
                />

                {/* Subtle Inner Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                {/* Name & Role Overlay Tag at Bottom of Portrait */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-sm text-white tracking-wide">
                        Prashma Poojary
                      </div>
                      <div className="font-mono text-[10px] text-violet-300">
                        Full Stack Developer · Data Analyst
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 - Top Left: Full Stack Systems */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 sm:-left-6 px-3.5 py-2 rounded-2xl shadow-xl border backdrop-blur-xl flex items-center gap-2.5 z-20"
                style={{
                  backgroundColor: isDark ? "rgba(18, 22, 34, 0.95)" : "#ffffff",
                  borderColor: isDark ? "rgba(167, 139, 250, 0.35)" : "#cbd5e1",
                }}
              >
                <div className="w-7 h-7 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-sm">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-[11px] font-bold text-violet-600 dark:text-violet-400">
                    Full Stack Architecture
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">React · Node · Postgres</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Right: Data & BI Intelligence */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 px-3.5 py-2 rounded-2xl shadow-xl border backdrop-blur-xl flex items-center gap-2.5 z-20"
                style={{
                  backgroundColor: isDark ? "rgba(18, 22, 34, 0.95)" : "#ffffff",
                  borderColor: isDark ? "rgba(56, 189, 248, 0.35)" : "#cbd5e1",
                }}
              >
                <div className="w-7 h-7 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    Data & BI Intelligence
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">Python · SQL · Power BI</div>
                </div>
              </motion.div>

              {/* Floating Badge 3 - Lifestyle Profile Icon (prash.jpeg) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
                className="absolute -bottom-7 -left-3 sm:-left-5 px-3 py-1.5 rounded-2xl shadow-xl border backdrop-blur-xl flex items-center gap-2.5 z-20"
                style={{
                  backgroundColor: isDark ? "rgba(18, 22, 34, 0.95)" : "#ffffff",
                  borderColor: isDark ? "rgba(244, 114, 182, 0.35)" : "#cbd5e1",
                }}
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-pink-500/50 shrink-0">
                  <img src={prashImg} alt="Prashma Poojary" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold text-pink-600 dark:text-pink-400">
                    Udupi / Manipal Native
                  </div>
                  <div className="text-[9px] text-gray-500 font-mono">Culture · Code · Insight</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
