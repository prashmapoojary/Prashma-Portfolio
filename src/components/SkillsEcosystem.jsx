import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "../data/portfolio";
import { Layers, Terminal, Database, LineChart, BrainCircuit, Cpu } from "lucide-react";

export default function SkillsEcosystem() {
  const categoryIcons = {
    Languages: <Terminal className="w-4 h-4 text-[#8b5cf6]" />,
    Frontend: <Layers className="w-4 h-4 text-[#60a5fa]" />,
    Backend: <Cpu className="w-4 h-4 text-[#34d399]" />,
    Databases: <Database className="w-4 h-4 text-[#06b6d4]" />,
    "Data Analytics & Visualization": <LineChart className="w-4 h-4 text-[#f59e0b]" />,
    "Machine Learning & NLP": <BrainCircuit className="w-4 h-4 text-[#ec4899]" />,
    "Generative AI": <BrainCircuit className="w-4 h-4 text-[#a855f7]" />,
    "DevOps & Tools": <Cpu className="w-4 h-4 text-[#38bdf8]" />,
  };

  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a78bfa] block mb-2">
            // 03. Technical Ecosystem
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
            Skills & Capabilities
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mt-2 font-sans">
            Categorized overview of engineering tools, frameworks, and analytics stacks utilized across projects.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillsData.categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel p-5 sm:p-6 flex flex-col justify-between group hover:border-[#8b5cf6]/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    {categoryIcons[cat.title] || <Terminal className="w-4 h-4 text-white/70" />}
                  </div>
                  <span className="font-mono text-[11px] text-white/30">0{idx + 1}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-3">
                  {cat.title}
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-white/5 text-white/75 border border-white/5 group-hover:border-white/10 group-hover:text-white transition-colors"
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
