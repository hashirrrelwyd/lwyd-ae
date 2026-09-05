import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import NavItem from "../ui/NavItem";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="section-padding bg-[#111111] text-white w-full py-12 rounded-t-[32px] flex flex-col gap-8">
      {/* Top block: brand + social on the left; lists to the right on desktop.
          On mobile, everything stacks: brand -> social -> Explore -> Inquiries */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
        {/* Brand + Social */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-end cursor-pointer">
            <img
              src="/icons/logo.png"
              alt="logo"
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <img
              src="/icons/logo-text.png"
              alt="logo text"
              className="w-full h-8 hidden md:block"
            />
          </div>

          <div className="flex gap-4">
            <p className="text-sm mt-2 font-[200] flex items-center gap-3">
              Follow Us On
              <a
                href="#"
                aria-label="LinkedIn"
                className="bg-white w-5 h-5 rounded-2xl flex justify-center items-center cursor-pointer hover:rounded-sm transition-all duration-300"
              >
                <FaLinkedinIn className="text-black" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="bg-white w-5 h-5 rounded-2xl flex justify-center items-center cursor-pointer hover:rounded-sm transition-all duration-300"
              >
                <FiInstagram className="text-black" />
              </a>
            </p>
          </div>
        </div>

        {/* Lists: side-by-side on desktop, stacked on mobile (Explore first, then Inquiries) */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-32">
          <ul>
            <li className="text-sm font-light mb-4 text-[#FFFFFF99]">Explore</li>
            <NavItem
              link={"/"}
              text={"Home"}
              className="text-sm font-light mb-2 cursor-pointer"
            />
            <NavItem
              link={"/about"}
              text={"About Us"}
              className="text-sm font-light mb-2 cursor-pointer"
            />
            <NavItem
              link={"/service"}
              text={"Services"}
              className="text-sm font-light mb-2 cursor-pointer"
            />
            <NavItem
              link={"/work"}
              text={"Our Work"}
              className="text-sm font-light mb-2 cursor-pointer"
            />
            <NavItem
              link={"/contact"}
              text={"Contact Us"}
              className="text-sm font-light mb-2 cursor-pointer"
            />
          </ul>

          <ul>
            <li className="text-sm font-light mb-4 text-[#FFFFFF99]">Inquiries</li>
            <NavItem
              href={"tel:917019215020"}
              text={"+91 70192 15020"}
              className="text-sm font-light mb-2 cursor-pointer"
            />
            <NavItem
              href={"tel:919677207522"}
              text={"+91 96772 07522"}
              className="text-sm font-light mb-2 cursor-pointer"
            />
            <NavItem
              href={"mailto:contact@lwyd.in"}
              text={"contact@lwyd.in"}
              className="text-sm font-light mb-2 cursor-pointer"
            />
          </ul>
        </div>
      </div>

      <hr className="opacity-30" />

      {/* Bottom bar: on mobile, show Privacy/Terms centered first, then copyright centered below.
          On desktop, return to left/right alignment. */}
      <div className="flex flex-col items-center text-center gap-3 md:flex-row md:justify-between md:text-left">
        {/* Copyright: second on mobile, first on desktop */}
        <p className="order-2 md:order-1 text-sm font-light text-[#FFFFFF99]">
          © 2025 LWYD Limited. All rights reserved.
        </p>

        {/* Policy links: first on mobile, right-aligned on desktop */}
        <div className="order-1 md:order-2 flex justify-center gap-12 md:gap-25">
          <a
            onClick={()=> navigate("/privacy")}
            className="relative text-xs font-light cursor-pointer text-white hover:text-[#ffcc00]
         after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[0.1px]
         after:w-0 after:bg-[#ffcc00] after:transition-all after:duration-500
         hover:after:w-full"
          >
            Privacy Policy
          </a>

          <a
            onClick={()=> navigate("/terms")}
            className="relative text-xs font-light cursor-pointer text-white hover:text-[#ffcc00]
         after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[0.1px]
         after:w-0 after:bg-[#ffcc00] after:transition-all after:duration-500
         hover:after:w-full"
          >
            Terms &amp; Condition
          </a>
        </div>
      </div>
    </footer>
  );
}
