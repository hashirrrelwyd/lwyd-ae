"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

// Custom hook to detect when element is visible on screen
function useOnScreen(ref, rootMargin = "0px", threshold = 0) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin, threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return isIntersecting;
}

// Responsive digit size for the rolling counters: 56px on mobile, 88px on tablets,
// and on laptops/monitors 7% of the screen width (~134px at 1920px, as in Figma; min 72px)
function useDigitHeight() {
  const getHeight = () => {
    const w = window.innerWidth;
    if (w < 768) return 56;
    if (w < 1024) return 88;
    return Math.round(Math.max(72, w * 0.07));
  };
  const [digitHeight, setDigitHeight] = useState(
    typeof window !== "undefined" ? getHeight() : 120
  );

  useEffect(() => {
    const onResize = () => setDigitHeight(getHeight());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return digitHeight;
}

export default function AboutUs() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  useSectionTheme(sectionRef, "light");
  const ref = useRef(null);
  // threshold 1 => only start once the counters row itself is fully inside the viewport
  // (watching the row, not the whole section, so it can still be satisfied on short/mobile viewports)
  const isVisible = useOnScreen(ref, "0px", 1);
  const digitHeight = useDigitHeight();

  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [animated, setAnimated] = useState(false); // prevent re-trigger

  const stats = [
    { value: 10, suffix: "+", label: "Clients" },
    { value: 2, suffix: "", label: "Cities" },
    { value: 80, suffix: "+", label: "Team Members" },
    { value: 99, suffix: "+", label: "Lorem ipsum dolor" },
  ];
  const targetNumbers = stats.map((s) => s.value);

  useEffect(() => {
    if (isVisible && !animated) {
      setAnimated(true); // run only once

      const duration = 5000; // total roll time
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // smoother easing (easeOutCubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCounters(
          targetNumbers.map((target) => Math.floor(target * easeOut))
        );

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // final fix to avoid "jump"
          setCounters(targetNumbers);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, animated]);

  return (
    // Layout follows Figma (1920px frame); lg+ sizes are in vw so they scale with the screen
    <section ref={sectionRef} className="section-padding pt-16 pb-16 lg:pt-[max(4rem,6vw)] lg:pb-[max(4rem,6.5vw)]">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between mb-14 lg:mb-[max(4rem,6.25vw)]">
        {/* Left: small label */}
        <h3 className="section-label text-gray-800">
          Who <span className="text-lwyd-yellow font-[750] italic">We</span>{" "}
          are
        </h3>

        {/* Right: headline, copy and CTA (~36% of the width on laptops/monitors) */}
        <div className="flex flex-col items-start md:w-1/2 lg:w-[36%]">
          <h2 className="section-title">
            Built by{" "}
            <span className="text-lwyd-yellow italic font-[750]">people</span>{" "}
            who've lived inside this industry
          </h2>
         
          <div className="mt-6 lg:mt-[max(1.5rem,2vw)]">
            <Button title={"Our Services"} onClick={() => navigate("/service")} />
          </div>
        </div>
      </div>

      {/* Counters: 4 equal columns, each with a thin line on the left; left-aligned */}
      <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        {counters.map((count, i) => (
          <div
            key={i}
            className="border-l border-black/10 pl-5 lg:pl-[max(1.25rem,1.67vw)] pt-6 pb-2 lg:pt-[max(2rem,3.5vw)] lg:pb-[max(0.75rem,1.1vw)]"
          >
            <div className="flex justify-start">
              {String(count)
                .padStart(String(targetNumbers[i]).length, "0") // prevent jump
                .split("")
                .map((digit, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden"
                    style={{ height: digitHeight, width: "auto" }}
                  >
                    <div
                      className="transition-transform duration-700 ease-out"
                      style={{
                        transform: `translateY(-${parseInt(digit) * digitHeight}px)`,
                      }}
                    >
                      {[...Array(10).keys()].map((n) => (
                        <div
                          key={n}
                          className="flex items-center justify-center font-[500] leading-none"
                          style={{ height: digitHeight, fontSize: digitHeight }}
                        >
                          {n}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              {stats[i].suffix && (
                <span
                  className="font-[500] leading-none"
                  style={{ fontSize: digitHeight }}
                >
                  {stats[i].suffix}
                </span>
              )}
            </div>
            <p className="mt-3 lg:mt-[max(0.75rem,1.5vw)] text-[#7d7d7d] text-base md:text-lg lg:text-[max(14px,1.04vw)]">{stats[i].label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
