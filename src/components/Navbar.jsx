import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import prashProfileIcon from "../assets/prash.jpeg";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["home", "about", "work", "skills", "experience", "contact"];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Work", href: "#work", id: "work" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[99999] px-4 py-2 bg-violet-600 text-white rounded-lg font-mono text-xs font-bold shadow-2xl focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        Skip to main content
      </a>

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "glass-pill shadow-xl"
              : "bg-transparent border border-transparent backdrop-blur-sm"
          }`}
          style={{
            maxWidth: "960px",
            width: "100%",
          }}
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* Monogram / Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-violet-500/40 shadow-sm shrink-0">
              <img
                src={prashProfileIcon}
                alt="Prashma Poojary"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="font-display font-bold text-sm tracking-tight hidden sm:inline-block leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                Prashma
              </span>
              <span className="text-[10px] font-mono tracking-widest leading-none mt-0.5 text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                AVAILABLE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 relative ${
                    isActive
                      ? "font-bold"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  style={{
                    color: isActive ? "var(--accent-violet)" : "var(--text-secondary)",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        backgroundColor: isDark ? "rgba(167, 139, 250, 0.12)" : "rgba(109, 40, 217, 0.08)",
                        border: isDark ? "1px solid rgba(167, 139, 250, 0.25)" : "1px solid rgba(109, 40, 217, 0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Cluster: Theme Switcher */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
              style={{
                backgroundColor: isDark ? "#161926" : "#f1efe7",
                borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                color: isDark ? "#fbbf24" : "#6d28d9",
              }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200"
              style={{
                backgroundColor: isDark ? "#161926" : "#f1efe7",
                borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                color: "var(--text-primary)",
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl glass-pill p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-sm uppercase tracking-wider py-2 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
