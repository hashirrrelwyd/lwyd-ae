import React, { useState } from 'react'
import Button from '../ui/Button'
import { ArrowUpRight } from "lucide-react";
const menuItems = [
  { title: "Creative Development", link: "#", bg: "/images/bg1.jpg" },
  { title: "Experience Design", link: "#", bg: "/images/bg2.jpg" },
  { title: "Digital Strategy", link: "#", bg: "/images/bg3.jpg" },
  { title: "Media Services", link: "#", bg: "/images/bg4.jpg" },
  { title: "Video Production", link: "#", bg: "/images/bg5.jpg" },
  { title: "Social Media Marketing", link: "#", bg: "/images/bg6.jpg" },
];

export default function OurService() {
    const [hovered, setHovered] = useState(null);
  return (
    <section className='section-padding'>
        <div className="flex justify-between">
            <div><h2 className='text-3xl font-[500]'><span className='font-[750] italic text-lwyd-yellow'>Our</span> <span className="relative -mb-1 inline-flex align-middle">
              <img
                src="/images/button-img.png"
                alt=""
                className="h-8 mb-2 w-16 rounded-full object-cover"
              />
            </span> Service</h2></div>
            <div><Button title={"View All Services"}  /></div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 w-full max-w-4xl mx-auto">
      {menuItems.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          className={`relative group flex items-center justify-between px-6 py-4 
                      rounded-full text-lg font-medium text-gray-600 
                      overflow-hidden transition-all duration-500 ease-in-out 
                      w-[48%] cursor-pointer`}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* background */}
          <div
            className={`absolute inset-0 rounded-full bg-cover bg-center opacity-0 
                        group-hover:opacity-100 transition-all duration-500`}
            style={{
              backgroundImage: `url(${item.bg})`,
            }}
          />

          {/* text */}
          <span
            className={`relative z-10 transition-all duration-500 
                        group-hover:text-white group-hover:font-semibold`}
          >
            {item.title.split(" ")[0]}{" "}
            <span className="group-hover:text-yellow-400">{item.title.split(" ")[1] || ""}</span>
          </span>

          {/* arrow */}
          <ArrowUpRight
            className={`relative z-10 transform translate-x-3 opacity-0 
                        group-hover:opacity-100 group-hover:translate-x-0 
                        transition-all duration-500 text-white`}
            size={20}
          />
        </a>
      ))}
    </div>
    </section>
  )
}
