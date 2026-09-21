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
      <h2 className="text-pretty text-[36px] sm:text-[72px] font-[500] leading-tight text-[#0F172A] mb-7">
        Proof, not {" "}
        <span className="italic text-lwyd-yellow font-[750]">promises</span>{" "}
        <span className="relative -mb-1 inline-flex align-middle">
          <img
            src="/images/button-img.png"
            alt=""
            className="h-10 w-20 sm:h-16 sm:w-28 rounded-full object-cover"
          />
        </span>
      </h2>
    </div>

    {/* Right - Paragraph */}
    <div className="
      mt-6                       /* mobile: normal stacked flow */
      md:mt-0 md:flex md:items-end md:justify-end /* desktop: bottom-right */
      text-base font-light leading-6 text-[#6B7280]
    ">
      <p className="max-w-xs">
        A running look at what we've actually shipped - shot, produced, and put out into the world.
      </p>
    </div>
  </div>
</section>

  );
}
