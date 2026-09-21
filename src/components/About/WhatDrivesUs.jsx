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
    <div ref={sectionRef} className="bg-[#111111] mx-1.5 mt-1.5 px-[34px] py-12 rounded-t-4xl text-white">
      {/* Title */}
      <div className="flex">
        <h3 className="text-[22px] font-[500] text-white mb-8">
          What{" "}
          <span className="text-lwyd-yellow font-[750] italic">Drives</span> Us
        </h3>
      </div>
      <ScrollCards Data={whatDrivesUs} />
    </div>
  );
}
