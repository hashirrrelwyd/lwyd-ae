"use client";

import { useRef, useState } from "react";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const locations = [
  {
    city: "Bengaluru",
    country: "India",
    mapUrl: "https://maps.app.goo.gl/Cx8u3EXYPLynquVg6",
    address:
      "3rd Floor, Axis Cube, 171, 7th Main Rd, Dollars Colony, Phase 4, J. P. Nagar, Bengaluru, Karnataka 560078",
  },
  {
    city: "Delhi",
    country: "India",
    mapUrl: null,
    address:
      "1st Floor, Modi House, Off Link Rd, Andheri West, Delhi, Delhi 110053",
  },
];

export default function WhereToFindUs() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "light");
  const [activeIndex, setActiveIndex] = useState(null); // for mobile expand
  const [hoveredIndex, setHoveredIndex] = useState(null); // for desktop hover

  return (
    <section ref={sectionRef} className="bg-[#fdfbf6] py-12 section-padding">
      <div className="mx-auto">
        {/* Heading */}
        <h3 className="text-[22px] font-[500] text-gray-800 mb-6">
          Where to{" "}
          <span className="text-lwyd-yellow font-[750] italic">Find Us</span>
        </h3>

        <div className="divide-y divide-gray-200">
          {locations.map((loc, index) => {
            const isActive = hoveredIndex === index || activeIndex === index;

            const cityCountry = (
              <span
                className={`text-[30px] md:text-[36px] font-light transition-colors duration-500 ease-in-out ${
                  isActive ? "text-black" : "text-[#7D7D7D]/50"
                }`}
              >
                {loc.city} /{" "}
                <span
                  className={`transition-all duration-500 ease-in-out ${
                    isActive
                      ? "text-lwyd-yellow italic font-bold"
                      : "text-[#7D7D7D]/50 font-light"
                  }`}
                >
                  {loc.country}
                </span>
              </span>
            );

            return (
              <div
                key={index}
                className="relative px-6 cursor-pointer select-none"
                // Desktop hover
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Mobile click
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <div className="flex justify-between items-center py-6 md:h-[100px]">
                  {/* City / Country */}
                  {loc.mapUrl ? (
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {cityCountry}
                    </a>
                  ) : (
                    cityCountry
                  )}

                  {/* Desktop Address (absolute, right side) */}
                  <div
                    className={`hidden md:block absolute right-6 transition-all duration-700 ease-in-out text-base md:text-lg w-[260px] md:w-[420px] leading-snug ${
                      hoveredIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <p className="text-[#7D7D7D]/50">{loc.address}</p>
                  </div>
                </div>

                {/* Mobile Address (expand under city) */}
                <div
                  className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${
                    activeIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm leading-relaxed pb-4">
                    {loc.address}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
