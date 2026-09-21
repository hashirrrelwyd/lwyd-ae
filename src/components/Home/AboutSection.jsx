"use client";

import { useRef } from "react";
import LogosMarquee from "../Common/LogosMarquee";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function AboutSection() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "light");
  return (
    <section ref={sectionRef} className="section-padding">
      <LogosMarquee />

      {/* Two-column, two-row content */}
      <div className="mx-auto flex flex-col gap-8 py-14">
        {/* Row 1: headline (left) + intro copy (right) */}
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="md:w-4/12">
            <h2 className="text-pretty text-3xl font-[500] leading-tight text-[#0F172A] md:text-4xl">
              The{" "}
              <span className="italic text-lwyd-yellow font-[750]">agency</span>{" "}
              that gets what you're actually selling{" "}
              <span className="relative -mb-1 inline-flex -translate-y-1 align-middle">
                <img
                  src="/images/button-img.png"
                  alt=""
                  className="h-8 w-16 rounded-full object-cover"
                />
              </span>
            </h2>
          </div>

          <div className="md:w-2/6 text-base font-light leading-6 text-[#6B7280]">
            <p>
              We don't bolt drinks work onto a generalist playbook. Every strategy, campaign, and platform we build starts from how this industry actually behaves - what sells at the bar, on the shelf, and everywhere in between.
            </p>
          </div>
        </div>

        {/* Row 2: small copy (left) + Learn more button, same line */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="md:w-4/12 text-base font-light leading-6 text-[#6B7280]">
            <p>
              Trusted by brands that own every point of purchase - the bar, the events floor, the retail shelf, and everything people reach for after 7pm.
            </p>
          </div>

          <div className="md:w-2/6">
            <Button title={"Learn more"} />
          </div>
        </div>
      </div>
    </section>
  );
}
