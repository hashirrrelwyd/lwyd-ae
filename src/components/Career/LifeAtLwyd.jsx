"use client";

import { useRef } from "react";
import Button from "../ui/Button";
import LogosMarquee from "../Common/LogosMarquee";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function LifeAtLwyd() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "light");
  return (
    <section ref={sectionRef} className="section-padding py-12">
      <div>
        <div className="x-auto grid  grid-cols-1 gap-10 pt-12 md:flex justify-between mb-12">
          {/* Left side */}
          <div className="md:w-6/12">
            <h3 className="text-[22px] font-[500] text-gray-800 mb-2">
              Life at{" "}
              <span className="text-lwyd-yellow font-[750] italic">LWYD</span>
            </h3>
          </div>
          <div className="md:w-6/12 lg:w-4/12">
            <h2 className="text-3xl md:text-4xl font-[500] mb-4">
              Lorem{" "}
              <span className="text-lwyd-yellow italic font-[750]">ipsum</span>{" "}
              dolor dolor consectetur consectetur adipiscing Lorem
            </h2>
            <Button title={"Join Us"} />
          </div>
        </div>
        {/* logos marquee component */}
        <LogosMarquee />
      </div>
    </section>
  );
}
