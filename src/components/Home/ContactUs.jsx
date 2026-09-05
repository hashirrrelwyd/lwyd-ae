"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * ContactUs
 * - Pinned scrolly section
 * - Cards start stacked with slight rotations
 * - Scroll animates cards one-by-one upward (revealing the next)
 * - Hover lifts individual card slightly
 * - A centered CTA button sits behind the stack the whole time, revealed once the cards fly away
 *
 * Add or remove cards by editing the `items` array below.
 */
export default function ContactUs(props) {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const items = [
    {
      id: "c1",
      title: (
        <>
          Slide into our <span className="text-[#FFCC00] font-bold italic">DMs</span>
        </>
      ),
      desc: "Drop us a line. Tell us your wildest ideas, your biggest challenges, or just say “hi.”",
      img: "/images/creative.webp",
    },
    {
      id: "c2",
      title: (
        <>
          We cook up <span className="text-white font-bold italic">something</span> spicy.
        </>
      ),
      desc: "Our brains + your brand = sparks flying. We’ll brew a strategy that’s bold, smart, and a little bit rebellious.",
      img: "/images/digital.webp",
    },
    {
      id: "c3",
      title: (
        <>
          Launch. <span className="text-[#FFCC00] font-bold italic">Loud</span>. Together.
        </>
      ),
      desc: "We don’t just deliver—we create noise, impact, and results that turn heads.",
      img: "/images/media.webp",
    },
    {
      id: "c4",
      title: (
        <>
          Let’s cause a little <span className="text-[#FFCC00] font-bold italic">chaos</span>
        </>
      ),
      desc: "No boring emails. Just real talk about your next big move.",
      img: "/images/social.webp",
    },
  ];

  // slight rotations for stacked look; repeats if more cards
  const baseRotations = [-6, 4, -2, 5];

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const total = cards.length;

      // Initial stacked setup
      cards.forEach((el, i) => {
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          position: "absolute",
          zIndex: total - i,
          rotation: baseRotations[i % baseRotations.length],
          transformOrigin: "50% 50%",
          willChange: "transform",
        });
      });

      // CTA sits behind the cards from the start (lower z-index), revealed as cards fly away
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { autoAlpha: 1, zIndex: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + (total + 1) * 500, // enough space for all cards + button
          pin: true,
          scrub: 1.2,
        },
        defaults: { ease: "power1.inOut" },
      });

      // Each card leaves, next card follows immediately (overlap with "-=duration*0.8")
      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            y: "-100vh", // move out of screen
            rotation: i % 2 === 0 ? 60 : -60, // slow spin
            scale: 0.95,
            duration: 3, // smoother + slower
          },
          i === 0 ? 0 : "-=2" // overlap animations so next card follows closely
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el, i) => {
    cardsRef.current[i] = el;
  };

  return (
    <section
      ref={containerRef}
      aria-label="Contact Us"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Cards stack (GSAP positions these absolutely and pins the section) */}
      <div className="relative mx-auto h-full w-full max-w-4xl">
        {items.map((item, i) => {
          const variant = i % 3; // 0: black, 1: yellow, 2: white
          const wrapperBg =
            variant === 0
              ? "bg-black"
              : variant === 1
              ? "bg-[#FFD34E]"
              : "bg-white";
          const headingColor = variant === 0 ? "text-white" : "text-[#111111]";
          const paragraphColor =
            variant === 1 ? "text-[#111111]/60" : "text-[#7D7D7D]";
          const borderClass = variant === 2 ? "border border-black/10" : "";

          return (
            <article
              key={item.id}
              ref={(el) => setCardRef(el, i)}
              className="group/card pointer-events-auto aspect-square w-[440px] max-w-[90vw] select-none rounded-[20px]"
            >
              {/* Inner wrapper gets the hover lift so GSAP transforms on outer don't conflict */}
              <div
                tabIndex={0}
                className={`flex h-full w-full flex-col items-center justify-center gap-8 rounded-[20px] ${wrapperBg} ${borderClass} p-12 outline-none transition-transform duration-200 ease-out focus:-translate-y-2`}
              >
                <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-[20px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      item.img ||
                      "/placeholder.svg?height=224&width=400&query=contact%20card"
                    }
                    alt=""
                    className="h-44 w-44 object-cover rounded-[20px]"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <h3
                    className={`font-sans text-2xl font-normal ${headingColor}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`font-sans text-center text-sm leading-relaxed ${paragraphColor}`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          );
        })}

        {/* Center CTA, sits behind the card stack (lower z-index) */}
        <div
          ref={ctaRef}
          className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Button
            title="Ready to cause a little chaos?"
            onClick={props.onCtaClick}
          />
        </div>
      </div>
    </section>
  );
}
