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
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10 py-8 lg:py-6 section-padding">
          <div className="min-w-0">
            {/* lg+: 64px on a 1920px screen, shrinking in proportion on laptops */}
            <p className="text-[clamp(2rem,5.5vw,2.75rem)] lg:text-[max(1.75rem,3.33vw)] text-white font-[300] leading-[1.25]">
              The agency{" "}
              <span className="text-lwyd-yellow font-[700] italic">built</span>{" "}
              for the <br className="hidden sm:block" /> way people{" "}
              <span className="text-lwyd-yellow font-[700] italic">
                actually drink
              </span>
            </p>
          </div>
          <div className="w-full max-w-md lg:w-[max(22rem,20vw)] lg:shrink-0">
            <p className="text-white/80 text-[15px] sm:text-base lg:text-[max(15px,0.94vw)] font-[300] leading-[1.7]">
              LWYD is a creative and digital agency for the alco-bev space, working out of Bengaluru and Gurugram.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
