import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  useSectionTheme(sectionRef, "light");
  return (
    <section ref={sectionRef} className="relative mx-auto grid h-[50vh] grid-cols-1 items-center gap-10 py-12 md:flex justify-between section-padding mt-24">
      <div className="flex flex-col items-start gap-4 md:w-3/6">
        <h2 className="hero-title text-pretty text-[#0F172A] mb-7">
          From the{" "}
          <span className="italic text-lwyd-yellow font-[700]">idea</span>{" "}
          to the thing<br />
          <span className="italic text-lwyd-yellow font-[700]">
            itself
          </span>{" "}
          <span className="relative inline-flex -translate-y-[0.1em] align-middle">
            {/* sized in em so the chip scales with the title */}
            <img
              src="/images/button-img.png"
              alt=""
              className="h-[0.9em] w-[1.6em] rounded-full object-cover"
            />
          </span>
        </h2>
      </div>

      <div className="lg:w-4/12 xl:w-3/12 md:w-5/12 text-[#6B7280]">
        <p className="hero-text mb-6">
          We don't stop at the concept - we build, shoot, print, and install it too.
        </p>
        <Button title={"Connect with LWYD"} onClick={() => navigate("/contact")} />
      </div>

      {/* Section bottom border, inset from the edges */}
      <div className="absolute bottom-0 inset-x-10 h-px bg-black/10" />
    </section>
  );
}
