"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "../../context/HeaderThemeContext";
import NavItem from "../ui/NavItem";

export default function Header() {
  const [scrolled, setScrolled] = useState(false); // turns on rounded blurred bg + black hamburger
  const [hidden, setHidden] = useState(false); // slide away when scrolling down
  const [menuOpen, setMenuOpen] = useState(false); // right-side drawer
  const ticking = useRef(false);
  const lastY = useRef(0);
  const { theme } = useTheme();

  // lock body scroll when nav is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  // close on ESC
  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") setMenuOpen(false);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, onKeyDown]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastY.current;

        // turn blur on after threshold
        setScrolled(y > 24);

        // hide on downward scroll (after a small threshold), show on upward
        if (Math.abs(diff) > 6) {
          if (diff > 0 && y > 72) {
            setHidden(true);
          } else if (diff < 0) {
            setHidden(false);
          }
          lastY.current = y;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const burgerFill = theme === "dark" ? "#FFFFFFB2" : "#000000B2";
  const logoTextSrc =
    theme === "dark" ? "/icons/logo-text.png" : "/icons/logo-text-black.png";

  return (
    <>
      {/* fixed wrapper that moves in/out based on scroll direction; don't hide when menu is open */}
      <div
        className={[
          "fixed inset-x-0 top-0 z-50 flex justify-center transition-transform duration-300",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        {/* Inner bar: becomes rounded + blurred when scrolled */}
        <div
          className={[
            "pointer-events-auto mx-4 mt-3 w-full",
            "flex items-center justify-between px-6 md:px-10 py-3 md:py-2",
            "transition-all duration-300",
            scrolled
              ? "rounded-full bg-white/10 backdrop-blur-3xl shadow-sm"
              : "bg-transparent border-transparent",
          ].join(" ")}
        >
          <div className="flex gap-2 items-end cursor-pointer">
            <img
              src="/icons/logo.png"
              alt="logo"
              className="w-6 h-6 md:w-7 md:h-7"
            />
            <img
              src={`${logoTextSrc}`}
              alt="logo text"
              className="w-full h-6 hidden md:block"
            />
          </div>

          <button
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="right-drawer"
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer p-1 rounded-md transition-colors duration-200"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0)matrix(1, 0, 0, -1, 0, 0)"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                fill={burgerFill}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px]",
          "transition-opacity duration-500 ease-out",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Right drawer (half screen on md+, full on mobile) */}
      <nav
        id="right-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={[
          "fixed right-0 top-0 h-dvh w-full md:w-1/3 md:rounded-l-2xl",
          "z-[70] bg-neutral-900 text-white",
          "transition-transform duration-500 ease-out",
          menuOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Close button */}
        <div className="flex items-center justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="h-10 w-10 grid place-items-center rounded-md bg-lwyd-yellow text-black  transition-colors cursor-pointer"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Menu content */}
        <div className="px-8 md:px-12 pb-10 flex flex-col h-[calc(100dvh-4rem)]">
          <ul className="space-y-10 mt-2">
            <NavItem
              text="HOME"
              link="/"
              className="text-3xl md:text-[2.4rem] 2xl:text-[3rem] font-semibold tracking-tight"
            />
            <NavItem
              text="ABOUT US"
              link="/about"
              className="text-3xl md:text-[2.4rem] 2xl:text-[3rem] font-semibold tracking-tight"
            />
            <NavItem
              text="SERVICES"
              link="/service"
              className="text-3xl md:text-[2.4rem] 2xl:text-[3rem] font-semibold tracking-tight"
            />
            <NavItem
              text="OUR WORK"
              link="/work"
              className="text-3xl md:text-[2.4rem] 2xl:text-[3rem] font-semibold tracking-tight"
            />
            <NavItem
              text="CONTACT"
              link="/contact"
              className="text-3xl md:text-[2.4rem] 2xl:text-[3rem] font-semibold tracking-tight"
            />
          </ul>

          <div className="mt-auto pt-10">
            <ul className="flex items-center gap-8 text-sm md:text-base text-neutral-300">
              <NavItem
                text="LINKEDIN"
                href={""}
                className="hover:text-white transition-colors text-neutral-300"
              />
              <NavItem
                text="TWITTER"
                href={""}
                className="hover:text-white transition-colors text-neutral-300"
              />
              <NavItem
                text="INSTAGRAM"
                href={""}
                className="hover:text-white transition-colors text-neutral-300"
              />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
