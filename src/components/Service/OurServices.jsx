"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

gsap.registerPlugin(ScrollTrigger);

// the visible "window" the services scroll inside, as a fraction of the viewport height
const FRAME_VH_FRACTION = 0.7;

const services = [
  {
    title: "Creative",
    highlight: "Development",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum —",
    tags: ["Delivery & Refinement", "Design & Development", "Creative Development"],
    image: "/images/creative.webp",
  },
  {
    title: "Experience",
    highlight: "Design",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit —",
    tags: ["Research & Discovery", "Prototyping", "Experience Design"],
    image: "/images/experience.webp",
  },
  {
    title: "Digital",
    highlight: "Strategy",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur —",
    tags: ["Market Analysis", "Roadmapping", "Digital Strategy"],
    image: "/images/digital.webp",
  },
  {
    title: "Media",
    highlight: "Services",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet —",
    tags: ["Content Production", "Distribution", "Media Services"],
    image: "/images/media.webp",
  },
  {
    title: "Video",
    highlight: "Production",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum —",
    tags: ["Scripting & Storyboarding", "Filming", "Video Production"],
    image: "/images/video.webp",
  },
  {
    title: "Social Media",
    highlight: "Marketing",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit —",
    tags: ["Community Management", "Campaigns", "Social Media Marketing"],
    image: "/images/social.webp",
  },
];

export default function OurServices() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useSectionTheme(sectionRef, "light");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const slides = gsap.utils.toArray(track.children);
    const steps = slides.length - 1;
    if (steps <= 0) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${steps * window.innerHeight * FRAME_VH_FRACTION}`,
        pin: true,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const frameHeight = window.innerHeight * FRAME_VH_FRACTION;
          gsap.set(track, { y: -self.progress * steps * frameHeight });
        },
      });

      return () => st.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-center bg-[#FFFBF5] section-padding"
    >
      {/* Clipping frame: the services scroll inside this, cut off at its edges */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${FRAME_VH_FRACTION * 100}vh` }}
      >
        <div ref={trackRef} className="absolute inset-x-0 top-0">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex w-full flex-col justify-between border-b border-black/10 py-10 md:flex-row md:items-center md:gap-12"
              style={{ height: `${FRAME_VH_FRACTION * 100}vh` }}
            >
              {/* Left Content */}
              <div className="flex h-full flex-1 flex-col justify-between py-4">
                {/* Heading (Top Left) */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-[500] text-gray-900">
                    {service.title}{" "}
                    <span className="text-lwyd-yellow font-[750] italic">
                      {service.highlight}
                    </span>
                  </h2>
                </div>

                {/* Bottom Row: Description + Buttons */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  {/* Description (Bottom Left) */}
                  <p className="text-lg text-[#7D7D7D] leading-relaxed max-w-lg">
                    {service.desc}
                  </p>

                  {/* Buttons (Bottom Right) */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {service.tags.map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-2.5 rounded-full bg-[#E5E3DD]/50 text-gray-700 text-xs hover:bg-[#E5E3DD]/80 transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex h-full flex-1 justify-end py-4">
                <img
                  src={service.image}
                  alt={`${service.title} ${service.highlight}`}
                  className="h-full w-[520px] object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
