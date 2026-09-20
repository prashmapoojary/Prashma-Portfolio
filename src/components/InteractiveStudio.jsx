import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Milestone,
  Send,
  Mail,
  Copy,
  Check,
  Clock,
  ArrowUpRight,
  Server,
  Database,
  BarChart,
  Brain,
  Cpu,
  Wrench,
  Layout,
} from "lucide-react";
import { personalInfo, skillsData, experienceData } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";

function LinkedinIcon({ className = "w-4 h-4 text-blue-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

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

export default function InteractiveStudio() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("arsenal"); // 'arsenal' | 'sandbox' | 'milestones' | 'signal'
  const [sandboxMode, setSandboxMode] = useState("web");
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const studioTabs = [
    { id: "arsenal", label: "Tech Arsenal", icon: <Code2 className="w-4 h-4" /> },
    { id: "sandbox", label: "Live Sandbox", icon: <Terminal className="w-4 h-4" /> },
    { id: "milestones", label: "Trajectory", icon: <Milestone className="w-4 h-4" /> },
    { id: "signal", label: "Direct Signal", icon: <Send className="w-4 h-4" /> },
  ];

  const categoryIcons = {
    Languages: <Code2 className="w-4 h-4 text-violet-500" />,
    Frontend: <Layout className="w-4 h-4 text-cyan-500" />,
    Backend: <Server className="w-4 h-4 text-indigo-500" />,
    Databases: <Database className="w-4 h-4 text-emerald-500" />,
    "Data Analytics & Visualization": <BarChart className="w-4 h-4 text-amber-500" />,
    "Machine Learning & NLP": <Brain className="w-4 h-4 text-pink-500" />,
    "Generative AI": <Cpu className="w-4 h-4 text-purple-500" />,
    "DevOps & Tools": <Wrench className="w-4 h-4 text-sky-500" />,
  };

  return (
    <section id="studio" className="relative py-16 pb-28 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wider uppercase">
              // 03. INTERACTIVE STUDIO DOCK
            </span>
            <h2
              className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              EXPLORE CAPABILITIES & <br className="hidden sm:inline" />
              <span style={{ color: "var(--accent-violet)" }}>CONNECT DIRECTLY.</span>
            </h2>
          </div>

          <div className="text-xs font-mono text-gray-500">
            Click tabs below to switch studio panes without scrolling
          </div>
        </div>

        {/* Studio Dock Switcher Pill */}
        <div className="flex items-center justify-start sm:justify-center mb-8 overflow-x-auto no-scrollbar pb-2">
          <div
            className="inline-flex items-center gap-1 p-1.5 rounded-full border shadow-sm"
            style={{
              backgroundColor: isDark ? "#121521" : "#ece9dd",
              borderColor: "var(--border-subtle)",
            }}
          >
            {studioTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DOCK CONTENT VIEWPORT */}
        <div className="theme-card p-6 sm:p-10 relative overflow-hidden min-h-[480px]">
          <AnimatePresence mode="wait">
            {/* TAB 1: TECH ARSENAL */}
            {activeTab === "arsenal" && (
              <motion.div
                key="arsenal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Tech icon ribbon */}
                <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-2 border-b border-black/5 dark:border-white/5">
                  {skillsData.techStackIcons.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border min-w-max"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <img src={t.icon} alt={t.name} className="w-4 h-4 object-contain" />
                      <span className="font-mono text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                        {t.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Categorized Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {skillsData.categories.map((cat) => (
                    <div
                      key={cat.title}
                      className="p-4 rounded-xl border"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-black/5 dark:border-white/5">
                        {categoryIcons[cat.title] || <Code2 className="w-4 h-4 text-violet-500" />}
                        <h4 className="font-mono text-xs font-bold uppercase" style={{ color: "var(--text-primary)" }}>
                          {cat.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[11px] px-2 py-0.5 rounded border"
                            style={{
                              backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                              borderColor: "var(--border-subtle)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 2: INTERACTIVE SANDBOX & TERMINAL */}
            {activeTab === "sandbox" && (
              <motion.div
                key="sandbox"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Sandbox sub-toggle */}
                <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSandboxMode("web")}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                        sandboxMode === "web"
                          ? "bg-violet-600 text-white shadow-sm"
                          : "text-gray-500 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      REST API & Node Engine
                    </button>
                    <button
                      onClick={() => setSandboxMode("analytics")}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                        sandboxMode === "analytics"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-gray-500 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      Python & Predictive BI
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500 hidden sm:inline-block">
                    Execution Sandbox v2.4
                  </span>
                </div>

                {/* Simulated Code Editor */}
                <div
                  className="rounded-2xl p-5 font-mono text-xs leading-relaxed overflow-x-auto border"
                  style={{
                    backgroundColor: isDark ? "#080a12" : "#f5f3ea",
                    borderColor: "var(--border-subtle)",
                    color: isDark ? "#e2e8f0" : "#1e293b",
                  }}
                >
                  <pre>
                    <code>
                      {sandboxMode === "web"
                        ? `// server/routes/collaborate.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { syncWhiteboardState } from '../services/socketService.js';

const router = express.Router();

router.post('/sync', authenticateToken, async (req, res) => {
  const { workspaceId, elements, version } = req.body;
  const broadcastResult = await syncWhiteboardState(workspaceId, elements, req.user.id);
  
  res.status(200).json({
    status: 'SYNCHRONIZED',
    activeSessions: broadcastResult.connectedUsers,
    latencyMs: 14.8,
    timestamp: new Date().toISOString()
  });
});

export default router;`
                        : `# analytics/pipeline/forecast_engine.py
import pandas as pd
from prophet import Prophet
from sklearn.cluster import KMeans

def compute_customer_rfm_clusters(df: pd.DataFrame) -> dict:
    rfm = df.groupby('customer_id').agg({
        'invoice_date': lambda d: (df['invoice_date'].max() - d.max()).days,
        'order_id': 'count',
        'revenue': 'sum'
    }).rename(columns={'invoice_date': 'R', 'order_id': 'F', 'revenue': 'M'})

    kmeans = KMeans(n_clusters=4, random_state=42).fit(rfm)
    rfm['segment'] = kmeans.labels_
    
    return {
        "status": "CONVERGED",
        "clusters": 4,
        "silhouette_score": 0.814,
        "high_value_customers": int((rfm['segment'] == 0).sum())
    }`}
                    </code>
                  </pre>
                </div>
              </motion.div>
            )}

            {/* TAB 3: TRAJECTORY & MILESTONES */}
            {activeTab === "milestones" && (
              <motion.div
                key="milestones"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experienceData.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl border flex flex-col justify-between"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
                          <span className="font-semibold uppercase" style={{ color: item.color }}>
                            {item.type}
                          </span>
                          <span>{item.period}</span>
                        </div>
                        <h4 className="font-display font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>
                          {item.title}
                        </h4>
                        <div className="font-mono text-xs text-violet-600 dark:text-violet-400 mb-3">
                          {item.org}
                        </div>
                        <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
                          {item.shortDesc}
                        </p>
                      </div>

                      {item.achievement && (
                        <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                          <span>{item.achievement}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 4: DIRECT SIGNAL & CONTACT */}
            {activeTab === "signal" && (
              <motion.div
                key="signal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Email dispatch */}
                <div className="lg:col-span-7 flex flex-col gap-5 items-start">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-emerald-500 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Inbox Open for Opportunities
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                      Let&apos;s engineer something extraordinary.
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Based in Udupi / Manipal, Karnataka. Open to full-time developer and analyst roles, remote engineering teams, and high-impact software projects.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer"
                      style={{ backgroundColor: "var(--accent-violet)" }}
                    >
                      <Mail className="w-4 h-4" />
                      <span>{personalInfo.contact.email}</span>
                      {copied ? (
                        <span className="text-emerald-300 font-bold ml-1 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-70 ml-1" />
                      )}
                    </button>

                    <a
                      href={`mailto:${personalInfo.contact.email}`}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-mono text-xs font-semibold border transition-all hover:bg-black/5 dark:hover:bg-white/5"
                      style={{
                        borderColor: "var(--border-strong)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <span>Open Mailer</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right: Local Clock & Quick Socials */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div
                    className="p-4 rounded-2xl border"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-violet-500" />
                        MANIPAL, INDIA
                      </span>
                      <span className="text-emerald-500 font-bold">IST UTC+5:30</span>
                    </div>
                    <div className="font-mono font-black text-2xl" style={{ color: "var(--text-primary)" }}>
                      {istTime || "12:00:00 PM"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <a
                      href={personalInfo.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border hover:border-violet-500 transition-colors"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <LinkedinIcon className="w-3.5 h-3.5 text-blue-500" />
                        LinkedIn
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>

                    <a
                      href={personalInfo.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border hover:border-violet-500 transition-colors"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <GithubIcon className="w-3.5 h-3.5" />
                        GitHub
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
