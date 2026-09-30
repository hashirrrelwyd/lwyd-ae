"use client";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

const countryCodes = [
  "+1", "+7", "+20", "+27", "+30", "+31", "+32", "+33", "+34", "+39",
  "+40", "+41", "+44", "+45", "+46", "+47", "+48", "+49", "+51", "+52",
  "+53", "+54", "+55", "+56", "+57", "+58", "+60", "+61", "+62", "+63",
  "+64", "+65", "+66", "+81", "+82", "+84", "+86", "+90", "+91", "+92",
  "+93", "+94", "+95", "+98", "+353", "+966", "+971", "+972", "+974",
];

// Form styles from Figma (1920px frame), scaling with the screen on laptops/monitors:
// labels 20px regular (letter spacing comes from the site-wide value); fields padded 16px top/bottom, 8px sides,
// 16px rounded corners. Minimums keep them usable on smaller screens.
const labelClass =
  "block text-sm lg:text-[max(14px,1.04vw)] font-[400] leading-none text-gray-700";
const fieldText = "text-base lg:text-[max(14px,0.94vw)]";
const fieldPadding = "px-2 lg:px-[max(0.5rem,0.42vw)] py-3.5 lg:py-[max(0.75rem,0.83vw)]";
const fieldBox =
  "w-full mt-2 lg:mt-[max(0.5rem,0.6vw)] bg-white rounded-lg lg:rounded-[max(0.5rem,0.83vw)]";
const fieldClass = `${fieldBox} ${fieldPadding} ${fieldText} focus:outline-none focus:ring-2 focus:ring-yellow-400`;

export default function ContactSection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  useSectionTheme(sectionRef, "light");
  return (
    // pt: clear space below the fixed navbar (~154px on a 1920px monitor, ~102px on a laptop).
    // md+: the section is at least one screen tall (min-h-dvh) and the cards fill the space
    // left under the navbar. If the form needs more room (short laptop screens), the cards
    // grow instead of cutting the content off.
    <section ref={sectionRef} className="w-full section-padding pt-32 pb-12 md:flex md:min-h-dvh md:flex-col md:pb-[var(--side-padding)] lg:pt-[max(7rem,8vw)]">
      <div className="mx-auto grid w-full md:flex-1 md:grid-cols-2 gap-8">
        {/* Left Content */}
        <div className="relative bg-black/60 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[28rem] md:min-h-0 p-6 md:p-10 lg:p-[max(2rem,2.5vw)] text-white">
          <img
            src="/images/social.webp" 
            alt="team working"
            className="absolute inset-0 w-full h-full object-cover -z-10 blur-sm"
          />
          <div>
            <h2 className="section-title">
              <span className="italic text-yellow-400 font-[750]">Tell us</span> what you're
               <br />
              <span className="font-bold text-yellow-400">building</span>
            </h2>
            
          </div>
          <div>
            <p className="body-text mb-6 max-w-md">
              Campaign, partnership, or platform - whatever it is, let's talk. 
            </p>
            <Button title={"Join Us"} onClick={() => navigate("/careers")} />
          </div>
        </div>

        {/* Right Form */}
        {/* form fills the card's height; the message box grows to take up the extra space */}
        <div className="flex flex-col bg-[#F2EFE94D] rounded-2xl p-6 md:p-10 lg:p-[max(2rem,2.5vw)]">
          <form className="flex flex-1 flex-col gap-5 lg:gap-[max(1rem,1.1vw)]">
            {/* Name */}
            <div>
              <label className={labelClass}>
                Call me.<span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="Chri" className={fieldClass} />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>
                Where we can reach you<span className="text-red-500">*</span>
              </label>
              <input type="email" placeholder="Chri@gmail.com" className={fieldClass} />
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>
                Reach me at<span className="text-red-500">*</span>
              </label>
              <div className={`${fieldBox} flex items-center focus-within:ring-2 focus-within:ring-yellow-400`}>
                <select
                  defaultValue="+91"
                  aria-label="Country code"
                  className={`${fieldPadding} ${fieldText} appearance-none bg-transparent pr-1 focus:outline-none cursor-pointer`}
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
                  className={`${fieldPadding} ${fieldText} flex-1 min-w-0 bg-transparent focus:outline-none`}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-1 flex-col">
              <label className={labelClass}>
                This is what’s on my mind<span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="message..."
                rows="4"
                className={`${fieldClass} flex-1 min-h-[6rem] resize-none`}
              ></textarea>
            </div>

            {/* Button */}
            {/* <button
              type="submit"
              className="mt-4 w-fit bg-yellow-400 text-black text-[max(12px,0.875rem)] font-[400] px-6 py-2 rounded-full hover:bg-yellow-500 transition"
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
