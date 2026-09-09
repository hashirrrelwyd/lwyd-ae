"use client";

import { useState } from "react";
import { Plus } from "lucide-react"; // only Plus

const faqs = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    question: "Second FAQ question goes here,",
    answer:
      "This is the answer for the second FAQ. You can add any text here, and it will expand smoothly when clicked.",
  },
  {
    question: "Third FAQ question example,",
    answer:
      "Here is another answer. The height will animate smoothly without jumping, just like in your design.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fdfbf6] py-12 section-padding">
      <div className="mx-auto">
        <h3 className="text-[22px] font-[500] text-gray-800 mb-6">
          FAQ<span className="text-lwyd-yellow font-[750] italic">’s</span>
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-[#7D7D7D] font-medium text-lg cursor-pointer"
              >
                <span
                  className={`transition-all duration-500 ${
                    activeIndex === index
                      ? "text-black font-normal text-xl"
                      : ""
                  }`}
                >
                  {faq.question}
                </span>

                {/* Rotating Plus → X */}
                <Plus
                  className={`w-5 h-5 transform transition-transform duration-500 ${
                    activeIndex === index ? "rotate-45 text-black" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-5 transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-40 opacity-100 py-3"
                    : "max-h-0 opacity-0 py-0"
                } overflow-hidden`}
              >
                <p className="text-gray-600 text-base font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
