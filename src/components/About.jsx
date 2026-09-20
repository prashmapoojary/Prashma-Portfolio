import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Database, Award, GraduationCap, MapPin, Sparkles, Maximize2, X } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";
import prashImg from "../assets/prash.jpeg";

export default function About() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("web");
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // Close modal on Escape key & manage scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsImageExpanded(false);
      }
    };
    if (isImageExpanded) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isImageExpanded]);

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Watermark Section Number */}
      <div
        className="absolute left-4 md:left-12 top-12 font-heading font-black select-none pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          fontSize: "clamp(8rem, 20vw, 20rem)",
          lineHeight: 0.75,
          color: "var(--text-primary)",
        }}
      >
        02
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wider uppercase">
              // 02. PROFILE & ARCHITECTURE
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase" style={{ color: "var(--text-primary)" }}>
            BRIDGING FULL-STACK ARCHITECTURE <br className="hidden md:inline" />
            <span style={{ color: "var(--accent-violet)" }}>WITH DATA INTELLIGENCE.</span>
          </h2>
        </div>

        {/* 2-Column Editorial Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Narrative & Profile Badge */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Profile Dossier Card */}
            <div className="theme-card p-6 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-5">
                {/* Clickable Profile Photo with Zoom affordance */}
                <div
                  onClick={() => setIsImageExpanded(true)}
                  title="Click to view full photo"
                  className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-violet-500/40 hover:border-violet-500 shadow-lg shrink-0 group cursor-zoom-in transition-all duration-300 hover:shadow-violet-500/25 hover:scale-[1.03]"
                >
                  <img
                    src={prashImg}
                    alt="Prashma Poojary"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 bg-violet-950/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4 text-white drop-shadow" />
                    <span className="text-[8px] font-mono tracking-wider font-bold mt-0.5">ZOOM</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-display font-bold text-lg sm:text-xl" style={{ color: "var(--text-primary)" }}>
                      {personalInfo.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <p className="font-mono text-xs font-semibold text-violet-600 dark:text-violet-400">
                    Full-Stack Web Developer & Data Analyst
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-mono">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <p>
                  I am a Full-Stack Web Developer and MSc Computer Science student with hands-on experience building scalable applications using React, Node.js, Express, MongoDB, and PostgreSQL.
                </p>
                <p>
                  In parallel, I analyze enterprise business data: designing end-to-end pipelines in Python and SQL, building customer RFM segmentation, forecasting demand with Prophet & XGBoost, and delivering executive dashboards in Power BI and Tableau.
                </p>
              </div>

              {/* Academic Highlights Pill */}
              <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <GraduationCap className="w-4 h-4 text-violet-500" />
                    MSc Computer Science (MGM College)
                  </span>
                  <span className="font-bold text-violet-600 dark:text-violet-400">
                    9.16 CGPA
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <Award className="w-4 h-4 text-amber-500" />
                    BCA Degree (MGM College)
                  </span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    9.52 CGPA (Distinction)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    IIT Kanpur Big Data Computing
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Top 2% Topper (93%)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "MSc CGPA", val: "9.16", color: "#7c3aed" },
                { label: "BCA CGPA", val: "9.52", color: "#4338ca" },
                { label: "IIT Topper", val: "Top 2%", color: "#059669" },
                { label: "Big Data Score", val: "93%", color: "#0284c7" },
              ].map((stat, i) => (
                <div key={i} className="theme-card p-3.5 text-center">
                  <div className="font-heading font-black text-2xl" style={{ color: stat.color }}>
                    {stat.val}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-gray-500 dark:text-gray-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Architecture vs Analytics Playground */}
          <div className="lg:col-span-7">
            <div className="theme-card p-6 md:p-8">
              {/* Tab Selector */}
              <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveTab("web")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "web"
                        ? "bg-violet-600 text-white shadow-md"
                        : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    Web Engineering Stack
                  </button>
                  <button
                    onClick={() => setActiveTab("data")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "data"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    Data Analytics & AI
                  </button>
                </div>
                <span className="font-mono text-[11px] text-gray-400 hidden sm:inline-block">
                  // verified capabilities
                </span>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "web" ? (
                  <motion.div
                    key="web-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="font-display font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                        Modern Full-Stack Applications (PERN & MERN)
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        Building production-grade web systems from data modeling and schema normalization in PostgreSQL/MongoDB to responsive user interfaces in React 19 and Tailwind CSS.
                      </p>
                    </div>

                    {/* Architecture Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          title: "Real-Time Collaboration",
                          desc: "Socket.io pipelines syncing drag-and-drop state across 50+ concurrent users with sub-50ms latency.",
                        },
                        {
                          title: "Security & Auth",
                          desc: "JWT-based authentication, HTTP-only cookies, password hashing with bcrypt, and role-based access control.",
                        },
                        {
                          title: "Database Optimization",
                          desc: "Index tuning, query optimization, ACID transactions, and automated balance reconciliation.",
                        },
                        {
                          title: "CI/CD & Cloud Deployment",
                          desc: "Automated Git workflows, build pipelines, and zero-downtime production deployment.",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border shadow-xs"
                          style={{
                            backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                            borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                          }}
                        >
                          <div className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400 mb-1">
                            {item.title}
                          </div>
                          <div className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="data-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="font-display font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                        Data Analytics, Machine Learning & BI
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        Translating business data into actionable forecasts. Experience spanning customer segmentation (RFM), dynamic pricing models, NLP sentiment mining, and interactive dashboards.
                      </p>
                    </div>

                    {/* Analytics Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          title: "Predictive Forecasting",
                          desc: "XGBoost and Prophet models for sales demand forecasting, churn prediction, and price elasticity estimation.",
                        },
                        {
                          title: "Executive BI Dashboards",
                          desc: "Interactive Power BI and Tableau reporting engines communicating revenue KPIs and retention metrics.",
                        },
                        {
                          title: "NLP & Topic Modeling",
                          desc: "Hugging Face Transformers & BERTopic for automated customer sentiment scoring and complaint categorization.",
                        },
                        {
                          title: "Generative AI & RAG",
                          desc: "Retrieval-augmented generation pipelines (LangChain, ChromaDB) and autonomous multi-agent research tools.",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border shadow-xs"
                          style={{
                            backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                            borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                          }}
                        >
                          <div className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            {item.title}
                          </div>
                          <div className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Photo Lightbox Modal ("Comes forward and if pressed again goes back") */}
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div
            key="profile-image-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsImageExpanded(false)}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out select-none"
            id="profile-image-modal"
          >
            {/* Modal Card - Clicking it or anywhere dismisses it back */}
            <motion.div
              initial={{ scale: 0.65, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.65, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={() => setIsImageExpanded(false)}
              className="relative max-w-sm sm:max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-stone-900/90 backdrop-blur-2xl p-3 cursor-zoom-out group"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full bg-black/50">
                <img
                  src={prashImg}
                  alt="Prashma Poojary"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Profile dossier info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between pointer-events-none">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-display font-bold text-xl drop-shadow-md">
                        Prashma Poojary
                      </h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <p className="text-violet-300 font-mono text-xs mt-0.5 drop-shadow">
                      Full-Stack Web Developer & Data Analyst
                    </p>
                    <p className="text-gray-300 font-mono text-[11px] mt-1 flex items-center gap-1 drop-shadow">
                      <MapPin className="w-3 h-3 text-red-400 inline" /> Udupi / Manipal, Karnataka
                    </p>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md border border-white/25 text-white/95 text-[11px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0 shadow-sm">
                    <X className="w-3.5 h-3.5" /> Tap to close
                  </div>
                </div>
              </div>

              {/* Floating Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageExpanded(false);
                }}
                aria-label="Close enlarged photo"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

