"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: "c1",
    titleLeft: "12 Days",
    titleRight: "Holiday",
    img: "/images/digital.webp",
  },
  {
    id: "c2",
    titleLeft: "5 Days",
    titleRight: "Work From Home",
    img: "/images/media.webp",
  },
  {
    id: "c3",
    titleLeft: "Team",
    titleRight: "Outing",
    img: "/images/creative.webp",
  },
];

export default function Culture() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const leftTitleRef = useRef([]);
  const rightTitleRef = useRef([]);
  cardsRef.current = [];
  leftTitleRef.current = [];
  rightTitleRef.current = [];

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const leftTitles = leftTitleRef.current.filter(Boolean);
      const rightTitles = rightTitleRef.current.filter(Boolean);
      const total = cards.length;

      // Setup stacking
      cards.forEach((el, i) => {
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          position: "absolute",
          zIndex: total - i,
          scale: 1 - i * 0.05,
        });
      });

      // Setup initial titles
      leftTitles.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
      rightTitles.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + total * 600,
          pin: true,
          scrub: 1.2,
        },
      });

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            y: "-120vh",
            duration: 2,
          },
          i === 0 ? 0 : "-=1.5"
        );

        if (i < total - 1) {
          // Fade out current titles
          tl.to([leftTitles[i], rightTitles[i]], { autoAlpha: 0, duration: 0.5 }, "-=1");

          // Fade in next titles
          tl.to([leftTitles[i + 1], rightTitles[i + 1]], { autoAlpha: 1, duration: 0.5 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Image + Titles grouped together */}
      <div className="relative mx-auto h-[100svh] w-full max-w-3xl flex items-center justify-center">
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="pointer-events-none"
          >
            <div className="relative flex items-center gap-6">
              {/* Left title */}
              <div
                ref={(el) => (leftTitleRef.current[i] = el)}
                className="text-3xl md:text-5xl font-bold absolute right-full mr-6"
              >
                {item.titleLeft}
              </div>

              {/* Image */}
              <img
                src={item.img}
                alt={item.titleLeft}
                className="h-[400px] w-[300px] object-cover rounded-2xl shadow-lg"
              />

              {/* Right title */}
              <div
                ref={(el) => (rightTitleRef.current[i] = el)}
                className="text-3xl md:text-5xl font-bold absolute left-full ml-6"
              >
                {item.titleRight}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
