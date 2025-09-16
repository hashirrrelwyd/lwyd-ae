"use client";

export default function OurServices() {
  return (
    <section className="bg-[#FFFBF5] py-16 section-padding">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Left Content */}
        <div className="flex flex-col justify-between h-[500px] flex-1">
          {/* Heading (Top Left) */}
          <div>
            <h2 className="text-3xl md:text-4xl font-[500] text-gray-900">
              Creative{" "}
              <span className="text-lwyd-yellow font-[750] italic">
                Development
              </span>
            </h2>
          </div>

          {/* Bottom Row: Description + Buttons */}
          <div className="flex justify-between items-end gap-6">
            {/* Description (Bottom Left) */}
            <p className="text-[#7D7D7D] leading-relaxed max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed Lorem ipsum —
            </p>

            {/* Buttons (Bottom Right) */}
            <div className="flex flex-col gap-2 shrink-0">
              <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs hover:bg-gray-200 transition">
                Delivery & Refinement
              </button>
              <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs hover:bg-gray-200 transition">
                Design & Development
              </button>
              <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs hover:bg-gray-200 transition">
                Creative Development
              </button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-end">
          <img
            src="/images/creative.webp" // replace with your image path
            alt="Development"
            className="w-[400px] h-[500px] object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
