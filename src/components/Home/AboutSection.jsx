"use client"

import Marquee from "react-fast-marquee"
import Button from "../ui/Button"

const logos = [
  { alt: "atlantico logo", w: 90 },
  { alt: "WBD Sport logo", w: 110 },
  { alt: "atlantico logo 2", w: 90 },
  { alt: ".raw logo", w: 70 },
  { alt: "atlantico logo 3", w: 90 },
  { alt: "generic logo", w: 80 },
]

export default function AboutSection() {
  const fade = 300 // px fade on both ends

  return (
    <section className="section-padding">
      <div
        className="relative overflow-hidden py-12"
        style={{
          maskImage: `linear-gradient(to right, transparent, black ${fade}px, black calc(100% - ${fade}px), transparent)`,
          WebkitMaskImage: `linear-gradient(to right, transparent, black ${fade}px, black calc(100% - ${fade}px), transparent)`,
        }}
      >
        <Marquee speed={40} gradient={false} pauseOnHover>
          <div className="flex items-center gap-40 pr-40">
            {Array.from({ length: 3 }).map((_, loopIdx) =>
              logos.map((l, i) => (
                <img
                  key={`${loopIdx}-${i}`}
                  src={`/icons/logo-1.png`}
                  alt={l.alt}
                  className="h-4.5 w-auto opacity-80"
                />
              )),
            )}
          </div>
        </Marquee>
      </div>

      {/* Two-column content */}
      <div className="mx-auto grid  grid-cols-1 gap-10 py-14 md:flex justify-between">
        {/* Left copy */}
        <div className="md:w-2/6 text-sm leading-6 text-[#6B7280]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur
            adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
        </div>

        {/* Right headline + CTA */}
        <div className="flex flex-col items-start gap-4 md:w-3/6">
          <h2 className="text-pretty text-3xl font-[500] leading-tight text-[#0F172A] md:text-4xl mb-7">
            Lorem <span className="italic text-lwyd-yellow font-[750]">ipsum</span> dolor dolor consectetur{" "}
            <span className="relative -mb-1 inline-flex align-middle">
              <img
                src="/images/button-img.png"
                alt=""
                className="h-10 w-16 rounded-full object-cover"
              />
            </span>
          </h2>

          <Button title={"Learn more"} />
        </div>
      </div>
    </section>
  )
}
