import React, { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor({ cursorText }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 600 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest(
          "a, button, [role='button'], input, select, textarea, .cursor-pointer, .physics-char"
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1024px), (pointer: coarse), (prefers-reduced-motion: reduce)").matches
  ) {
    return null; // Disabled on mobile/touch screens and reduced motion
  }

  const size = cursorText ? 72 : isHovering ? 36 : 14;

  return (
    <motion.div
      className="custom-cursor hidden lg:flex items-center justify-center pointer-events-none fixed top-0 left-0 z-[99999] rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
        mixBlendMode: "difference",
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor: "#ffffff",
      }}
      transition={{
        width: { type: "spring", stiffness: 350, damping: 25 },
        height: { type: "spring", stiffness: 350, damping: 25 },
      }}
    >
      <AnimatePresence>
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="font-mono text-black text-[10px] font-bold tracking-wider select-none uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
