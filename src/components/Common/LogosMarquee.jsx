import Marquee from "react-fast-marquee";

const logos = [
  { alt: "atlantico logo", w: 90 },
  { alt: "WBD Sport logo", w: 110 },
  { alt: "atlantico logo 2", w: 90 },
  { alt: ".raw logo", w: 70 },
  { alt: "atlantico logo 3", w: 90 },
  { alt: "generic logo", w: 80 },
];

export default function LogosMarquee() {
    const fade = 300; // px fade on both ends
  return (
    <div
      className="relative overflow-hidden py-12"
      style={{
        maskImage: `linear-gradient(to right, transparent, black ${fade}px, black calc(100% - ${fade}px), transparent)`,
        WebkitMaskImage: `linear-gradient(to right, transparent, black ${fade}px, black calc(100% - ${fade}px), transparent)`,
      }}
    >
      <Marquee speed={40} gradient={false} pauseOnHover>
        <div className="flex items-center gap-40 pr-40">
          {Array.from({ length: 3 }).map((_, loopIdx) =>
            logos.map((l, i) => (
              <img
                key={`${loopIdx}-${i}`}
                src={`/icons/logo-1.png`}
                alt={l.alt}
                className="h-4.5 w-auto opacity-80"
              />
            ))
          )}
        </div>
      </Marquee>
    </div>
  );
}
