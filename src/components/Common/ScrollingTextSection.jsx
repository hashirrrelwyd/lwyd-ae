"use client"

import { useLayoutEffect, useMemo, useRef } from "react"

/**
 * ScrollingTextSection
 * - Section starts blank, then a huge sentence slides from right → left as you scroll
 * - Reverse the motion when scrolling back up (scroll-attached)
 * - No external deps; uses rAF for 60fps and will-change: transform
 *
 * Props:
 *  - text: string (the sentence to scroll; should end with "LWYD" if you want the highlight)
 *  - heightVh: number (how tall the scroll experience is, in viewport heights; keep the visible area one screen tall)
 *  - bottomOffsetPx: number (how far above the bottom the line sits, in px)
 *  - highlight: string (the word to highlight and to center at the end)
 *  - chipSrc: string (optional circular photo chip rendered inline at the end; matched to text height (1em))
 *  - chipAlt: string (alt text for the optional photo chip)
 *  - className: extra classes for the outer section
 */
export default function ScrollingTextSection({
  text = "Make It Happen with LWYD",
  heightVh = 60,
  bottomOffsetPx = 360,
  highlight = "LWYD",
  chipSrc,
  chipAlt = "Chip",
  className = "",
}) {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const lineRef = useRef(null)
  const lastWordRef = useRef(null)
  const frameRef = useRef(0)

  // Split once so we can wrap the last word
  const parts = useMemo(() => {
    const i = text.lastIndexOf(highlight)
    if (i === -1) return { before: text, last: null, after: "" }
    return {
      before: text.slice(0, i),
      last: highlight,
      after: text.slice(i + highlight.length),
    }
  }, [text, highlight])

  const clamp = (n, min, max) => Math.max(min, Math.min(n, max))
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current
    const lineEl = lineRef.current
    const lastEl = lastWordRef.current
    if (!sectionEl || !lineEl) return

    let start = 0
    let sectionH = 0
    let viewport = 0
    let textW = 0
    let targetX = 0
    let lastP = 0 // smoothed progress

    const measure = () => {
      const rect = sectionEl.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      start = rect.top + scrollTop
      sectionH = sectionEl.offsetHeight
      viewport = window.innerHeight
      textW = lineEl.scrollWidth

      // Compute where the last word should land centered.
      // If we don't find the last word span, center the end of the line instead.
      const lastCenterAtX0 = lastEl ? lastEl.offsetLeft + lastEl.offsetWidth / 2 : textW

      targetX = window.innerWidth / 2 - lastCenterAtX0
    }

    // We use a viewport-based trigger so animation starts as soon as the section approaches
    // and ends just after it passes, even if section height ≈ viewport height.
    const progressFromScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop
      const startTrigger = start - viewport // top of section hits bottom of viewport
      const endTrigger = start + sectionH // bottom of section hits top of viewport
      return clamp((scrollY - startTrigger) / Math.max(1, endTrigger - startTrigger), 0, 1)
    }

    const smooth = 0.12 // higher = smoother and slower
    const update = () => {
      frameRef.current = 0

      // Reduced motion: snap to end center
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        lineEl.style.transform = `translate3d(${targetX}px,0,0)`
        return
      }

      const raw = progressFromScroll()
      const p = lastP + (raw - lastP) * smooth
      lastP = p
      const eased = easeInOut(p)

      // Begin off-screen right (110vw) and end exactly at the computed center position for the last word.
      const fromX = window.innerWidth * 1.1
      const x = fromX + (targetX - fromX) * eased

      lineEl.style.transform = `translate3d(${x}px,0,0)`
    }

    const onScroll = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [parts.before, parts.after, parts.last])

  return (
    <section
      ref={sectionRef}
      className={`relative ${className} `}
      style={{ height: `${heightVh}vh` }}
      aria-label="Scrolling text section"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex items-end bg-transparent"
        style={{ paddingBottom: bottomOffsetPx }}
      >
        <h2
          ref={lineRef}
          className="whitespace-nowrap font-[600] leading-none will-change-transform px-6 text-black text-[clamp(5rem,10vw,15rem)]"
          style={{ transform: "translate3d(110vw,0,0)" }}
        >
          {/* Before highlight */}
          <span>{parts.before}</span>
          {/* Highlighted last word (center target) */}
          {parts.last && (
            <span ref={lastWordRef} className="text-lwyd-yellow italic font-[750]">
              {parts.last}
            </span>
          )}
          {/* After highlight (if any) */}
          <span>{parts.after}</span>
          {/* Optional inline circular photo chip */}
          {chipSrc ? (
            <img
              src={chipSrc || "/placeholder.svg"}
              alt={chipAlt}
              aria-hidden="true"
              className="inline-block rounded-full align-[.05em] ml-[0.35em] select-none"
              style={{
                height: "1em",
                width: "1em",
                objectFit: "cover",
              }}
            />
          ) : null}
        </h2>
      </div>
    </section>
  )
}
