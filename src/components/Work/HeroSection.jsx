import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative mx-auto section-padding mt-24 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[150px]">
    {/* Left - Heading */}
    <div className="flex items-start justify-start">
      <h2 className="text-pretty text-3xl font-[500] leading-tight text-[#0F172A] md:text-4xl mb-7">
        Lorem{" "}
        <span className="italic text-lwyd-yellow font-[750]">ipsum</span>{" "}
        dolor dolor <br />
        <span className="italic text-lwyd-yellow font-[750]">consectetur</span>{" "}
        <span className="relative -mb-1 inline-flex align-middle">
          <img
            src="/images/button-img.png"
            alt=""
            className="h-8 w-16 rounded-full object-cover"
          />
        </span>
      </h2>
    </div>

    {/* Right - Paragraph */}
    <div className="
      mt-6                       /* mobile: normal stacked flow */
      md:mt-0 md:flex md:items-end md:justify-end /* desktop: bottom-right */
      text-sm leading-6 text-[#6B7280]
    ">
      <p className="max-w-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem
        ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit
        amet, consectetur adipiscing elit,
      </p>
    </div>
  </div>
</section>

  );
}
