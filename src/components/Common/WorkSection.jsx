"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const worksData = [
  { id: 1, title: "Lorem ipsum dolor dolor", year: "2025", image: "/images/media.webp" },
  { id: 2, title: "Lorem ipsum dolor dolor", year: "2025", image: "/images/creative.webp" },
  { id: 3, title: "Lorem ipsum dolor dolor", year: "2025", image: "/images/digital.webp" },
  { id: 4, title: "Lorem ipsum dolor dolor", year: "2025", image: "/images/experience.webp" },
  { id: 5, title: "Lorem ipsum dolor dolor", year: "2025", image: "/images/social.webp" },
  { id: 6, title: "Lorem ipsum dolor dolor", year: "2025", image: "/images/video.webp" },
];

const ROW_HEIGHT = 60; // px, spacing between title rows on the left
const PEEK = 72; // px of the next image visible at the bottom of the frame
const IMAGE_GAP = 24; // px, gap between stacked work images

export default function WorkSection({ connected = false }) {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;
    const items = gsap.utils.toArray(track.children);
    const steps = items.length - 1;

    const setItemHeights = () => {
      const itemHeight = frame.getBoundingClientRect().height - PEEK;
      items.forEach((el, i) => {
        el.style.height = `${itemHeight}px`;
        el.style.marginBottom = i < items.length - 1 ? `${IMAGE_GAP}px` : "0px";
      });
      return itemHeight;
    };

    let step = setItemHeights() + IMAGE_GAP;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${steps * window.innerHeight}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          step = setItemHeights() + IMAGE_GAP;
        },
        onUpdate: (self) => {
          const raw = self.progress * steps;
          gsap.set(track, { y: -raw * step });
          const idx = Math.min(steps, Math.floor(raw + 0.0001));
          setCurrentIndex((prev) => (prev !== idx ? idx : prev));
        },
      });

      return () => st.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full ${connected ? "px-1.5 pb-1.5" : "p-1.5"}`}
    >
      <div
        className={`relative flex h-full w-full flex-col overflow-hidden ${connected ? "rounded-b-2xl" : "rounded-2xl"} bg-[#111111] text-white section-padding py-10`}
      >
        <h2 className="mb-10 text-xl font-[500] md:text-2xl">
          Lorem <span className="italic font-[750] text-lwyd-yellow">ipsum</span> dolor
        </h2>

        <div className="flex min-h-0 flex-1 items-stretch gap-10">
          {/* Left: work titles */}
          <div className="flex w-2/5 flex-col justify-end pb-4">
            <div
              className="relative overflow-hidden"
              style={{
                height: ROW_HEIGHT * 5,
                maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
              }}
            >
              <div
                className="flex flex-col transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${currentIndex * ROW_HEIGHT}px)` }}
              >
                {worksData.map((work, i) => (
                  <div key={work.id} className="flex items-end gap-2" style={{ height: ROW_HEIGHT }}>
                    <h3
                      className={`leading-none transition-all duration-500 ${
                        i === currentIndex
                          ? "text-2xl font-bold italic text-white md:text-3xl"
                          : "text-2xl font-normal text-[#7D7D7D] md:text-3xl"
                      }`}
                    >
                      {work.title}
                    </h3>
                    {i === currentIndex && (
                      <span className="translate-y-1/2 whitespace-nowrap text-xs text-[#7D7D7D]">
                        [{work.year}]
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: work images */}
          <div ref={frameRef} className="relative h-full w-3/5 overflow-hidden rounded-2xl">
            <div ref={trackRef} className="absolute inset-x-0 top-0 flex flex-col">
              {worksData.map((work) => (
                <div key={work.id} className="w-full shrink-0 overflow-hidden rounded-2xl">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
