import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VideoModal from "./components/VideoModal";
import CustomCursor from "./components/CustomCursor";

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

      {/* Main Content Sections: High-Craft, Editorial & Cohesive */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Projects onOpenVideo={handleOpenVideo} />
        <TechStack />
        <Timeline />
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
