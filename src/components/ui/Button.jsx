export default function Button({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-4xl text-[max(12px,0.875rem)] font-[400] leading-[1.3] whitespace-nowrap hover:rounded-lg bg-lwyd-yellow px-6 py-4 text-black cursor-pointer transition-all duration-700 ease-in-out group"
    >
      {/* Text wrapper (clipping only text, not button). 1.3em tall so descenders (g, y, p) aren't cut off */}
      <span className="relative flex h-[1.3em] overflow-hidden items-center justify-center">
        {/* Default text */}
        <span className="block transition-transform duration-500 group-hover:-translate-y-full">
          {title}
        </span>
        {/* Rolling text */}
        <span className="absolute left-0 right-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
          {title}
        </span>
      </span>
    </button>
  );
}
