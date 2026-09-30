"use client";
import { useEffect, useState, useRef } from "react";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const sources = [
  "/images/media.webp",
  "/images/digital.webp",
  "/images/experience.webp",
  "/images/social.webp",
];

export default function HeroSection() {
  const [trail, setTrail] = useState([]);
  const containerRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useSectionTheme(containerRef, "light");

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // only spawn if moved enough distance
      if (dist < 150) return;

      lastPosRef.current = { x, y };

      // trail images are 160–220px on a 1920px screen and shrink in proportion on smaller ones
      const scale = Math.min(1, Math.max(0.6, window.innerWidth / 1920));
      const newImage = {
        id: Date.now() + Math.random(),
        src: sources[Math.floor(Math.random() * sources.length)],
        x,
        y,
        opacity: 1,
        size: (160 + Math.random() * 60) * scale,
      };

      setTrail((prev) => [...prev, newImage]);
    };

    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fade out images
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((img) => ({ ...img, opacity: img.opacity - 0.06 }))
          .filter((img) => img.opacity > 0)
      );
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden rounded-2xl"
    >
      {/* Cursor Trail */}
      {trail.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt=""
          className="absolute object-cover rounded-2xl pointer-events-none z-30"
          style={{
            width: img.size,
            height: "auto",
            left: img.x,
            top: img.y,
            transform: "translate(-50%, -50%)",
            opacity: img.opacity,
            transition: "opacity 0.6s ease-out",
          }}
        />
      ))}

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none section-padding">
        <h1 className="hero-title text-black text-center">
          We only{" "}
          <span className="text-lwyd-yellow font-[700] italic">built</span>{" "}
          for one space and <br className="hidden sm:block" /> we've gotten
          <span className="text-lwyd-yellow font-[700] italic"> very good at it </span>
        </h1>
      </div>

      {/* Paragraph */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full section-padding flex justify-center">
        <p className="hero-text text-[#7D7D7D] max-w-md text-center">
          LWYD was built inside the alco-bev world, not adapted for it. Here's who we are and how we work.
        </p>
      </div>

      {/* Section bottom border, inset to match the page side padding */}
      <div className="absolute bottom-0 inset-x-[var(--side-padding)] h-px bg-black/10 z-20" />
    </div>
  );
}
