import { useRef } from "react";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function HeroSection() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "light");
  return (
    <section ref={sectionRef} className="relative mx-auto section-padding mt-24 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[150px]">
    {/* Left - Heading */}
    <div className="flex items-start justify-start">
      <h2 className="hero-title text-pretty text-[#0F172A] mb-7">
        Proof, not {" "}
        <span className="italic text-lwyd-yellow font-[700]">promises</span>{" "}
        <span className="relative -mb-1 inline-flex align-middle">
          {/* sized in em so the chip scales with the title */}
          <img
            src="/images/button-img.png"
            alt=""
            className="h-[0.9em] w-[1.6em] rounded-full object-cover"
          />
        </span>
      </h2>
    </div>

    {/* Right - Paragraph */}
    <div className="
      mt-6                       /* mobile: normal stacked flow */
      md:mt-0 md:flex md:items-end md:justify-end /* desktop: bottom-right */
      text-[#6B7280]
    ">
      <p className="hero-text max-w-xs">
        A running look at what we've actually shipped - shot, produced, and put out into the world.
      </p>
    </div>
  </div>
</section>

  );
}
