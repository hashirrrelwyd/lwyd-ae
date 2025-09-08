import { motion, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ScrollCards({Data}) {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });

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
        <div className="flex gap-8 pb-8" style={{ minWidth: "max-content" }}>
          {Data.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[380px] md:w-[400px] h-[400px] 2xl:w-[450px] 2xl:h-[440px] bg-[#1A1A1A] rounded-2xl overflow-hidden"
            >
              {/* Big faded number in background */}
              <span className="absolute left-[-0.8rem] top-[-2.9rem] text-[100px] font-[500] text-white/20">
                0{index + 1}
              </span>

              {/* 2nd Dashed circle */}
              <span
                className={`absolute w-[450px] h-[450px] border-2 border-dashed border-white/10 rounded-full 
                        ${
                          index % 2 === 0
                            ? "left-[-230px] top-[-240px]"
                            : "right-[-15rem] top-[-15rem]"
                        }`}
              ></span>
              {/* 1st Dashed circle */}
              <span
                className={`absolute w-[260px] h-[260px] border-2 border-dashed border-white/10 rounded-full 
                        ${
                          index % 2 === 0
                            ? "left-[-120px] top-[-121px]"
                            : "right-[-8rem] top-[-7.5rem]"
                        }`}
              ></span>

              {/* Content */}
              <div className="absolute bottom-6.5 left-6 right-6">
                <h3 className="text-lg font-medium text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#9C9C9C] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          scaleX: scrollXProgress,
          transformOrigin: "left",
          backgroundColor: "#ffcc00",
          height: 1,
          marginBottom: "1rem",
        }}
      />
    </>
  );
}
