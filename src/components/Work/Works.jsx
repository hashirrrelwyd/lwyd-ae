import React from "react";

export default function Works() {
  const items = [
    {
      src: "/images/media.webp",
      text: "Lorem ipsum dolor dolor",
      year: "2021",
    },
    {
      src: "/images/media.webp",
      text: "Lorem ipsum dolor dolor",
      year: "2022",
    },
    {
      src: "/images/media.webp",
      text: "Lorem ipsum dolor dolor",
      year: "2023",
    },
    {
      src: "/images/media.webp",
      text: "Lorem ipsum dolor dolor",
      year: "2024",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-12 section-padding">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden"
        >
          <img
            src={item.src}
            alt={item.text}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-2 left-2 text-white text-sm font-light">
            {item.text} <span className="opacity-70">({item.year})</span>
          </div>
        </div>
      ))}
    </div>
  );
}
