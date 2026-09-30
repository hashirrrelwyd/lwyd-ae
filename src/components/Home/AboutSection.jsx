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

      {/* bottom padding = gap above Featured Work: ~180px on a 1920px screen (Figma), scales down on laptops */}
      <div className="mx-auto flex flex-col gap-8 pt-14 pb-20 lg:pb-[max(5rem,9vw)]">
        {/* headline (left) + intro copy and button (right) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
          <div className="lg:w-4/12">
            {/* lg+: 48px on a 1920px screen, shrinking in proportion on laptops */}
            <h2 className="section-title text-pretty text-[#0F172A]">
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

          {/* Right: intro copy with the Learn More button below it */}
          <div className="flex flex-col items-start gap-6 lg:w-[28%]">
            <p className="text-base lg:text-[max(12px,0.94vw)] font-[500] leading-[1.7] text-[#6B7280]">
              We don't bolt drinks work onto a generalist playbook. Every strategy, campaign, and platform we build starts from how this industry actually behaves - what sells at the bar, on the shelf, and everywhere in between.
            </p>
            <Button title={"Learn More"} onClick={() => navigate("/about")} />
          </div>
        </div>
      </div>
    </section>
  );
}
