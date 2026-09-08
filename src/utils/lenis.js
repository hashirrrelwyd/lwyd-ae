import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

// Single shared Lenis instance for the whole site, driven by GSAP's ticker so it
// stays in lockstep with every ScrollTrigger-based animation (no fighting between
// two separate raf loops, which is what causes janky/out-of-sync scroll-scrubbing).
export function getLenis() {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    syncTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
