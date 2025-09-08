import { motion } from "framer-motion";
import { useCursor } from "../../context/CursorContext";
import { ArrowUpRight } from "lucide-react";

const CustomCursor = () => {
  const { mousePosition, hoverType } = useCursor();

  const getCursorStyles = () => {
    switch (hoverType) {
      case "next":
        return {
          width: 30,
          height: 30,
          backgroundColor: "transparent",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };

      default:
        return {};
    }
  };

  return (
    <motion.div
      className="cursor"
      initial={{ opacity: 0 }}
      animate={{
        x: mousePosition.x - 6,
        y: mousePosition.y - 8,
        opacity: 1,
        ...getCursorStyles(),
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,

        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {hoverType === "next" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="90"
          fill="none"
          stroke="#ffcc00"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
      {hoverType === "connect" && (
        <button className="rounded-4xl flex gap-2 text-xs px-3 py-1 md:text-sm bg-lwyd-yellow md:px-5 md:py-2 text-black cursor-pointer">
          <span className="items-center justify-center">Connect With Us</span>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1} />
        </button>
      )}
    </motion.div>
  );
};

export default CustomCursor;
