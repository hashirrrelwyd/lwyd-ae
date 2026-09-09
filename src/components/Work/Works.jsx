"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const worksData = [
  {
    id: 1,
    title: "Lorem ipsum dolor dolor ",
    year: "2024",
    image: "/images/media.webp",
    description: "This is a brief description of Project One.",
    color: "#E07B39", // brown-orange
    width: "w-2/6",
  },
  {
    id: 2,
    title: "Project Two",
    year: "2025",
    image: "/images/media.webp",
    description: "This is a brief description of Project Two.",
    color: "#4ADE80", // green
    width: "w-4/6",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor dolor ",
    year: "2025",
    image: "/images/media.webp",
    description: "This is a brief description of Project Three.",
    color: "#60A5FA", // blue
    width: "w-2/4",
  },
  {
    id: 4,
    title: "Project Four",
    year: "2025",
    image: "/images/media.webp",
    description: "This is a brief description of Project Four.",
    color: "#FACC15", // yellow
    width: "w-2/4",
  },
  {
    id: 5,
    title: "Project Five",
    year: "2025",
    image: "/images/media.webp",
    description: "This is a brief description of Project Five.",
    color: "#A78BFA", // purple
    width: "w-4/6",
  },
  {
    id: 6,
    title: "Lorem ipsum dolor dolor ",
    year: "2025",
    image: "/images/media.webp",
    description: "This is a brief description of Project Six.",
    color: "#FB7185", // pink
    width: "w-2/6",
  },
];

export default function Works() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "light");
  const [visible, setVisible] = useState(4);

  const ballVariants = {
    initial: { scale: 0, y: 100 },
    hover: {
      scale: 15,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <section ref={sectionRef} className="section-padding py-12 mx-auto">
      <div className="hidden lg:flex flex-col gap-6">
        {/* Group works in pairs (2 per row) */}
        {Array.from({
          length: Math.ceil(worksData.slice(0, visible).length / 2),
        }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-6">
            {worksData.slice(rowIndex * 2, rowIndex * 2 + 2).map((work) => (
              <motion.div
                key={work.id}
                className={`relative rounded-2xl overflow-hidden h-[400px] cursor-pointer ${work.width}`}
                style={{
                  backgroundImage: `url(${work.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                initial="initial"
                whileHover="hover"
              >
                {/* Expanding Ball */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full z-10"
                  style={{ backgroundColor: work.color }}
                  variants={ballVariants}
                />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
                  {/* Description */}
                  <motion.p
                    className="text-[60px] font-[600] leading-[1.1]"
                    variants={{
                      initial: { color: "#00000000", opacity: 0 },
                      hover: {
                        color: "#000000",
                        opacity: 1,
                        transition: { duration: 0.9 },
                      },
                    }}
                  >
                    {work.description}
                  </motion.p>

                  {/* Title + Year */}
                  <motion.div
                    className="transition-colors flex gap-2"
                    variants={{
                      initial: { color: "#ffffff" },
                      hover: {
                        color: "#000000",
                        transition: { duration: 0.3 },
                      },
                    }}
                  >
                    <h3 className="text-lg font-[500]">{work.title}</h3>
                    <span className="text-[10px] flex items-end">
                      [{work.year}]
                    </span>
                  </motion.div>
                </div>

                {/* Dark overlay */}
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    initial: { backgroundColor: "rgba(0,0,0,0.3)" },
                    hover: {
                      backgroundColor: "rgba(0,0,0,0)",
                      transition: { duration: 0.3 },
                    },
                  }}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex flex-col gap-6 lg:hidden">
  {worksData.slice(0, visible).map((work) => (
    <motion.div
      key={work.id}
      className="relative rounded-2xl overflow-hidden h-[350px] cursor-pointer w-full"
      style={{
        backgroundImage: `url(${work.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial="initial"
      whileHover="hover"
    >
      {/* Expanding Ball */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full z-10"
        style={{ backgroundColor: work.color }}
        variants={ballVariants}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
        {/* Description */}
        <motion.p
          className="text-[32px] font-[600] leading-[1.1]" // ✅ smaller for mobile
          variants={{
            initial: { color: "#00000000", opacity: 0 },
            hover: {
              color: "#000000",
              opacity: 1,
              transition: { duration: 0.9 },
            },
          }}
        >
          {work.description}
        </motion.p>

        {/* Title + Year */}
        <motion.div
          className="transition-colors flex gap-2"
          variants={{
            initial: { color: "#ffffff" },
            hover: { color: "#000000", transition: { duration: 0.3 } },
          }}
        >
          <h3 className="text-base font-[500]">{work.title}</h3>
          <span className="text-[10px] flex items-end">[{work.year}]</span>
        </motion.div>
      </div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0"
        variants={{
          initial: { backgroundColor: "rgba(0,0,0,0.3)" },
          hover: { backgroundColor: "rgba(0,0,0,0)", transition: { duration: 0.3 } },
        }}
      />
    </motion.div>
  ))}
</div>


      {/* Load More */}
      {visible < worksData.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setVisible((prev) => prev + 2)}
            title={"Load More"}
          />
        </div>
      )}
    </section>
  );
}
