"use client";

import { useEffect, useRef, useState } from "react";
import { useCursor } from "../../context/CursorContext";
import { useNavigate } from "react-router-dom";

export default function DraggableMarquee({
  text = "Make It Happen with LWYD",
  speed = 1,
  highlight = "LWYD",
  chipSrc = "/images/media.webp",
  chipAlt = "Chip",
  gap = 350, // spacing between repeated text
  className = "",
}) {
  const { setHoverType } = useCursor();
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const frameRef = useRef(null);

  const navigate = useNavigate();

  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const offsetStart = useRef(0);
  const [offsetX, setOffsetX] = useState(0);

  // Split last word for highlight
  const i = text.lastIndexOf(highlight);
  const parts =
    i === -1
      ? { before: text, last: null, after: "" }
      : {
          before: text.slice(0, i),
          last: highlight,
          after: text.slice(i + highlight.length),
        };

  // Measure width of the text
  const textWidthRef = useRef(0);
  useEffect(() => {
    if (lineRef.current) {
      textWidthRef.current = lineRef.current.offsetWidth;
    }
  }, [text, highlight, chipSrc]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!dragging) {
        let newOffset = offsetX - speed;
        const totalWidth = textWidthRef.current + gap;
        if (newOffset <= -totalWidth) {
          newOffset += totalWidth;
        }
        setOffsetX(newOffset);
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [offsetX, dragging, speed, gap]);

  // Drag handlers
  const onPointerDown = (e) => {
    setDragging(true);
    dragStartX.current = e.clientX;
    offsetStart.current = offsetX;
    containerRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStartX.current;
    setOffsetX(offsetStart.current + dx);
  };

  const onPointerUp = (e) => {
    setDragging(false);
    containerRef.current.releasePointerCapture(e.pointerId);
  };

  return (
    <section
      onMouseEnter={() => setHoverType("connect")}
      onMouseLeave={() => setHoverType("default")}
      onClick={() => navigate("/contact")}
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ cursor: dragging ? "grabbing" : "grab" }}
    >
      <div
        className="flex whitespace-nowrap select-none"
        style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
      >
        {[0, 1].map((idx) => (
          <h2
            key={idx}
            ref={idx === 0 ? lineRef : null}
            className="inline-block font-[600] text-[clamp(3rem,8vw,10rem)] cursor-none"
            style={{ marginRight: `${gap}px` }}
          >
            {/* Before the image */}
            <span>Make it Happen </span>

            {/* Inline image */}
            {/* Inline image */}
            {/* Inline image */}
            <img
              src={chipSrc}
              alt={chipAlt}
              className="inline-block rounded-full mx-2"
              style={{
                height: "0.8em", // match text height
                width: "2em", // desired width
                objectFit: "cover",
                verticalAlign: "-0.1em", // push image slightly down
              }}
            />

            {/* After the image */}
            <span> with </span>

            {/* Highlighted last word */}
            {parts.last && (
              <span className="text-lwyd-yellow italic font-[750]">
                {parts.last}
              </span>
            )}
          </h2>
        ))}
      </div>
    </section>
  );
}
