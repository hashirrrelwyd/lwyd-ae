import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import NavItem from "../ui/NavItem";
import { useNavigate } from "react-router-dom";
import LogoText from "../ui/LogoText";
import { useRef } from "react";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

// Sizes are in rem so the footer scales with the screen (see html font-size in index.css):
// the values below match the Figma design on a 1920px monitor.
const linkClass = "text-base md:text-lg font-[400] cursor-pointer";
// leading-none: no extra line-height space above the text, so the visible gap above
// "Explore"/"Inquiries" matches the footer's side padding exactly
const headingClass = "text-lg md:text-xl leading-none font-[300] text-[#FFFFFF99]";
const socialClass =
  "bg-white w-8 h-8 rounded-full flex justify-center items-center cursor-pointer hover:rounded-md transition-all duration-300";
const legalClass = `relative text-sm md:text-[0.9375rem] font-light cursor-pointer text-white hover:text-[#ffcc00]
  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[0.1px]
  after:w-0 after:bg-[#ffcc00] after:transition-all after:duration-500
  hover:after:w-full`;

export default function Footer() {
  const navigate = useNavigate()
  const footerRef = useRef(null)
  useSectionTheme(footerRef, "dark")
  return (
    // Top and side padding are the same value, so the content sits equally far
    // from the top edge and the left/right edges (40px on phones/tablets; 64px on a
    // 1920px monitor, scaling with the screen on laptops)
    <footer ref={footerRef} className="bg-[#111111] text-white w-full px-10 pt-10 pb-5 lg:px-[max(2.5rem,3.33vw)] lg:pt-[max(2.5rem,3.33vw)] lg:pb-[max(1rem,1.25vw)] rounded-t-[2rem] flex flex-col gap-8 lg:gap-[max(1.5rem,2vw)]">
      {/* Top block: brand + social on the left; lists to the right on desktop.
          On mobile, everything stacks: brand -> social -> Explore -> Inquiries */}
      <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        {/* Brand + Social */}
        <div className="flex flex-col gap-10 lg:gap-[max(1.5rem,2vw)]">
          {/* lg+: logo sized by screen width — 46px on a 1920px monitor, ~31px on a 1280px laptop */}
          <div className="flex gap-2 items-end cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="/icons/logo.png"
              alt="logo"
              className="w-9 h-9 lg:w-[max(2.25rem,2.4vw)] lg:h-[max(2.25rem,2.4vw)]"
            />
            <LogoText className="w-auto h-6 lg:h-[max(1.125rem,1.25vw)] hidden md:block text-white" />
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg md:text-xl font-[300] text-[#FFFFFF99]">Follow Us On</p>
            <a href="#" aria-label="LinkedIn" className={socialClass}>
              <FaLinkedinIn className="text-black text-base" />
            </a>
            <a href="#" aria-label="Instagram" className={socialClass}>
              <FiInstagram className="text-black text-base" />
            </a>
          </div>
        </div>

        {/* Lists: side-by-side on desktop, stacked on mobile (Explore first, then Inquiries) */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-[6vw]">
          <ul className="flex flex-col gap-4">
            <li className={`${headingClass} mb-4`}>Explore</li>
            <NavItem link={"/"} text={"Home"} className={linkClass} />
            <NavItem link={"/about"} text={"About Us"} className={linkClass} />
            <NavItem link={"/service"} text={"Services"} className={linkClass} />
            <NavItem link={"/work"} text={"Our Work"} className={linkClass} />
            <NavItem link={"/contact"} text={"Contact Us"} className={linkClass} />
          </ul>

          <ul className="flex flex-col gap-2">
            <li className={`${headingClass} mb-6`}>Inquiries</li>
            <NavItem href={"tel:917019215020"} text={"+91 70192 15020"} className={linkClass} />
            <NavItem href={"tel:919677207522"} text={"+91 96772 07522"} className={linkClass} />
            <NavItem href={"mailto:contact@lwyd.in"} text={"contact@lwyd.in"} className={linkClass} />
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:gap-[max(1rem,1vw)]">
        <hr className="border-white/30" />

        {/* Bottom bar: on mobile, show Privacy/Terms centered first, then copyright centered below.
            On desktop, return to left/right alignment. */}
        <div className="flex flex-col items-center text-center gap-3 md:flex-row md:justify-between md:text-left">
          {/* Copyright: second on mobile, first on desktop */}
          <p className="order-2 md:order-1 text-sm md:text-[0.9375rem] font-light text-white">
            © 2025 LWYD Limited. All rights reserved.
          </p>

          {/* Policy links: first on mobile, right-aligned on desktop */}
          <div className="order-1 md:order-2 flex justify-center gap-12">
            <a onClick={() => navigate("/privacy")} className={legalClass}>
              Privacy Policy
            </a>
            <a onClick={() => navigate("/terms")} className={legalClass}>
              Terms &amp; Condition
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
