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
        <div className="absolute inset-0 flex items-end justify-between py-6 section-padding">
          <div>
            <p className="text-[36px] sm:text-[72px] text-white font-[300]">
              The agency{" "}
              <span className="text-lwyd-yellow font-[700] italic">built</span>{" "}
              for the <br /> way people{" "}
              <span className="text-lwyd-yellow font-[700] italic">
                actually drink
              </span>
            </p>
          </div>
          <div>
            <p className="text-white/70 text-base font-light w-96">
              LWYD is a creative and digital agency for the alco-bev space, working out of Bengaluru and Gurugram.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
