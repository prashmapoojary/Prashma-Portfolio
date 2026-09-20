import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, LineChart, GraduationCap, Cpu, MapPin } from "lucide-react";
import { personalInfo } from "../data/portfolio";


export default function BentoAbout() {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a78bfa] block mb-2">
            // 01. Specialization & Background
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
            Architecture × Analytics
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mt-3 font-sans">
            A balanced engineering mindset that couples high-concurrency web architecture with statistical and data-driven intelligence.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: 3D Tilt Developer Portrait (Span 1x2 on large) */}
          <div
            className="md:col-span-1 lg:col-span-1 md:row-span-2 flex flex-col"
            style={{ perspective: 1000 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="glass-panel overflow-hidden relative flex-1 flex flex-col justify-between p-4 group border border-white/10"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-4">
                <img
                  src={personalInfo.contact.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d16] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="font-mono text-xs text-white font-bold tracking-wider">
                    {personalInfo.name}
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                </div>
              </div>

              <div className="px-1 pb-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/60 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span>{personalInfo.location}</span>
                </div>
                <p className="text-[11px] font-mono text-white/40 leading-normal">
                  MSc Computer Science Candidate · 2024 – 2026
                </p>
              </div>
            </motion.div>
          </div>

          {/* Card 2: The Web Architect (Span 2x1) */}
          <div className="md:col-span-2 lg:col-span-2 glass-panel p-6 md:p-8 flex flex-col justify-between border-t-2 border-t-[#8b5cf6]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center text-[#c084fc] mb-5">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#a78bfa] block mb-1">
                Engineering Discipline
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-3">
                Full-Stack Web Development
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans mb-6">
                Hands-on experience building scalable, production-ready applications with React, Node.js, Express, PostgreSQL, and MongoDB. Adept at designing secure REST APIs, JWT-based authentication, role-based access control, and real-time state synchronization with Socket.io.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {["PERN & MERN", "RESTful APIs", "JWT & RBAC", "Socket.io Concurrency", "Database Indexing"].map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Academic Excellence (Span 1x1) */}
          <div className="md:col-span-1 lg:col-span-1 glass-panel p-6 flex flex-col justify-between border-t-2 border-t-[#06b6d4]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/20 border border-[#06b6d4]/40 flex items-center justify-center text-[#06b6d4] mb-5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#06b6d4] block mb-1">
                Academics
              </span>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                MGM College, Udupi
              </h3>

              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white font-bold">MSc Comp Science</span>
                    <span className="text-[#06b6d4] font-bold">9.16 CGPA</span>
                  </div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">2024 – 2026</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white font-bold">BCA (Distinction)</span>
                    <span className="text-[#a78bfa] font-bold">9.52 CGPA</span>
                  </div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">2021 – 2024</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Data Analyst & BI (Span 2x1) */}
          <div className="md:col-span-2 lg:col-span-2 glass-panel p-6 md:p-8 flex flex-col justify-between border-t-2 border-t-[#06b6d4]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/20 border border-[#06b6d4]/40 flex items-center justify-center text-[#67e8f9] mb-5">
                <LineChart className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#06b6d4] block mb-1">
                Data Science & Analytics
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-3">
                BI Dashboards & Predictive Modeling
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans mb-6">
                Turning raw transactional and user data into actionable business intelligence using Python, SQL, Power BI, and Tableau. Hands-on experience in customer RFM segmentation, predictive modeling (churn, demand forecasting, pricing), and transformer-based NLP sentiment analysis.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {["Power BI", "Tableau", "SQL Pipelines", "XGBoost & Prophet", "RFM Segmentation", "BERTopic NLP"].map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card 5: Modern Explorations (Span 1x1) */}
          <div className="md:col-span-1 lg:col-span-1 glass-panel p-6 flex flex-col justify-between border-t-2 border-t-[#f59e0b]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-[#fbbf24] mb-5">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#f59e0b] block mb-1">
                Emerging Tech
              </span>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                GenAI & CI/CD
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-mono mb-4">
                Exposure to Generative AI architectures (RAG, LangChain, Multi-Agent assistants) and modern CI/CD automation.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {["RAG", "LangChain", "Git", "CI/CD"].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
