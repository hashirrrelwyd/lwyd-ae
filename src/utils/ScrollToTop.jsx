import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCursor } from "../context/CursorContext";
import { getLenis } from "./lenis";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { setHoverType } = useCursor();

  useEffect(() => {
    // reset Lenis's own smoothed position too, not just the native scrollTop,
    // otherwise it can fight back toward the old position right after this
    getLenis().scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    // a link that navigates away unmounts before its own onMouseLeave can fire,
    // so the custom cursor (e.g. "connect") would otherwise stay stuck on the next page
    setHoverType("default");
  }, [pathname, setHoverType]);

  return null;
}
