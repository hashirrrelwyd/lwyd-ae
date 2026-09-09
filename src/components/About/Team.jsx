"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teamData } from "../../data/team";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const CATEGORY_LABELS = {
  all: "All",
  AM: "Account Manager",
  "Hr&Finance": "HR & Finance",
};

const slideVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction >= 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function Team() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "dark");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [direction, setDirection] = useState(1);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(teamData.map((m) => m.category)))],
    []
  );

  const filteredTeam = useMemo(
    () =>
      currentCategory === "all"
        ? teamData
        : teamData.filter((member) => member.category === currentCategory),
    [currentCategory]
  );

  const current = filteredTeam[currentIndex];
  const nextIndex = (currentIndex + 1) % filteredTeam.length;
  const next = filteredTeam[nextIndex];

  const goTo = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setDirection(1);
    setCurrentIndex(0);
  };

  const handleWheel = (e) => {
    if (e.deltaY !== 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  return (
    <div ref={sectionRef} className="mx-1.5 mb-1.5 flex h-auto flex-col rounded-b-4xl bg-[#111111] px-6 py-10 text-white sm:h-screen md:px-10">
      <h3 className="mb-8 text-[22px] font-[500] text-white">
        Meet <span className="text-lwyd-yellow font-[750] italic">Our</span>{" "}
        Team
      </h3>

      {/* Center stage: previous(current) name | image | next name */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden py-6 sm:py-0">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={`${currentCategory}-${currentIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex w-full flex-col items-center gap-6 sm:flex-row sm:gap-8"
          >
            <div className="flex w-full flex-col items-center gap-6 sm:w-[70%] sm:flex-row sm:justify-evenly sm:gap-0">
              <div className="order-2 shrink-0 text-center sm:order-1 sm:text-left">
                <h2 className="text-3xl font-normal text-white md:text-4xl lg:text-5xl 2xl:text-6xl">
                  {current?.title}
                </h2>
                <p className="mt-3 text-center text-base font-light text-[#7D7D7D] md:text-lg lg:text-xl">
                  “{current?.subtitle}”
                </p>
              </div>

              <img
                src={current?.image}
                alt={current?.title}
                className="order-1 h-[300px] w-auto shrink-0 rounded-2xl object-contain sm:order-2 md:h-[340px] md:rounded-3xl lg:h-[380px] 2xl:h-[520px]"
              />
            </div>

            <button
              type="button"
              onClick={() => goTo(nextIndex)}
              className="hidden w-[30%] shrink-0 cursor-pointer text-center sm:block"
            >
              <h3 className="text-2xl font-light text-white/60 md:text-3xl">
                {next?.title}
              </h3>
              <p className="mt-2 text-sm font-light text-white/40 md:text-base">
                “{next?.subtitle}”
              </p>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Filter row */}
      <div className="mb-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-base">
        {categories.map((category) => {
          const active = currentCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`flex items-center gap-2 transition-colors ${
                active ? "text-lwyd-yellow" : "text-[#7D7D7D]"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full ${
                  active
                    ? "bg-lwyd-yellow"
                    : "border border-[#7D7D7D]"
                }`}
              />
              {CATEGORY_LABELS[category] || category}
            </button>
          );
        })}

        <span className="ml-auto shrink-0 text-sm text-[#7D7D7D]">
          (<span className="font-medium text-white">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          /{String(filteredTeam.length).padStart(2, "0")})
        </span>
      </div>

      {/* Thumbnails */}
      <div
        onWheel={handleWheel}
        className="no-scrollbar flex gap-4 overflow-x-auto"
      >
        {filteredTeam.map((member, index) => {
          const selected = index === currentIndex;
          return (
            <button
              key={`${member.title}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              className={`flex h-28 w-24 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                selected ? "border border-white/50" : ""
              }`}
            >
              <img
                src={member.image}
                alt={member.title}
                className={`rounded-lg object-cover transition-all duration-300 ${
                  selected ? "h-[80%] w-[80%]" : "h-full w-full"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
