"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

// Custom hook to detect when element is visible on screen
function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}

export default function AboutUs() {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [animated, setAnimated] = useState(false); // prevent re-trigger

  const targetNumbers = [99, 158, 325, 128];

  useEffect(() => {
    if (isVisible && !animated) {
      setAnimated(true); // run only once

      const duration = 2500; // total roll time
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
    <section ref={ref} className="section-padding py-12">
      <div className="x-auto grid  grid-cols-1 gap-10 py-14 md:flex justify-between mb-24">
        {/* Left side */}
        <div className="md:w-6/12">
          <h3 className="text-[22px] font-[500] text-gray-800 mb-2">
            Who <span className="text-lwyd-yellow font-[750] italic">We</span>{" "}
            are
          </h3>
        </div>
        <div className="md:w-6/12 lg:w-4/12">
          <h2 className="text-3xl md:text-4xl font-[500] mb-4">
            Lorem{" "}
            <span className="text-lwyd-yellow italic font-[750]">ipsum</span>{" "}
            dolor dolor consectetur consectetur adipiscing Lorem
          </h2>
          <Button title={"Our Service"} />
        </div>
      </div>

      {/* Right side - Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {counters.map((count, i) => (
          <div key={i} className="p-4">
            <div className="flex justify-center">
              {String(count)
                .padStart(String(targetNumbers[i]).length, "0") // prevent jump
                .split("")
                .map((digit, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden"
                    style={{ height: "120px", width: "auto" }}
                  >
                    <div
                      className="transition-transform duration-500 ease-out"
                      style={{
                        transform: `translateY(-${parseInt(digit) * 120}px)`,
                      }}
                    >
                      {[...Array(10).keys()].map((n) => (
                        <div
                          key={n}
                          className="h-[120px] flex items-center justify-center text-[120px] font-[500] leading-none"
                        >
                          {n}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              {i === 3 && (
                <span className="text-[120px] font-[500] leading-none">+</span>
              )}
            </div>
            <p className="text-[#7d7d7d] text-[20px]">Lorem ipsum dolor</p>
          </div>
        ))}
      </div>
    </section>
  );
}
