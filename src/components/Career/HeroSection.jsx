import { useRef } from "react";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function HeroSection() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "dark");
  return (
    <div ref={sectionRef} className="relative p-1.5 rounded-2xl h-screen">
      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        <img
          src="/images/career-hero.avif"
          alt=""
          className="h-full object-cover w-full"
        />
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
        <div className="absolute inset-0 flex items-end justify-between py-6 section-padding">
          <div>
            <p className="text-[36px] sm:text-[72px] text-white font-[300]">
              Come make{" "}
              <span className="text-lwyd-yellow font-[700] italic">things</span>{" "}
              people actually <br />
              <span className="text-lwyd-yellow font-[700] italic">
                notice
              </span>
            </p>
          </div>
          <div>
            <p className="text-[#FFFFFFB2] text-base font-400 w-96">
              Join a team that ships fast and doesn't sit still.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
