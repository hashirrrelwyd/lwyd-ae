"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

gsap.registerPlugin(ScrollTrigger);

// the visible "window" the services scroll inside, as a fraction of the viewport height
const FRAME_VH_FRACTION = 0.9; // frame height as a share of the screen (less empty space above/below)

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
  // {
  //   title: "Quick",
  //   highlight: "Adapts",
  //   desc: "Taking one key visual and adapting it fast, across every size and format it needs to exist in. ",
  //   tags: ["Scripting & Storyboarding", "Filming", "Video Production"],
  //   image: "/images/video.webp",
  // },
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
      // frame sits at the top (small padding) rather than centred, so there's only a
      // small gap between the divider above and the first service
      className="relative flex h-screen w-full flex-col items-center justify-start pt-4 lg:pt-[max(1rem,2vw)] bg-[#FFFBF5] section-padding"
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
              className="flex w-full flex-col justify-between border-b border-black/10 py-4 lg:py-[max(1rem,1.5vw)] md:flex-row md:items-center md:gap-12"
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
                {/* tags sit right after the description with a fixed gap instead of being
                    pushed to the far end: ~26px on laptops (up to 1440px wide), and more on
                    bigger screens (3.5vw: ~54px at 1536px, ~67px at 1920px, ~90px at 2560px) */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-start md:gap-[max(1.5rem,2vw)] min-[1440px]:gap-[3.5vw]">
                  {/* Description (Bottom Left) */}
                  <p className="body-text text-[#7D7D7D] max-w-lg">
                    {service.desc}
                  </p>

                  {/* Buttons (Bottom Right) */}
                  {/* Tags (Figma, 1920px frame): hug the text, padding 6px top/bottom and 16px
                      sides, 30px radius, 10px gap, #E5E3DD at 50%, ~14px text in a 30px line.
                      Scales with the screen on laptops/monitors, with minimums for small screens. */}
                  <div className="flex flex-col items-start gap-1.5 lg:gap-[max(0.25rem,0.31vw)] shrink-0">
                    {service.tags.map((tag) => (
                      <button
                        key={tag}
                        className="px-4 lg:px-[max(0.75rem,0.83vw)] py-1.5 lg:py-[max(0.25rem,0.31vw)] rounded-[30px] bg-[#E5E3DD]/50 text-[#111111] font-[400] text-[13px] lg:text-[max(12px,0.73vw)] leading-[2.1] whitespace-nowrap hover:bg-[#E5E3DD]/80 transition"
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
