"use client";

import { useRef, useState } from "react";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

// how many projects show at first, and how many each "Load More" click adds
const PAGE_SIZE = 4;

const worksData = [
  { id: 1, title: "Dry Drnks", category: "Website", image: "/works/dry_drinks.png" },
  { id: 2, title: "Johnnie Walker", category: "Shoot", image: "/works/project_4.png" },
  { id: 3, title: "Dry Drnks", category: "Website", image: "/works/project_3.png" },
  { id: 4, title: "The Bar", category: "Shoot", image: "/works/project_2.png" },
];

export default function Works() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "light");
  const [visible, setVisible] = useState(PAGE_SIZE);

  return (
    <section ref={sectionRef} className="section-padding py-12 lg:py-[max(3rem,3vw)] mx-auto">
      {/* Equal-width grid: 1 column on mobile, 2 from md up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 lg:gap-x-[max(1.5rem,1.25vw)] lg:gap-y-[max(2rem,2vw)]">
        {worksData.slice(0, visible).map((work) => (
          <article key={work.id} className="group cursor-pointer">
            {/* Image box: the image zooms in slightly on hover, clipped by the rounded box */}
            <div className="relative aspect-[6/5] overflow-hidden rounded-xl">
              <img
                src={work.image}
                alt={work.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Category chip (top right): cream pill with dark text */}
              <span className="absolute top-4 right-4 lg:top-[max(1rem,1.25vw)] lg:right-[max(1rem,1.25vw)] rounded-full bg-[#FFFBF5] p-4 lg:p-[max(0.75rem,0.83vw)] text-[12px] lg:text-[max(12px,0.73vw)] font-[400] leading-none text-[#111111]">
                {work.category}
              </span>
            </div>

            {/* Title: Montserrat 400, slants to italic on hover. font-style can't animate,
                so a skew gives the smooth "slowly turning italic" effect */}
            <h3 className="mt-3 lg:mt-[max(0.75rem,0.9vw)] text-xl lg:text-[max(1.25rem,1.35vw)] font-[400] text-[#111111] origin-bottom-left transition-transform duration-500 ease-out group-hover:-skew-x-12">
              {work.title}
            </h3>
          </article>
        ))}
      </div>

      {/* Load More: only shows when there are more than PAGE_SIZE projects, and hides once all are visible */}
      {visible < worksData.length && (
        <div className="flex justify-center mt-10 lg:mt-[max(2.5rem,3vw)]">
          <Button
            onClick={() => setVisible((prev) => prev + PAGE_SIZE)}
            title={"Load More"}
          />
        </div>
      )}
    </section>
  );
}
