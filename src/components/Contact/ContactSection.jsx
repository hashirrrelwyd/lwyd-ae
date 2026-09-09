"use client";

import { useRef } from "react";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const countryCodes = [
  "+1", "+7", "+20", "+27", "+30", "+31", "+32", "+33", "+34", "+39",
  "+40", "+41", "+44", "+45", "+46", "+47", "+48", "+49", "+51", "+52",
  "+53", "+54", "+55", "+56", "+57", "+58", "+60", "+61", "+62", "+63",
  "+64", "+65", "+66", "+81", "+82", "+84", "+86", "+90", "+91", "+92",
  "+93", "+94", "+95", "+98", "+353", "+966", "+971", "+972", "+974",
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "light");
  return (
    <section ref={sectionRef} className="w-full py-12 section-padding pt-24">
      <div className="mx-auto grid md:grid-cols-2 gap-8 rounded-2xl overflow-hidden">
        {/* Left Content */}
        <div className="relative bg-black/60 rounded-2xl overflow-hidden flex flex-col justify-between p-6 md:p-10 text-white">
          <img
            src="/images/social.webp" 
            alt="team working"
            className="absolute inset-0 w-full h-full object-cover -z-10 blur-sm"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-[500] leading-snug">
              Lorem <span className="italic text-yellow-400 font-[750]">ipsum</span> dolor
              dolor <br />
              <span className="font-bold text-yellow-400">consectetur</span>
            </h2>
            
          </div>
          <div>
            <p className="mb-6 text-sm md:text-base max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
              ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit
              amet, consectetur
            </p>
            <Button title={"Join Us"} />
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-[#F2EFE94D] rounded-2xl p-6 md:p-10">
          <form className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-light text-gray-700">
                Call me.<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Chri"
                className="w-full mt-2 px-2 py-3.5 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-light text-gray-700">
                Where we can reach you<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Chri@gmail.com"
                className="w-full mt-2 px-2 py-3.5 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-light text-gray-700">
                Reach me at<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center mt-2 bg-white rounded-md focus-within:ring-2 focus-within:ring-yellow-400">
                <select
                  defaultValue="+91"
                  aria-label="Country code"
                  className="appearance-none bg-transparent py-3.5 pl-2 pr-1 focus:outline-none cursor-pointer"
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <span className="h-5 w-px shrink-0 bg-gray-300" />
                <input
                  type="tel"
                  placeholder="00000 00000"
                  className="flex-1 min-w-0 px-2 py-3.5 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-light text-gray-700">
                This is what’s on my mind<span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="message..."
                rows="4"
                className="w-full mt-2 px-2 py-3.5 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            {/* Button */}
            {/* <button
              type="submit"
              className="mt-4 w-fit bg-yellow-400 text-black font-medium px-6 py-2 rounded-full hover:bg-yellow-500 transition"
            >
              Submit form
            </button> */}
            <div>
              <Button title={"Submit form"} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
