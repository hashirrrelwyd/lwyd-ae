"use client";

import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section className="w-full py-12 section-padding pt-24">
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
              <label className="block text-sm font-medium text-gray-700">
                Call me.<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Chri"
                className="w-full mt-2 px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Where we can reach you<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Chri@gmail.com"
                className="w-full mt-2 px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reach me at<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  defaultValue="+91"
                  className="w-16 px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="tel"
                  placeholder="00000 00000"
                  className="flex-1 px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                This is what’s on my mind<span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="message..."
                rows="4"
                className="w-full mt-2 px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
