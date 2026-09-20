import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../data/portfolio";
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle2 } from "lucide-react";

export default function CareerJourney() {
  const getIcon = (type) => {
    switch (type) {
      case "Work Experience":
        return <Briefcase className="w-4 h-4 text-[#f97316]" />;
      case "Education":
        return <GraduationCap className="w-4 h-4 text-[#22d3ee]" />;
      case "Certifications":
        return <Award className="w-4 h-4 text-[#34d399]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#a78bfa]" />;
    }
  };

  return (
    <section id="journey" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a78bfa] block mb-2">
            // 04. Experience & Milestones
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
            Career Journey & Academics
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mt-2 font-sans">
            Professional industry experience, postgraduate education, and certified technical specializations.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-10 ml-3 sm:ml-6 space-y-12">
          {experienceData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Glowing Node */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0c0d16] border-2 flex items-center justify-center shadow-lg"
                style={{ borderColor: item.color }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: item.color }}
                />
              </div>

              {/* Card */}
              <div className="glass-panel p-6 sm:p-8 hover:border-white/20 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5"
                      style={{
                        background: `${item.color}15`,
                        borderColor: `${item.color}40`,
                        color: item.color,
                      }}
                    >
                      {getIcon(item.type)}
                      <span>{item.type}</span>
                    </span>

                    {item.achievement && (
                      <span className="font-mono text-[10px] sm:text-xs text-white/50 bg-white/5 px-2.5 py-1 rounded-full">
                        {item.achievement}
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-xs text-white/40 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#a78bfa]" />
                    {item.period}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
                  {item.title}
                </h3>
                <div className="font-mono text-sm text-[#a78bfa] mb-4">
                  {item.org}
                </div>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans mb-5">
                  {item.fullDesc}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/5 text-white/60 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
