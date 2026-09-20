import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LetterScramble({ target, delay, isRevealing }) {
  const [displayChar, setDisplayChar] = useState("");

  useEffect(() => {
    if (!isRevealing) return;
    let cycles = 0;
    const maxCycles = 8 + Math.floor(Math.random() * 10);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (cycles >= maxCycles) {
          clearInterval(interval);
          setDisplayChar(target);
        } else {
          setDisplayChar(chars[Math.floor(Math.random() * chars.length)]);
          cycles++;
        }
      }, 45);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isRevealing, target, delay]);


  return (
    <motion.span
      className="inline-block min-w-[0.55em] text-center"
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "clamp(3.5rem, 14vw, 10rem)",
        fontWeight: 500,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: "#f2f2f2",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isRevealing ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {displayChar || "\u00A0"}
    </motion.span>
  );
}

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "reveal" | "exit" | "done"

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1.25;
      if (current >= 100) {
        setProgress(100);
        clearInterval(interval);
        setPhase("reveal");
        setTimeout(() => setPhase("exit"), 1100);
        setTimeout(() => {
          setPhase("done");
          onComplete?.();
        }, 2100);
      } else {
        setProgress(Math.floor(current));
      }
    }, 22);

    return () => clearInterval(interval);
  }, [onComplete]);

  const isRevealing = phase === "reveal" || phase === "exit";

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* Top Half Door */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-[10000] overflow-hidden"
            style={{ height: "50.2vh", background: "#080808" }}
            initial={{ y: 0 }}
            animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />
            {/* Center border glowing seam */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.8), transparent)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
          </motion.div>

          {/* Bottom Half Door */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[10000] overflow-hidden"
            style={{ height: "50.2vh", background: "#080808" }}
            initial={{ y: 0 }}
            animate={phase === "exit" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />
          </motion.div>

          {/* Center Brand Text & Scramble */}
          <motion.div
            className="fixed inset-0 z-[10001] flex flex-col items-center justify-center pointer-events-none"
            animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex gap-[0.02em] mb-3 overflow-hidden select-none">
              {"prashma".split("").map((char, index) => (
                <LetterScramble
                  key={index}
                  target={char}
                  delay={index * 70}
                  isRevealing={isRevealing}
                />
              ))}
            </div>

            <motion.p
              className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={isRevealing ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Full Stack Developer &nbsp;·&nbsp; Data Analyst
            </motion.p>
          </motion.div>

          {/* Top Corners metadata */}
          <motion.span
            className="fixed top-8 left-8 z-[10002] font-mono text-xs pointer-events-none"
            style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}
            initial={{ opacity: 0 }}
            animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            // init
          </motion.span>

          <motion.span
            className="fixed top-8 right-8 z-[10002] font-mono text-xs pointer-events-none"
            style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}
            initial={{ opacity: 0 }}
            animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            portfolio v2.0
          </motion.span>

          {/* Bottom Progress Bar & Counter */}
          <motion.div
            className="fixed bottom-8 left-8 right-8 z-[10002] flex items-center gap-6 pointer-events-none"
            animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              [9.16 CGPA]
            </span>

            <div
              className="flex-1 h-[1px] relative overflow-hidden"
              style={{ background: "rgba(255, 255, 255, 0.1)" }}
            >
              <motion.div
                className="absolute inset-0 bg-[#a78bfa]"
                style={{
                  transformOrigin: "left",
                  transform: `scaleX(${progress / 100})`,
                  boxShadow: "0 0 10px rgba(167, 139, 250, 0.8)",
                }}
              />
            </div>

            <span
              className="font-mono text-xs text-right min-w-[3.5ch]"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {progress}%
            </span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
