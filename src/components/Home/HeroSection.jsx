import { useRef } from "react";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function HeroSection() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "dark");
  return (
    <div ref={sectionRef} className="relative p-1.5 rounded-2xl h-screen">
      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-full object-cover w-full"
        />
        <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
        {/* Stacked on mobile/tablet; headline + copy side by side from lg */}
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10 pb-[var(--side-padding)] section-padding">
          {/* bottom padding = side padding, so the text sits the same distance from the bottom and left edges */}
          <div className="min-w-0">
            {/* lg+: 64px on a 1920px screen, shrinking in proportion on laptops */}
            <p className="hero-title text-white">
              The agency{" "}
              <span className="text-lwyd-yellow font-[700] italic">built</span>{" "}
              for the <br className="hidden sm:block" /> way people{" "}
              <span className="text-lwyd-yellow font-[700] italic">
                actually drink
              </span>
            </p>
          </div>
          <div className="w-full max-w-md lg:w-[max(22rem,20vw)] lg:shrink-0">
            <p className="hero-text text-white/80">
              LWYD is a creative and digital agency for the alco-bev space, working out of Bengaluru and Gurugram.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
