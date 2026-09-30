"use client";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogosMarquee from "../Common/LogosMarquee";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  useSectionTheme(sectionRef, "light");
  return (
    <section ref={sectionRef} className="section-padding">
      <LogosMarquee />

      {/* Two-column, two-row content */}
      <div className="mx-auto flex flex-col gap-8 py-14">
        {/* Row 1: headline (left) + intro copy (right) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
          <div className="lg:w-4/12">
            {/* lg+: 48px on a 1920px screen, shrinking in proportion on laptops */}
            <h2 className="text-pretty text-[clamp(1.75rem,6vw,2.5rem)] lg:text-[max(1.5rem,2.5vw)] font-[500] leading-tight text-[#0F172A]">
              The{" "}
              <span className="italic text-lwyd-yellow font-[700]">agency</span>{" "}
              that gets what you're actually selling{" "}
              <span className="relative -mb-1 inline-flex -translate-y-1 align-middle">
                {/* sized in em so the chip scales with the heading */}
                <img
                  src="/images/button-img.png"
                  alt=""
                  className="h-[1.15em] w-[1.85em] rounded-full object-cover"
                />
              </span>
            </h2>
          </div>

          <div className="lg:w-2/6 text-base lg:text-[max(12px,0.94vw)] font-[500] leading-[1.7] text-[#6B7280]">
            <p>
              We don't bolt drinks work onto a generalist playbook. Every strategy, campaign, and platform we build starts from how this industry actually behaves - what sells at the bar, on the shelf, and everywhere in between.
            </p>
          </div>
        </div>

        {/* Row 2: small copy (left) + Learn more button, same line */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="lg:w-4/12 text-[15px] lg:text-base font-[400] leading-[1.7] text-[#6B7280]">
            <p>
              Trusted by brands that own every point of purchase - the bar, the events floor, the retail shelf, and everything people reach for after 7pm.
            </p>
          </div>

          <div className="lg:w-2/6 text-base font-[400]">
            <Button title={"Learn More"} onClick={() => navigate("/about")} />
          </div>
        </div>
      </div>
    </section>
  );
}
