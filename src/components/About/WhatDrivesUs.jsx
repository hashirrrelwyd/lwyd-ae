import { useRef } from "react";
import ScrollCards from "../Common/ScrollCards";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const whatDrivesUs = [
  {
    title: "Innovative Approach",
    description:
      "We apply fresh thinking to every project, crafting solutions that truly stand out.",
  },
  {
    title: "Proven Track Record",
    description:
      "Trusted by clients across industries, we consistently deliver on our promises.",
  },
  {
    title: "Dedicated Support",
    description:
      "We're always here for you — pre, during, and post project delivery.",
  },
  {
    title: "Expert Team",
    description:
      "Our skilled team blends tech expertise with business insight.",
  },
  {
    title: "Client-Centric",
    description:
      "Our approach starts and ends with understanding your goals and needs.",
  },
  {
    title: "Cutting-Edge Technology",
    description: "We use the latest tools to keep you ahead of the curve.",
  },
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
