import React, { useState, useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VideoModal from "./components/VideoModal";
import CustomCursor from "./components/CustomCursor";

// Lazy-load heavy components for performance & fast TTI
const TechStack = lazy(() => import("./components/TechStack"));
const Timeline = lazy(() => import("./components/Timeline"));

function SectionFallback() {
  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function PortfolioContent() {
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    url: "",
    title: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenVideo = (videoUrl, projectTitle) => {
    setVideoModal({
      isOpen: true,
      url: videoUrl,
      title: projectTitle,
    });
  };

  const handleCloseVideo = () => {
    setVideoModal({
      isOpen: false,
      url: "",
      title: "",
    });
  };

  return (
    <div className="min-h-screen relative selection:bg-violet-600 selection:text-white">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Island Navigation with Theme Switcher */}
      <Navbar />

      {/* Main Content Sections with Accessibility ID */}
      <main id="main-content" className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Projects onOpenVideo={handleOpenVideo} />
        
        <Suspense fallback={<SectionFallback />}>
          <TechStack />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Timeline />
        </Suspense>

        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Accessible Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        videoUrl={videoModal.url}
        title={videoModal.title}
        onClose={handleCloseVideo}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
