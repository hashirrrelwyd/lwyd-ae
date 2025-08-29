export default function Button({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-4xl text-sm hover:rounded-lg bg-lwyd-yellow px-5 py-1 text-white cursor-pointer transition-all duration-800 ease-in-out"
    >
      {title}
    </button>
  );
}
