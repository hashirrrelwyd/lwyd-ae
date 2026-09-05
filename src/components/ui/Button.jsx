export default function Button({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-4xl text-sm font-light hover:rounded-lg bg-lwyd-yellow px-5 py-2 text-black cursor-pointer transition-all duration-700 ease-in-out group"
    >
      {/* Text wrapper (clipping only text, not button) */}
      <span className="relative flex h-[1em] overflow-hidden items-center justify-center">
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
