import React from "react";
import { motion } from "framer-motion";
import { Code2, Layout, Server, Database, BarChart, Brain, Cpu, Wrench } from "lucide-react";
import { skillsData } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";

export default function Capabilities() {
  const { isDark } = useTheme();

  const categoryIcons = {
    "Languages": <Code2 className="w-4 h-4 text-violet-500" />,
    "Frontend": <Layout className="w-4 h-4 text-cyan-500" />,
    "Backend": <Server className="w-4 h-4 text-indigo-500" />,
    "Databases": <Database className="w-4 h-4 text-emerald-500" />,
    "Data Analytics & Visualization": <BarChart className="w-4 h-4 text-amber-500" />,
    "Machine Learning & NLP": <Brain className="w-4 h-4 text-pink-500" />,
    "Generative AI": <Cpu className="w-4 h-4 text-purple-500" />,
    "DevOps & Tools": <Wrench className="w-4 h-4 text-sky-500" />,
  };

  return (
    <section id="stack" className="relative py-24 md:py-32 overflow-hidden">
      {/* Watermark Section Number */}
      <div
        className="absolute left-4 md:left-12 top-12 font-heading font-black select-none pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          fontSize: "clamp(8rem, 20vw, 20rem)",
          lineHeight: 0.75,
          color: "var(--text-primary)",
        }}
      >
        04
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wider uppercase">
              // 04. CAPABILITY MATRIX
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                ENGINEERED WITH <br className="hidden md:inline" />
                <span style={{ color: "var(--accent-violet)" }}>PRECISION TOOLS.</span>
              </h2>
            </div>

            <p className="text-sm max-w-md font-normal" style={{ color: "var(--text-secondary)" }}>
              A multi-disciplinary stack spanning modern reactive user interfaces, distributed Node.js/PostgreSQL backends, containerization, and advanced statistical machine learning pipelines.
            </p>
          </div>
        </div>

        {/* Featured Tech Icon Ribbon */}
        <div className="theme-card p-6 mb-12 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between gap-6 min-w-max">
            {skillsData.techStackIcons.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" />
                <span className="font-mono text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="theme-card p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
                  <div
                    className="p-1.5 rounded-lg border"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    {categoryIcons[cat.title] || <Code2 className="w-4 h-4 text-violet-500" />}
                  </div>
                  <h3
                    className="font-mono text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] px-2 py-1 rounded-md border transition-colors hover:border-violet-500"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
