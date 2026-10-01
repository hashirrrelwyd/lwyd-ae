import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ScrollCards({Data}) {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });

  // Progress bar: stays anchored on the left and fills towards the right as you scroll,
  // starting at ~29% of the track (as in Figma) and reaching 100% at the last card
  const START_SHARE = 0.29; // filled share of the track before scrolling (Figma)
  const fillWidth = useTransform(
    scrollXProgress,
    (p) => `${(START_SHARE + p * (1 - START_SHARE)) * 100}%`
  );

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Drag to Scroll Logic
  const handlePointerDown = (e) => {
    isDragging.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.clientX;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    ref.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      ref.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);
  return (
    <>
      {/* Native Scrollable Container with Drag Support */}
      <div ref={scrollRef} className="overflow-x-auto no-scrollbar select-none">
        <div className="flex gap-6 lg:gap-8 pb-[max(1.5rem,2.2vw)]" style={{ minWidth: "max-content" }}>
          {Data.map((item, index) => (
            // Card width (as in Figma): 3 cards fill the row on laptops/monitors, 2 on tablets,
            // one mostly-visible card on phones; the rest scroll. The 28px accounts for the
            // dark section's outer margin and the page scrollbar.
            // @container: everything inside is sized relative to the card (cqw / %), so the
            // number, circles and text all scale together with the card.
            <div
              key={index}
              className="@container relative flex-shrink-0 aspect-[578/600] w-[80vw] md:w-[calc((100vw-2*var(--side-padding)-1.5rem-28px)/2)] lg:w-[calc((100vw-2*var(--side-padding)-4rem-28px)/3)] bg-[#212121] rounded-2xl overflow-hidden"
            >
              {/* Big faded number (~150px on a 578px card). As in Figma it runs past the
                  card's top-left corner: the "0" is partly cut off and the tops of the digits too */}
              <span className="absolute left-[-8.6cqw] top-[-9.3cqw] text-[26cqw] leading-none font-[500] text-white/20">
                0{index + 1}
              </span>

              {/* Dashed circles, centred just outside the top corner (left on odd cards,
                  right on even), measured from Figma. top % is of the card height. */}
              {/* Outer circle: radius ~56% of the card width */}
              <span
                className={`absolute w-[112%] aspect-square border border-dashed border-white/15 rounded-full
                        ${
                          index % 2 === 0
                            ? "left-[-58%] top-[-59.7%]"
                            : "right-[-58%] top-[-59.7%]"
                        }`}
              ></span>
              {/* Inner circle: radius ~30% of the card width */}
              <span
                className={`absolute w-[60%] aspect-square border border-dashed border-white/15 rounded-full
                        ${
                          index % 2 === 0
                            ? "left-[-29.5%] top-[-34.2%]"
                            : "right-[-29.5%] top-[-34.2%]"
                        }`}
              ></span>

              {/* Content */}
              {/* Content: ~24px title and ~18px copy on a 578px card */}
              <div className="absolute bottom-[7cqw] left-[5.5cqw] right-[5.5cqw]">
                <h3 className="text-[max(18px,4.2cqw)] font-[400] text-white mb-[max(0.75rem,5cqw)]">
                  {item.title}
                </h3>
                <p className="text-[max(13px,3.1cqw)] text-[#9C9C9C] leading-[1.65]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator: grey track with a yellow bar that fills left to right as you scroll */}
      <div className="relative mb-4 h-[2px] w-full bg-white/15">
        <motion.div
          className="absolute inset-y-0 left-0 bg-lwyd-yellow"
          style={{ width: fillWidth }}
        />
      </div>
    </>
  );
}
