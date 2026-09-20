import React from "react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-black/10 dark:border-white/5 py-12 px-6 md:px-12 relative z-10">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand info */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border"
            style={{
              backgroundColor: isDark ? "#161926" : "#ffffff",
              borderColor: isDark ? "rgba(255,255,255,0.12)" : "#cbd5e1",
              color: "var(--text-primary)",
            }}
          >
            PP
          </div>
          <div>
            <div className="font-display font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              Prashma Poojary
            </div>
            <div className="font-mono text-[11px] text-gray-500">
              Full Stack Web Developer & Data Analyst
            </div>
          </div>
        </div>

        {/* Center: Attribution */}
        <div className="font-mono text-[11px] text-gray-500 text-center sm:text-left">
          © {new Date().getFullYear()} · Udupi / Manipal, India
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
            borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
            color: "var(--text-primary)",
          }}
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
