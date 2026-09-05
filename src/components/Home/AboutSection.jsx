"use client";

import LogosMarquee from "../Common/LogosMarquee";
import Button from "../ui/Button";

export default function AboutSection() {
  return (
    <section className="section-padding">
      <LogosMarquee />

      {/* Two-column content */}
      <div className="mx-auto grid  grid-cols-1 gap-10 py-14 md:flex justify-between">
        {/* Left copy */}
        <div className="md:w-2/6 text-sm font-light leading-6 text-[#6B7280]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
            ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit
            amet, consectetur adipiscing elit,
          </p>
        </div>

        {/* Right headline + CTA */}
        <div className="flex flex-col items-start gap-4 md:w-4/12">
          <h2 className="text-pretty text-3xl font-[500] leading-tight text-[#0F172A] md:text-4xl mb-7">
            Lorem{" "}
            <span className="italic text-lwyd-yellow font-[750]">ipsum</span>{" "}
            dolor dolor consectetur{" "}
            <span className="relative -mb-1 inline-flex -translate-y-1 align-middle">
              <img
                src="/images/button-img.png"
                alt=""
                className="h-8 w-16 rounded-full object-cover"
              />
            </span>
          </h2>

          <Button title={"Learn more"} />
        </div>
      </div>
    </section>
  );
}
