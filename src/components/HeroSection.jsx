import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Terminal, Code2, LineChart } from "lucide-react";
import { personalInfo } from "../data/portfolio";


export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("web"); // "web" | "data"

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Top Badges & Status */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Availability Pulse Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-mono text-xs tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
            </span>
            Available for High-Impact Roles
          </div>

          {/* Location Badge */}
          <span className="font-mono text-xs text-white/50 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
            📍 {personalInfo.location}
          </span>
        </div>

        {/* Dual-Specialization Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0c0d16]/80 border border-white/10 backdrop-blur-xl mb-6 shadow-xl">
          <button
            onClick={() => setActiveTab("web")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === "web"
                ? "bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white shadow-md shadow-[#8b5cf6]/20 font-bold"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Full Stack Developer</span>
          </button>

          <button
            onClick={() => setActiveTab("data")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === "data"
                ? "bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white shadow-md shadow-[#06b6d4]/20 font-bold"
                : "text-white/60 hover:text-white"
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Data Analyst</span>
          </button>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02] text-white mb-6"
          >
            Building Scalable Web Systems &{" "}
            <span
              className={
                activeTab === "web" ? "text-gradient-violet" : "text-gradient-cyan"
              }
            >
              Actionable Data Insights.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mb-8 font-sans"
          >
            {activeTab === "web" ? (
              <>
                MSc Computer Science engineer specializing in production-ready web apps with{" "}
                <strong className="text-white font-semibold">React, Node.js, Express, PostgreSQL, and MongoDB</strong>.
                Proven experience in secure REST APIs, role-based JWT auth, and real-time Socket.io architectures.
              </>
            ) : (
              <>
                Transforming raw business datasets into strategic revenue drivers with{" "}
                <strong className="text-white font-semibold">Python, SQL, Power BI, and Tableau</strong>.
                Skilled in customer segmentation (RFM), predictive forecasting (XGBoost, Prophet), and NLP sentiment modeling.
              </>
            )}
          </motion.p>
        </div>

        {/* Live Terminal Command Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="glass-panel p-4 md:p-5 max-w-3xl mb-10 overflow-x-auto shadow-2xl border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2.5 pb-2.5 border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            </div>
            <span className="font-mono text-xs text-white/40 ml-2 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#a78bfa]" />
              prashma@production: ~
            </span>
          </div>

          <div className="font-mono text-xs md:text-sm text-white/90">
            <span className="text-[#10b981]">$ </span>
            <span className="text-[#a78bfa]">prashma.init</span>
            <span className="text-white/60">({`{`} </span>
            <span className="text-[#06b6d4]">stack</span>: [
            <span className="text-[#f59e0b]">'React'</span>, <span className="text-[#f59e0b]">'Node'</span>, <span className="text-[#f59e0b]">'PostgreSQL'</span>, <span className="text-[#f59e0b]">'MongoDB'</span>],{" "}
            <span className="text-[#06b6d4]">analytics</span>: [
            <span className="text-[#f59e0b]">'Python'</span>, <span className="text-[#f59e0b]">'PowerBI'</span>, <span className="text-[#f59e0b]">'Tableau'</span>]{` }`})
          </div>
        </motion.div>

        {/* CTAs & Quick Metrics */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-mono text-xs uppercase font-bold tracking-wider hover:opacity-95 shadow-lg shadow-[#8b5cf6]/25 transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <span>Explore 10 Projects</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 hover:border-white/20"
          >
            <Download className="w-4 h-4 text-[#a78bfa]" />
            <span>Download Résumé</span>
          </a>

          <div className="hidden lg:flex items-center gap-6 pl-4 ml-auto border-l border-white/10">
            <div>
              <div className="font-display font-black text-2xl text-white">9.16</div>
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider">MSc CGPA</div>
            </div>
            <div>
              <div className="font-display font-black text-2xl text-white">10</div>
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider">Projects</div>
            </div>
            <div>
              <div className="font-display font-black text-2xl text-white">25+</div>
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider">Tech Mastered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
