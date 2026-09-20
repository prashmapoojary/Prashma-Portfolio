import React from "react";
import { ArrowUp } from "lucide-react";
import { personalInfo } from "../data/portfolio";

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-white/10 bg-[#070709] py-12 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-display font-bold text-lg text-white">
            {personalInfo.name}
          </div>
          <div className="text-xs font-mono text-white/50 mt-1">
            {personalInfo.primaryTitle} & {personalInfo.secondaryTitle} · {personalInfo.location}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-white/40">
            © {currentYear} Prashma Poojary.
          </span>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
