import React, { useState, useEffect } from "react";
import { Mail, Copy, Check, ArrowUpRight, Send, Clock, MapPin } from "lucide-react";
import { personalInfo } from "../data/portfolio";


export default function ConnectHub() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a78bfa] block mb-2">
            // 05. Get in Touch
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
            Let's Build Something High-Impact
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mt-2 font-sans">
            Open for full-stack engineering roles, data analytics initiatives, or technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]" />
                  </span>
                  <span className="font-mono text-xs text-[#10b981] tracking-wide font-bold uppercase">
                    Available for Work
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Prashma Poojary
                </h3>
                <p className="text-xs font-mono text-[#a78bfa] mb-6">
                  Full Stack Web Developer & Data Analyst
                </p>

                {/* Direct 1-Click Copy Email Button */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2.5 truncate">
                    <Mail className="w-4 h-4 text-[#a78bfa] shrink-0" />
                    <span className="font-mono text-xs text-white/90 truncate">
                      {personalInfo.contact.email}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10b981]" />
                        <span className="text-[#10b981] text-[10px] font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-white/70" />
                        <span className="text-[10px] text-white/70">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Local Time in Manipal / Udupi */}
                <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-3">
                  <Clock className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span>Manipal / Udupi Time: <strong className="text-white/80">{localTime || "IST (UTC+5:30)"}</strong></span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                  <MapPin className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span>Karnataka, India</span>
                </div>
              </div>

              {/* Social Links Row */}
              <div className="pt-8 border-t border-white/5 flex flex-wrap gap-3 mt-6">
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Message Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleFormSubmit}
              className="glass-panel p-6 sm:p-8 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-1">
                  Send a Direct Message
                </h3>
                <p className="text-xs font-mono text-white/50 mb-6">
                  Fills your email client directly with pre-formatted inquiry details.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#8b5cf6] font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#8b5cf6] font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                      Message / Project Scope
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your team, application, or analytics requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#8b5cf6] font-sans transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-mono text-xs uppercase font-bold tracking-wider hover:opacity-95 shadow-lg shadow-[#8b5cf6]/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
