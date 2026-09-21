import { useRef } from "react";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function WorkTogether({ heading }) {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "light");
  return (
    <section ref={sectionRef} className="grid md:grid-cols-2 gap-12 mb-24 section-padding py-24">
      {/* Left side */}
      <div>
        <h3 className="text-[22px] font-[500] text-gray-800 mb-2">
          Lets <span className="text-lwyd-yellow font-[750] italic">Work</span>{" "}
          Together
        </h3>
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl font-[500] mb-4">
          {heading ?? (
            <>
              Got a brand you want to build with us?{" "}
              <span className="text-lwyd-yellow italic font-[750]">Let's talk.</span>
            </>
          )}
        </h2>
        <Button title={"Contact Us"} />
      </div>
    </section>
  );
}
