"use client";
import { useEffect, useState, useRef } from "react";

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

      const newImage = {
        id: Date.now() + Math.random(),
        src: sources[Math.floor(Math.random() * sources.length)],
        x,
        y,
        opacity: 1,
        size: 160 + Math.random() * 60,
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
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <h1 className="text-[36px] sm:text-[72px] text-black font-[200] text-center">
          Lorem{" "}
          <span className="text-lwyd-yellow font-[700] italic">ipsum</span>{" "}
          dolor dolor <br />
          <span className="text-lwyd-yellow font-[700] italic">consectetur</span>
        </h1>
      </div>

      {/* Paragraph */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <p className="text-[#7D7D7D] text-base font-normal max-w-md text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
          ipsum dolor sit amet, consectetur adipiscing
        </p>
      </div>

      {/* Section bottom border, inset from the edges */}
      <div className="absolute bottom-0 inset-x-10 h-px bg-black/10 z-20" />
    </div>
  );
}
