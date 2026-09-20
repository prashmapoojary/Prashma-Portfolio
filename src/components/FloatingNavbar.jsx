import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";
import { personalInfo } from "../data/portfolio";


export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "#hero" },
    { label: "Specialization", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Journey", href: "#journey" },
    { label: "Connect", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "projects", "skills", "journey", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-5 py-2.5 md:px-6 md:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#0c0d16]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
              : "bg-[#0c0d16]/40 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group text-white font-display font-bold text-base md:text-lg tracking-tight"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#06b6d4] group-hover:scale-125 transition-transform" />
            <span className="text-white group-hover:text-[#c084fc] transition-colors">
              Prashma
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider transition-colors rounded-full ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-[#8b5cf6]/20 border border-[#8b5cf6]/50 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#a78bfa]" />
              <span>Résumé</span>
            </a>

            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white text-xs font-mono font-semibold hover:opacity-95 shadow-md shadow-[#8b5cf6]/20 transition-all hover:scale-[1.03]"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#070709]/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center items-center p-6 gap-6"
          >
            <div className="flex flex-col items-center gap-5 w-full max-w-xs">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 px-4 rounded-xl font-display text-xl font-bold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="w-full max-w-xs pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href={personalInfo.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-mono text-xs uppercase font-bold text-center tracking-wider"
              >
                View Résumé (PDF)
              </a>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-mono text-xs uppercase font-bold text-center tracking-wider shadow-lg"
              >
                Send Email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
