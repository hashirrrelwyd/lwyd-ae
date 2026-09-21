import { useRef } from "react";
import ScrollCards from "../Common/ScrollCards";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const whyChooseUs = [
  {
    title: "End-to-End Execution",
    description:
      "Concept, production, and delivery, under one roof — not stitched together across three vendors. ",
  },
  {
    title: "Proven Track Record",
    description:
      "Years of work across the country's biggest spirits and beer portfolios.",
  },
  {
    title: "Dedicated Team",
    description:
      "Specialists who only do this kind of work, not generalists juggling five other industries. ",
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

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "dark");
  return (
    <div ref={sectionRef} className="bg-[#111111] mx-1.5 mt-1.5 px-[34px] py-12 rounded-t-4xl text-white">
      {/* Title */}
      <div className="flex">
        <h3 className="text-[22px] font-[500] text-white mb-8">
          Why <span className="text-lwyd-yellow font-[750] italic">Choose</span>{" "}
          Us
        </h3>
      </div>
      <ScrollCards Data={whyChooseUs} />
    </div>
  );
}
