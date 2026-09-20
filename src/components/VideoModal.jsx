import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";

export default function VideoModal({ isOpen, videoUrl, title, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus trap and escape key handler
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video, iframe'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  const isLoom = videoUrl.includes("loom.com");
  const loomEmbedUrl = isLoom
    ? videoUrl.replace("/share/", "/embed/") + "?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
    : "";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        {/* Modal Container */}
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#0d0d0d] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-[#141414]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <h3 id="video-modal-title" className="font-mono text-xs md:text-sm uppercase tracking-wider text-white font-bold truncate max-w-xs sm:max-w-md">
                {title || "Project Demo Video"}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {/* Direct Link button */}
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 cursor-pointer"
                title="Open in new browser tab"
              >
                <span>{isLoom ? "Watch on Loom" : "Open Original"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#a78bfa] cursor-pointer"
                aria-label="Close video preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Player / Loom Iframe */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            {isLoom ? (
              <iframe
                src={loomEmbedUrl}
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                title={title || "Loom Video Preview"}
                loading="eager"
              />
            ) : videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
              <iframe
                src={
                  videoUrl.includes("watch?v=")
                    ? videoUrl.replace("watch?v=", "embed/")
                    : videoUrl.replace("youtu.be/", "www.youtube.com/embed/")
                }
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={title || "YouTube Video Preview"}
                loading="eager"
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                preload="metadata"
                className="w-full h-full object-contain"
                playsInline
              >
                Your browser does not support HTML5 video playback.
              </video>
            )}
          </div>

          {/* Sub-bar / Note */}
          <div className="px-5 py-2.5 bg-[#111111] border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-sky-400 fill-current" />
              <span>Full resolution interactive demo</span>
            </span>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>Click here if video does not load automatically</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
