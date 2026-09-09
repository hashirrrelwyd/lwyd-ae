"use client"

import { useRef } from "react"
import Button from "../ui/Button"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { useSectionTheme } from "../../hooks/useHeaderThemeSection"

const menuItems = [
  { title: "Creative Development", link: "#", bg: "/images/creative.webp" },
  { title: "Experience Design", link: "#", bg: "/images/experience.webp" },
  { title: "Digital Strategy", link: "#", bg: "/images/digital.webp" },
  { title: "Media Services", link: "#", bg: "/images/media.webp" },
  { title: "Video Production", link: "#", bg: "/images/video.webp" },
  { title: "Social Media Marketing", link: "#", bg: "/images/social.webp" },
]

export default function OurService() {
  const sectionRef = useRef(null)
  useSectionTheme(sectionRef, "light")

  // refs to animate with GSAP per item
  const arrowRefs = useRef([])
  const textRefs = useRef([])
  const bgRefs = useRef([])
  const overlayRefs = useRef([])

  const setArrowRef = (el, i) => (arrowRefs.current[i] = el)
  const setTextRef = (el, i) => (textRefs.current[i] = el)
  const setBgRef = (el, i) => (bgRefs.current[i] = el)
  const setOverlayRef = (el, i) => (overlayRefs.current[i] = el)

  const handleEnter = (i) => {
    const arrow = arrowRefs.current[i]
    const text = textRefs.current[i]
    const bg = bgRefs.current[i]
    const overlay = overlayRefs.current[i]

    gsap.killTweensOf([arrow, text, bg, overlay])

    gsap.set(arrow, { y: 10, opacity: 0 })
    gsap.set(text, { transformOrigin: "left center" })
    const tl = gsap.timeline({ defaults: { duration: 0.45, ease: "power3.out" } })
    tl.to(arrow, { y: 0, opacity: 1 }, 0)
      .to(
        text,
        {
          x: 12,
          scale: 1.12,
          // color change + weight change
          color: "#ffffff",
          fontWeight: 400,
        },
        0,
      )
      .to(bg, { opacity: 1 }, 0)
      .to(overlay, { opacity: 0.45 }, 0)
  }

  const handleLeave = (i) => {
    const arrow = arrowRefs.current[i]
    const text = textRefs.current[i]
    const bg = bgRefs.current[i]
    const overlay = overlayRefs.current[i]

    gsap.killTweensOf([arrow, text, bg, overlay])
    const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "power2.out" } })
    tl.to(arrow, { y: 10, opacity: 0 }, 0)
      .to(
        text,
        {
          x: 0,
          scale: 1,
          color: "rgba(125,125,125,0.5)",
          fontWeight: 300,
        },
        0,
      )
      .to(overlay, { opacity: 0 }, 0)
      .to(bg, { opacity: 0 }, 0)
  }

  const left = menuItems.slice(0, 3)
  const right = menuItems.slice(3)

  return (
    <section ref={sectionRef} className="section-padding py-20 md:py-28">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-pretty text-3xl font-[500] leading-tight text-[#0F172A] md:text-4xl">
          <span className="font-[750] italic text-lwyd-yellow">Our</span>{" "}
          <span className="relative -mb-1 inline-flex align-middle">
            <img
              src="/images/button-img.png"
              alt=""
              className="h-7 w-14 sm:h-8 sm:w-16 mb-2 rounded-full object-cover"
            />
          </span>{" "}
          Service
        </h2>

        <Button title={"View All Services"} />
      </div>

      {/* Grid: Desktop 2 columns (3/3). Mobile 1 column with no vertical gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-0 md:gap-y-4">
        {/* Left column */}
        <div className="flex flex-col ">
          {left.map((item, idx) => {
            const i = idx // 0..2
            return (
              <a
                key={item.title}
                href={item.link}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
                onFocus={() => handleEnter(i)}
                onBlur={() => handleLeave(i)}
                className="relative group flex items-center w-full justify-between px-7 py-5 md:py-6 border border-[#7D7D7D1A] rounded-full overflow-hidden cursor-pointer"
              >
                {/* Background + dark overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                  <div
                    ref={(el) => setBgRef(el, i)}
                    className="absolute inset-0 bg-cover bg-center opacity-0"
                    style={{ backgroundImage: `url(${item.bg})` }}
                  />
                  <div ref={(el) => setOverlayRef(el, i)} className="absolute inset-0 bg-black opacity-0" />
                </div>

                <div className="relative z-10 flex items-center">
                  {/* Reserve space for arrow to avoid layout shift */}
                  <span className="inline-flex w-7 sm:w-8 lg:w-10 justify-center">
                    <ArrowUpRight ref={(el) => setArrowRef(el, i)} className="text-white" size={40} />
                  </span>

                  {/* Title */}
                  <span
                    ref={(el) => setTextRef(el, i)}
                    className="ml-1 font-[300] text-[#7D7D7D80] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] transition-none"
                  >
                    {item.title.split(" ")[0]}{" "}
                    <span className="group-hover:text-yellow-400 group-hover:font-[750] group-hover:italic">
                      {item.title.split(" ")[1] || ""}
                    </span>
                  </span>
                </div>
              </a>
            )
          })}
        </div>

        {/* Right column */}
        <div className="flex flex-col ">
          {right.map((item, idx) => {
            const i = 3 + idx // continue indices for refs
            return (
              <a
                key={item.title}
                href={item.link}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
                onFocus={() => handleEnter(i)}
                onBlur={() => handleLeave(i)}
                className="relative group flex items-center w-full justify-between px-7 py-5 md:py-6 border border-[#7D7D7D1A] rounded-full overflow-hidden cursor-pointer"
              >
                {/* Background + dark overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                  <div
                    ref={(el) => setBgRef(el, i)}
                    className="absolute inset-0 bg-cover bg-center opacity-0"
                    style={{ backgroundImage: `url(${item.bg})` }}
                  />
                  <div ref={(el) => setOverlayRef(el, i)} className="absolute inset-0 bg-black opacity-0" />
                </div>

                <div className="relative z-10 flex items-center">
                  <span className="inline-flex w-7 sm:w-8 lg:w-10 justify-center">
                    <ArrowUpRight ref={(el) => setArrowRef(el, i)} className="text-white" size={40} />
                  </span>

                  <span
                    ref={(el) => setTextRef(el, i)}
                    className="ml-1 font-[300] text-[#7D7D7D80] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] transition-none"
                  >
                    {item.title.split(" ")[0]}{" "}
                    <span className="group-hover:text-yellow-400 group-hover:font-[750] group-hover:italic">
                      {item.title.split(" ")[1] || ""}
                    </span>
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
