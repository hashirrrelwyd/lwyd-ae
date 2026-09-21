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
    highlight: "Studio",
    desc: "Key visuals and core creative that anchor a campaign, before it's adapted anywhere else.",
    tags: ["Branding", "Visual Identity", "Creative Direction"],
    image: "/images/creative.webp",
  },
  {
    title: "Retail",
    highlight: "Theate",
    desc: "In-store promotions that turn shelf space into stopping power.",
    tags: ["Research & Discovery", "Prototyping", "Experience Design"],
    image: "/images/experience.webp",
  },
  {
    title: "Print &",
    highlight: "Production",
    desc: "Physical production handled end-to-end, from press-ready files to what actually ships.",
    tags: ["Print Design", "Packaging", "Production Management"],
    image: "/images/digital.webp",
  },
  {
    title: "Experiential",
    highlight: "",
    desc: "Third-space design, build, and event management for experiences that live off-screen. ",
    tags: ["Experiential Design", "Event Management", "Installation"],
    image: "/images/media.webp",
  },
  {
    title: "Quick",
    highlight: "Adapts",
    desc: "Taking one key visual and adapting it fast, across every size and format it needs to exist in. ",
    tags: ["Scripting & Storyboarding", "Filming", "Video Production"],
    image: "/images/video.webp",
  },
  {
    title: "Social Media",
    highlight: "Marketing",
    desc: "Always-on content and community management, built for how people actually scroll.",
    tags: ["Content Creation", "Community Management", "Social Media Strategy"],
    image: "/images/social.webp",
  },
  {
    title: "Performance",
    highlight: "Marketing",
    desc: "Paid media planned and optimised to convert, not just impress. ",
    tags: ["Paid Media Strategy", "Campaign Management", "Analytics & Reporting"],
    image: "/images/social.webp",
  },
  {
    title: "Influencer",
    highlight: "Marketing",
    desc: "Creator partnerships that read as culture, not placement.",
    tags: ["Influencer Strategy", "Creator Partnerships", "Campaign Management"],
    image: "/images/social.webp",
  },
  {
    title: "Brand to Brand",
    highlight: "Collaborations",
    desc: "Partnerships that make two brands bigger together than either would be alone. ",
    tags: ["Co-Branding", "Collaborative Campaigns", "Strategic Partnerships"],
    image: "/images/social.webp",
  },
  {
    title: "Photography &",
    highlight: "Videography",
    desc: "Original shoots - product, lifestyle, and everything in between. ",
    tags: ["Product Photography", "Lifestyle Photography", "Videography"],
    image: "/images/social.webp",
  },
  {
    title: "Concept",
    highlight: "Videos",
    desc: "Short-form video built around one strong idea, start to finish. ",
    tags: ["Concept Development", "Scripting & Storyboarding", "Video Production"],
    image: "/images/social.webp",
  },
  {
    title: "Event",
    highlight: "Coverage",
    desc: "On-ground documentation that captures an event as it actually happened. ",
    tags: ["Event Photography", "Event Videography", "Live Streaming"],
    image: "/images/social.webp",
  },
  {
    title: "CGI /",
    highlight: "AI Videos",
    desc: "Computer-generated and AI-assisted video for work that doesn't need a physical shoot.",
    tags: ["3D Animation", "Motion Graphics", "AI Video Generation"],
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
