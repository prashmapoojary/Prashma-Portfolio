import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectCategories } from "../data/portfolio";
import ProjectCardNew from "./ProjectCardNew";
import VideoModal from "./VideoModal";

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);

  // Exclude Data Science while empty
  const availableCategories = useMemo(() => {
    const presentCategories = projectCategories.filter((cat) =>
      projectsData.some((p) => p.category === cat)
    );
    return ["All", ...presentCategories];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#a78bfa] block mb-2">
              // 02. Engineering Portfolio
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
              Selected Works & Systems
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl mt-2 font-sans">
              Spanning real-time collaboration web apps, finance platforms, e-commerce BI pipelines, and autonomous AI agents.
            </p>
          </div>

          {/* Project count indicator */}
          <div className="font-mono text-xs text-white/50 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full w-fit">
            Showing <strong className="text-white">{filteredProjects.length}</strong> of {projectsData.length} projects
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {availableCategories.map((category) => {
            const isSelected = activeCategory === category;
            const count =
              category === "All"
                ? projectsData.length
                : projectsData.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-mono text-xs tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-white text-black border-white shadow-lg font-bold"
                    : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-black/10 text-black" : "bg-white/10 text-white/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCardNew
                key={project.id}
                project={project}
                onWatchVideo={(url, title) => setActiveVideo({ url, title })}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Accessible Video Modal */}
      <VideoModal
        isOpen={Boolean(activeVideo)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
