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
 * - After the last card, a centered CTA button appears and stays during the pin
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
      title: "Project Inquiry",
      desc: "Tell us about your project goals, timeline, and budget.",
      img: "/images/creative.webp",
    },
    {
      id: "c2",
      title: "Partnerships",
      desc: "We collaborate with teams to ship ambitious products.",
      img: "/images/digital.webp",
    },
    {
      id: "c3",
      title: "Support",
      desc: "Need help with your existing product? We’ve got you.",
      img: "/images/media.webp",
    },
    {
      id: "c4",
      title: "Careers",
      desc: "Join a team that values craft and impact.",
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

      // CTA hidden initially
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { autoAlpha: 0 });
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

      // Button fades in right after last card leaves
      if (ctaRef.current) {
        tl.to(ctaRef.current, { autoAlpha: 1, duration: 1 }, "-=1.5");
      }
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
      className="relative min-h-[100svh] w-full overflow-hidden bg-background"
    >
      {/* Cards stack (GSAP positions these absolutely and pins the section) */}
      <div className="relative mx-auto h-[100svh] w-full max-w-4xl">
        {items.map((item, i) => {
          const variant = i % 3; // 0: black, 1: yellow, 2: white
          const wrapperBg =
            variant === 0
              ? "bg-black"
              : variant === 1
              ? "bg-[#ffcc00]"
              : "bg-white";
          const headingColor = variant === 0 ? "text-white" : "text-black";
          const paragraphColor =
            variant === 0 ? "text-neutral-200" : "text-neutral-700";

          return (
            <article
              key={item.id}
              ref={(el) => setCardRef(el, i)}
              className="group/card pointer-events-auto w-[350px] max-w-md select-none rounded-[16px]"
            >
              {/* Inner wrapper gets the hover lift so GSAP transforms on outer don't conflict */}
              <div
                tabIndex={0}
                className={`rounded-[16px] ${wrapperBg}  outline-none transition-transform duration-200 ease-out focus:-translate-y-2`}
              >
                <div
                  className={`overflow-hidden rounded-t-2xl flex justify-center items-center`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      item.img ||
                      "/placeholder.svg?height=224&width=400&query=contact%20card"
                    }
                    alt=""
                    className="h-36 my-10 w-40 object-cover rounded-[16px]"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="space-y-1.5 p-5 flex flex-col justify-center items-center">
                  <h3
                    className={`font-sans text-lg font-semibold ${headingColor}`}
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

        {/* Center CTA (reveals after cards animate) */}
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
