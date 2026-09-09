"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: "c1",
    titleLeft: "Flexible",
    titleRight: "Work Hours",
    img: "/images/experience.webp",
  },
  {
    id: "c2",
    titleLeft: "Unlimited",
    titleRight: "Snacks & Coffee",
    img: "/images/video.webp",
  },
  {
    id: "c3",
    titleLeft: "Weekly",
    titleRight: "Game Nights",
    img: "/images/social.webp",
  },
];

const ROW_HEIGHT = 110; // px, height of the title-roll container
// fluid sizing so the layout keeps fitting (and text never clips) across viewport widths,
// instead of a single width tuned only for large desktop screens
const COLUMN_WIDTH = "clamp(150px, 27vw, 450px)"; // equal width for both title columns, keeps the image centered
const TITLE_GAP = "clamp(12px, 2.5vw, 32px)"; // space between each title column and the image
const TITLE_FONT_SIZE = "clamp(1.25rem, 3.2vw, 3.75rem)";
const SCALE_STEP = 0.2; // each card behind the current one is this much smaller (10 / 8 / 6 ...)
const Y_STEP_PERCENT = 15; // nudges smaller cards down so there's a visible gap before the next one
const EXIT_Y_PERCENT = 100; // how far the current card slides up as it exits (100 = exactly its own height, fully clear)
const MAX_DEPTH = 2; // how many stack positions back get a distinct (non-zero) scale step
const PEEK_FRACTION = 0.24; // the peek/gap reserve stays proportional to the card size at every screen size

// current (front) card height per device category — the 620px desktop size is unchanged,
// smaller categories get their own size instead of desktop's fixed value overflowing them
function getCardHeightForWidth(width) {
  let base;
  if (width < 480) base = 360;
  else if (width < 640) base = 420;
  else if (width < 768) base = 460;
  else if (width < 1024) base = 500;
  else if (width < 1280) base = 560;
  else base = 620;
  // safety cap: never let the card (plus its peek reserve) exceed the actual viewport height
  const maxByViewportHeight = (window.innerHeight * 0.72) / (1 + PEEK_FRACTION);
  return Math.round(Math.min(base, maxByViewportHeight));
}

export default function Culture() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(() =>
    typeof window !== "undefined" ? getCardHeightForWidth(window.innerWidth) : 620
  );

  useSectionTheme(sectionRef, "light");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cards = gsap.utils.toArray(track.children);
    const steps = cards.length - 1;
    if (steps <= 0) return;

    const applyProgress = (progress) => {
      const raw = progress * steps;

      cards.forEach((card, i) => {
        const depth = i - raw; // 0 = current/front, >0 = waiting behind, <0 = already exiting

        let scale;
        let yPercent;
        if (depth >= 0) {
          const capped = Math.min(depth, MAX_DEPTH);
          scale = 1 - SCALE_STEP * capped;
          yPercent = Y_STEP_PERCENT * capped;
        } else {
          // becomes/stays the front card, then slides up and out on its own turn
          scale = 1;
          yPercent = EXIT_Y_PERCENT * depth;
        }
        gsap.set(card, {
          scale,
          yPercent,
          zIndex: Math.round((10 - depth) * 100),
        });
      });

      // switch as soon as the next image becomes the more-visible one (past the halfway point
      // of the transition), instead of waiting for it to fully finish arriving
      const idx = Math.min(steps, Math.round(raw));
      setCurrentIndex((prev) => (prev !== idx ? idx : prev));
    };

    // set the correct stacking immediately, don't wait for the first scroll-driven onUpdate
    applyProgress(0);

    const onResize = () => setCardHeight(getCardHeightForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${steps * window.innerHeight * 0.6}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => applyProgress(self.progress),
      });

      return () => st.kill();
    }, section);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const peek = Math.round(cardHeight * PEEK_FRACTION);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden section-padding"
    >
      <div
        className="relative flex w-full flex-col items-center sm:flex-row sm:items-start sm:justify-center"
        style={{ gap: TITLE_GAP }}
      >
        {/* Mobile only: both titles together, above the image (sides don't fit next to it on a narrow screen) */}
        <div
          className="w-full overflow-hidden sm:hidden"
          style={{ height: ROW_HEIGHT }}
        >
          <div
            className="flex flex-col transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${currentIndex * ROW_HEIGHT}px)` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center gap-2 whitespace-nowrap text-2xl"
                style={{ height: ROW_HEIGHT }}
              >
                <span className="font-[800] italic text-[#FFCC00]">
                  {item.titleLeft}
                </span>
                <span className="font-[400] text-black">{item.titleRight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Left title roll, vertically centered on the current image (not the taller stack frame) */}
        <div
          className="hidden shrink-0 overflow-hidden text-right sm:block"
          style={{
            height: ROW_HEIGHT,
            width: COLUMN_WIDTH,
            marginTop: Math.max(0, (cardHeight - ROW_HEIGHT) / 2),
          }}
        >
          <div
            className="flex flex-col transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${currentIndex * ROW_HEIGHT}px)` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-end whitespace-nowrap font-[800] italic text-[#FFCC00]"
                style={{ height: ROW_HEIGHT, fontSize: TITLE_FONT_SIZE }}
              >
                {item.titleLeft}
              </div>
            ))}
          </div>
        </div>

        {/* Image stack: current one full size, each behind it progressively smaller, peeking below.
            Full width on mobile (just the page margin from section-padding); a fixed size per
            device category from sm and up, capped so it never overflows the viewport height. */}
        <div
          className="relative w-full shrink-0 overflow-hidden rounded-2xl sm:w-[300px] md:w-[340px] lg:w-[380px] xl:w-[440px]"
          style={{ height: cardHeight + peek }}
        >
          <div ref={trackRef} className="relative h-full w-full">
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute inset-x-0 top-0 overflow-hidden rounded-2xl"
                style={{ height: cardHeight }}
              >
                <img
                  src={item.img}
                  alt={`${item.titleLeft} ${item.titleRight}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right title roll, vertically centered on the current image (not the taller stack frame) */}
        <div
          className="hidden shrink-0 overflow-hidden text-left sm:block"
          style={{
            height: ROW_HEIGHT,
            width: COLUMN_WIDTH,
            marginTop: Math.max(0, (cardHeight - ROW_HEIGHT) / 2),
          }}
        >
          <div
            className="flex flex-col transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${currentIndex * ROW_HEIGHT}px)` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center whitespace-nowrap font-[400] text-black"
                style={{ height: ROW_HEIGHT, fontSize: TITLE_FONT_SIZE }}
              >
                {item.titleRight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
