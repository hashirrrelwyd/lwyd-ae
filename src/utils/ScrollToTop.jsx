import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCursor } from "../context/CursorContext";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { setHoverType } = useCursor();

  useEffect(() => {
    window.scrollTo(0, 0);
    // a link that navigates away unmounts before its own onMouseLeave can fire,
    // so the custom cursor (e.g. "connect") would otherwise stay stuck on the next page
    setHoverType("default");
  }, [pathname, setHoverType]);

  return null;
}
