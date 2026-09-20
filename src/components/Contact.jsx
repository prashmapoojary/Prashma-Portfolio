import React, { useState, useEffect } from "react";
import { Mail, Copy, Check, FileText, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";
import prashImg from "../assets/prash.jpeg";

function LinkedinIcon({ className = "w-4 h-4 text-blue-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Contact() {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState("");

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Watermark Section Number */}
      <div
        className="absolute left-4 md:left-12 top-12 font-heading font-black select-none pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          fontSize: "clamp(8rem, 20vw, 20rem)",
          lineHeight: 0.75,
          color: "var(--text-primary)",
        }}
      >
        06
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wider uppercase">
              // 06. SIGNAL & COLLABORATION
            </span>
          </div>
          <h2
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            LET&apos;S BUILD SOMETHING <br className="hidden md:inline" />
            <span style={{ color: "var(--accent-violet)" }}>REMARKABLE TOGETHER.</span>
          </h2>
        </div>

        {/* Contact Hub Card */}
        <div className="theme-card p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Direct Dispatch */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-violet-500/40 shadow-sm shrink-0">
                    <img src={prashImg} alt="Prashma Poojary" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm leading-none" style={{ color: "var(--text-primary)" }}>
                      Prashma Poojary
                    </div>
                    <div className="font-mono text-[11px] text-emerald-500 font-semibold flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Available for Full-Time Roles & Projects
                    </div>
                  </div>
                </div>

                <h3
                  className="font-display font-bold text-2xl sm:text-3xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  Have a mission or an engineering challenge?
                </h3>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Whether you are architecting a new web product, scaling a data pipeline, or looking for an agile developer in the Udupi / Manipal or remote space, my inbox is always open.
                </p>
              </div>

              {/* 1-Click Email Action Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between sm:justify-start gap-3 px-6 py-3.5 rounded-xl font-mono text-xs font-bold text-white shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: "var(--accent-violet)" }}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{personalInfo.contact.email}</span>
                  </div>
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-300 font-bold ml-2">
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-80 hover:opacity-100 ml-2" />
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-mono text-xs font-semibold border transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    borderColor: "var(--border-strong)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span>Open Mailer</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Optional Phone (controlled by config toggle) */}
              {personalInfo.contact.showPhone && personalInfo.contact.phone && (
                <div className="font-mono text-xs text-gray-500">
                  Tel: <a href={`tel:${personalInfo.contact.phone}`} className="underline">{personalInfo.contact.phone}</a>
                </div>
              )}
            </div>

            {/* Right: Telemetry & Social Channels */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Telemetry Pill: Manipal Local Time */}
              <div
                className="p-5 rounded-2xl border flex flex-col gap-2"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                  borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                }}
              >
                <div className="flex items-center justify-between font-mono text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-violet-500" />
                    LOCAL TIME (IST)
                  </span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    UTC+5:30
                  </span>
                </div>
                <div
                  className="font-mono font-bold text-2xl tracking-wider"
                  style={{ color: "var(--text-primary)" }}
                >
                  {istTime || "12:00:00 PM"}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="flex flex-col gap-2">
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 hover:border-violet-500 group"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-blue-500" />
                    <span className="font-mono text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                      LinkedIn Profile
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors" />
                </a>

                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 hover:border-violet-500 group"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
                    <span className="font-mono text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                      GitHub Repositories
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors" />
                </a>

                <a
                  href="/assets/Prashma Poojary.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 hover:border-violet-500 group"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    borderColor: isDark ? "var(--border-subtle)" : "#cbd5e1",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span className="font-mono text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                      Conference Paper (ICKACS-2026)
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
