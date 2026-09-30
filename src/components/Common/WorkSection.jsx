"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

gsap.registerPlugin(ScrollTrigger);

const worksData = [
  { id: 1, title: "Jameson x Bluorng", year: "2026", image: "/images/media.webp" },
  { id: 2, title: "Jameson x Gully Labs", year: "2025", image: "/images/creative.webp" },
  { id: 3, title: "Royal Challenge Packaged Drinking Water x Gully Labs", year: "2025", image: "/images/digital.webp" },
  { id: 4, title: "Don Julio x Anamika Khanna - Minis Launch Campaign", year: "2026", image: "/images/experience.webp" },
  { id: 5, title: "Grey Goose Altius x ICW", year: "2025", image: "/images/social.webp" },
];

const PEEK = 72; // px of the next image visible at the bottom of the frame
const IMAGE_GAP = 24; // px, gap between stacked work images

export default function WorkSection({ connected = false }) {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useSectionTheme(sectionRef, "dark");

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
        className={`relative flex h-full w-full overflow-hidden ${connected ? "rounded-b-2xl" : "rounded-2xl"} bg-[#111111] text-white section-padding py-10`}
      >
        {/* Stacked on mobile (titles above image); side by side from md */}
        <div className="flex min-h-0 flex-1 flex-col md:flex-row items-stretch gap-6 md:gap-10">
          {/* Left: title (top) + work titles (bottom) */}
          <div className="flex min-w-0 flex-col gap-6 md:flex-1">
            <h2 className="text-xl font-[500] md:text-2xl">
              Featured <span className="italic font-[750] text-lwyd-yellow">Work</span>
            </h2>

            {/* All titles stay in place; the one matching the current image is highlighted.
                mt-auto pushes the list to the bottom of the column, level with the image's bottom */}
            <div className="flex flex-col gap-5 md:gap-[max(1.25rem,2.2vw)] md:mt-auto">
              {worksData.map((work, i) => {
                const active = i === currentIndex;
                return (
                  <h3
                    key={work.id}
                    // max-w in ch: long titles wrap onto 2 lines instead of running full width
                    className={`max-w-[30ch] leading-snug transition-colors duration-500 text-[clamp(16px,4.5vw,20px)] md:text-[max(16px,1.67vw)] ${
                      active ? "font-bold italic text-white" : "font-normal text-[#7D7D7D]"
                    }`}
                  >
                    {work.title}
                    {/* year shows only on the selected title; inline, so it follows the last word even when the title wraps */}
                    {active && (
                      <span className="ml-2 whitespace-nowrap font-normal not-italic text-[max(12px,0.75rem)] text-[#BDBDBD]">
                        [{work.year}]
                      </span>
                    )}
                  </h3>
                );
              })}
            </div>
          </div>

          {/* Right: work images */}
          {/* mobile: fills the remaining height; md+: square, capped so titles keep room */}
          <div ref={frameRef} className="relative min-h-0 w-full flex-1 overflow-hidden rounded-2xl md:flex-none md:aspect-square md:h-full md:w-auto md:max-w-[55%] md:shrink-0">
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
