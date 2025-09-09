export default function HeroSection() {
  return (
    <div className="relative p-1.5 rounded-2xl h-screen">
      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        <img
          src="/images/career-hero.avif"
          alt=""
          className="h-full object-cover w-full"
        />
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
        <div className="absolute inset-0 flex items-end justify-between py-6 section-padding">
          <div>
            <p className="text-[44px] text-white font-[300]">
              Lorem{" "}
              <span className="text-lwyd-yellow font-[700] italic">ipsum</span>{" "}
              dolor dolor <br />
              <span className="text-lwyd-yellow font-[700] italic">
                consectetur
              </span>
            </p>
          </div>
          <div>
            <p className="text-[#FFFFFFB2] text-sm font-400 w-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
              ipsum dolor sit amet, consectetur adipiscing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
