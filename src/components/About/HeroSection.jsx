import { useRef, useState, useEffect, useMemo } from "react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Image sources (cycled across grid)
  const sources = useMemo(
    () => [
      "/images/creative.webp",
      "/images/digital.webp",
      "/images/experience.webp",
      "/images/social.webp",
    ],
    []
  );

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Mouse move handler
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => setMouse((m) => ({ ...m, active: false }));

  // Force 3 rows and 6 columns
  const rows = 3;
  const cols = 6;
  const gap = 0;

  // Compute cell size based on container
  const cellWidth = containerSize.width
    ? (containerSize.width - (cols - 1) * gap) / cols
    : 0;
  const cellHeight = containerSize.height
    ? (containerSize.height - (rows - 1) * gap) / rows
    : 0;

  const images = useMemo(() => {
    const list = [];
    let k = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * (cellWidth + gap) + cellWidth / 2;
        const y = r * (cellHeight + gap) + cellHeight / 2;
        list.push({
          id: `${r}-${c}`,
          src: sources[k % sources.length],
          cx: x,
          cy: y,
        });
        k++;
      }
    }
    return list;
  }, [rows, cols, sources, cellWidth, cellHeight, gap]);

  return (
    <div className="relative p-1.5 rounded-2xl h-screen">
      <div
        ref={containerRef}
        className="w-full h-full rounded-2xl overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image grid */}
        {images.map((img) => {
          const dx = mouse.x - img.cx;
          const dy = mouse.y - img.cy;
          const dist = Math.hypot(dx, dy);

          const R = 200; // fade radius
          let opacity = 0;
          if (mouse.active) {
            const t = Math.max(0, 1 - dist / R);
            opacity = Math.pow(t, 1.5);
          }

          return (
            <img
              key={img.id}
              src={img.src}
              alt=""
              className="absolute object-cover pointer-events-none transition-opacity duration-300 ease-out"
              style={{
                width: `${cellWidth}px`,
                height: `${cellHeight}px`,
                top: img.cy - cellHeight / 2,
                left: img.cx - cellWidth / 2,
                opacity,
              }}
            />
          );
        })}

        {/* Title (center) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <h1 className="text-[44px] text-black font-[300] text-center">
            Lorem{" "}
            <span className="text-lwyd-yellow font-[700] italic">ipsum</span>{" "}
            dolor dolor <br />
            <span className="text-lwyd-yellow font-[700] italic">
              consectetur
            </span>
          </h1>
        </div>

        {/* Paragraph (bottom center, rounded-2xl) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <p className="text-black text-sm font-400 w-full text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
            ipsum dolor sit amet, consectetur adipiscing
          </p>
        </div>
      </div>
    </div>
  );
}
