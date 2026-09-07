import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative mx-auto grid h-[50vh] grid-cols-1 items-center gap-10 py-12 md:flex justify-between section-padding mt-24">
      <div className="flex flex-col items-start gap-4 md:w-3/6">
        <h2 className="text-pretty text-[36px] sm:text-[72px] font-[500] leading-tight text-[#0F172A] mb-7">
          Lorem{" "}
          <span className="italic text-lwyd-yellow font-[750]">ipsum</span>{" "}
          dolor dolor <br />
          <span className="italic text-lwyd-yellow font-[750]">
            consectetur
          </span>{" "}
          <span className="relative inline-flex -translate-y-3 align-middle">
            <img
              src="/images/button-img.png"
              alt=""
              className="h-10 w-20 sm:h-16 sm:w-28 rounded-full object-cover"
            />
          </span>
        </h2>
      </div>

      <div className="lg:w-4/12 xl:w-3/12 md:w-5/12 text-base leading-7 text-[#6B7280]">
        <p className="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
          ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit
          amet, consectetur adipiscing elit,
        </p>
        <Button title={"Connect with us"} />
      </div>

      {/* Section bottom border, inset from the edges */}
      <div className="absolute bottom-0 inset-x-10 h-px bg-black/10" />
    </section>
  );
}
