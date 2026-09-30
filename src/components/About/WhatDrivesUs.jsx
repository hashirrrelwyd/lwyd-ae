import { useRef } from "react";
import ScrollCards from "../Common/ScrollCards";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const whatDrivesUs = [
  {
    title: "Creativity with Purpose",
    description:
      "Every idea earns its place - nothing built just to look good in a deck.",
  },
  {
    title: "Boldness",
    description:
      "We chase the braver idea first, then engineer the smart way to actually land it.",
  },
  {
    title: "Collaboration",
    description:
      "Client, agency, culture - the best work happens when none of them work in silos.",
  },
  {
    title: "Expert Team",
    description:
      "Our skilled team blends creativity, strategy, and technical expertise to deliver exceptional results.",
  }
];

export default function WhatDrivesUs() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "dark");
  return (
    <div ref={sectionRef} className="bg-[#111111] mx-1.5 mt-1.5 px-[calc(var(--side-padding)-6px)] pt-12 pb-8 lg:pt-[max(2.5rem,3vw)] rounded-t-4xl text-white">
      {/* Title: ~30px on a 1920px screen (Figma) */}
      <div className="flex">
        <h3 className="text-[20px] lg:text-[max(18px,1.56vw)] font-[500] text-white mb-8 lg:mb-[max(2rem,3.3vw)]">
          What{" "}
          <span className="text-lwyd-yellow font-[750] italic">Drives</span> Us
        </h3>
      </div>
      <ScrollCards Data={whatDrivesUs} />
    </div>
  );
}
