"use client"

import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { useSectionTheme } from "../../hooks/useHeaderThemeSection"

const menuItems = [
  { title: "Creative Studio", link: "/service", bg: "/images/creative.webp" },
  { title: "Retail Theatre", link: "/service", bg: "/images/experience.webp" },
  { title: "Photography & Videography", link: "/service", bg: "/images/digital.webp" },
  { title: "Influencer Marketing", link: "/service", bg: "/images/media.webp" },
  { title: "Social Media Marketing", link: "/service", bg: "/images/video.webp" },
  { title: "Performance Marketing", link: "/service", bg: "/images/social.webp" },
]

export default function OurService() {
  const sectionRef = useRef(null)
  const navigate = useNavigate()
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

    // the arrow overlays the start of the pill, so slide the text right by its width
    const isPhone = window.innerWidth < 640
    const shift = arrow.parentElement.offsetWidth + (isPhone ? 4 : 10)

    gsap.set(arrow, { y: 10, opacity: 0 })
    gsap.set(text, { transformOrigin: "left center" })
    const tl = gsap.timeline({ defaults: { duration: 0.45, ease: "power3.out" } })
    tl.to(arrow, { y: 0, opacity: 1 }, 0)
      .to(
        text,
        {
          x: shift,
          // smaller zoom on phones so long titles stay inside the pill
          scale: isPhone ? 1.04 : 1.12,
          // color change + weight change
          color: "#ffffff",
          fontWeight: 400, // hover weight for the white text
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
          fontWeight: 400, // keep in sync with the title's font-[400] class
        },
        0,
      )
      .to(overlay, { opacity: 0 }, 0)
      .to(bg, { opacity: 0 }, 0)
  }

  return (
    <section ref={sectionRef} className="section-padding py-20 md:py-28">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="section-title text-pretty text-[#0F172A]">
          <span className="font-[750] italic text-lwyd-yellow">Our</span>{" "}
          <span className="relative -mb-1 inline-flex align-middle">
            <img
              src="/images/button-img.png"
              alt=""
              className="h-7 w-14 sm:h-14 sm:w-26 mb-2 rounded-full object-cover"
            />
          </span>{" "}
          Services
        </h2>

        <Button title={"View All Services"} onClick={() => navigate("/service")} />
      </div>

      {/* Grid: 1 column on mobile/tablet; 2 columns (3/3) from lg.
          grid-flow-col fills the first column top-to-bottom, then the second,
          and grid-rows-3 keeps every row the same height so pills line up. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:grid-flow-col lg:gap-x-6">
        {menuItems.map((item, i) => (
          <a
            key={item.title}
            href={item.link}
            // client-side navigation (no full page reload)
            onClick={(e) => {
              e.preventDefault()
              navigate(item.link)
            }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            onFocus={() => handleEnter(i)}
            onBlur={() => handleLeave(i)}
            className="relative group flex items-center w-full min-w-0 px-4 sm:px-7 py-4 sm:py-5 2xl:py-6 border border-[#7D7D7D1A] rounded-full overflow-hidden cursor-pointer"
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

            <div className="relative z-10 flex items-center min-w-0">
              {/* Arrow sits over the start of the pill; text slides right when it appears */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex w-6 sm:w-8 lg:w-10 justify-center">

                <ArrowUpRight ref={(el) => setArrowRef(el, i)} className="text-white w-full h-auto opacity-0" />
              </span>

              {/* Title: fluid size that follows the screen width, never wraps */}
              <span
                ref={(el) => setTextRef(el, i)}
                className="whitespace-nowrap font-[400] text-[#7D7D7D80] text-[clamp(13px,3.6vw,28px)] lg:text-[max(15px,1.98vw)] transition-none"
              >
                {(() => {
                  const words = item.title.split(" ")
                  const last = words.pop()
                  const rest = words.join(" ")
                  return (
                    <>
                      {rest && `${rest} `}
                      <span className="group-hover:text-yellow-400 group-hover:font-[650] group-hover:italic">
                        {last}
                      </span>
                    </>
                  )
                })()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
