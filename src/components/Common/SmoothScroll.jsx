import { useEffect } from "react";
import { getLenis } from "../../utils/lenis";

// Mounts once for the whole app: turns on buttery, momentum-based smooth
// scrolling site-wide instead of the browser's default (somewhat blocky) scroll,
// and keeps it perfectly in sync with every GSAP ScrollTrigger animation.
export default function SmoothScroll() {
  useEffect(() => {
    getLenis();
  }, []);

  return null;
}
