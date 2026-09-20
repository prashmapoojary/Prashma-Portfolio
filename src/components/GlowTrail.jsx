import React, { useEffect, useRef } from "react";

export default function GlowTrail() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: 3 + Math.random() * 2.5,
      });
      if (pointsRef.current.length > 45) {
        pointsRef.current.shift();
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const pts = pointsRef.current;

      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        pt.life -= 0.02;
        if (pt.life <= 0) continue;

        const life = pt.life;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * life, 0, Math.PI * 2);

        const grad = ctx.createRadialGradient(
          pt.x,
          pt.y,
          0,
          pt.x,
          pt.y,
          pt.size * life * 3
        );
        grad.addColorStop(0, `rgba(167, 139, 250, ${life * 0.7})`);
        grad.addColorStop(0.5, `rgba(124, 58, 237, ${life * 0.25})`);
        grad.addColorStop(1, "rgba(124, 58, 237, 0)");

        ctx.fillStyle = grad;
        ctx.fill();

        if (i < pts.length - 1) {
          const next = pts[i + 1];
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${life * 0.12})`;
          ctx.lineWidth = life * 1.5;
          ctx.stroke();
        }
      }

      pointsRef.current = pts.filter((p) => p.life > 0);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="global-glow-trail hidden lg:block"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}
