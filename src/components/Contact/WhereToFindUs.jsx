"use client";

import { useState } from "react";

const locations = [
  {
    city: "Bengaluru",
    country: "India",
    address:
      "3rd Floor, Axis Cube, 171, 7th Main Rd, Dollars Colony, Phase 4, J. P. Nagar, Bengaluru, Karnataka 560078",
  },
  {
    city: "Mumbai",
    country: "India",
    address:
      "1st Floor, Modi House, Off Link Rd, Andheri West, Mumbai, Maharashtra 400053",
  },
];

export default function WhereToFindUs() {
  const [activeIndex, setActiveIndex] = useState(null); // for mobile expand
  const [hoveredIndex, setHoveredIndex] = useState(null); // for desktop hover

  return (
    <section className="bg-[#fdfbf6] py-12 section-padding">
      <div className="mx-auto">
        {/* Heading */}
        <h3 className="text-[22px] font-[500] text-gray-800 mb-6">
          Where to{" "}
          <span className="text-lwyd-yellow font-[750] italic">Find Us</span>
        </h3>

        <div className="divide-y divide-gray-200">
          {locations.map((loc, index) => (
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
                <span
                  className={`text-[22px] md:text-[28px] transition-all duration-500 ease-in-out ${
                    hoveredIndex === index || activeIndex === index
                      ? "text-black font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {loc.city}
                  <span
                    className={`ml-1 transition-all duration-500 ease-in-out ${
                      hoveredIndex === index || activeIndex === index
                        ? "text-lwyd-yellow italic font-bold"
                        : "text-gray-300"
                    }`}
                  >
                    / {loc.country}
                  </span>
                </span>

                {/* Desktop Address (absolute, right side) */}
                <div
                  className={`hidden md:block absolute right-6 transition-all duration-700 ease-in-out text-sm md:text-base w-[260px] md:w-[420px] leading-snug ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <p className="text-gray-600">{loc.address}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
