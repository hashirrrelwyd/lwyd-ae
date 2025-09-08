import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "../../context/CursorContext";
// import "./css/lwydteam.css"
import { teamData } from "../../data/team";

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("all");

  const { setHoverType } = useCursor();

  const filteredTeam =
    currentCategory === "all"
      ? teamData
      : teamData.filter((member) => member.category === currentCategory);

  const current = filteredTeam[currentIndex];
  const nextIndex = (currentIndex + 1) % filteredTeam.length;
  const next = filteredTeam[nextIndex];

  const handleNextClick = () => {
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="h-screen bg-[#111111] rounded-b-4xl px-6 md:px-10 py-10 text-white">
      <h3 className="text-[22px] font-[500] text-white mb-8">
          Meet{" "}
          <span className="text-lwyd-yellow font-[750] italic">Our</span> Team
        </h3>

      <div className="flex pt-12">
        {/* Left panel: current content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center w-2/3 items-center justify-center relative overflow-hidden"
          >
            <div className="flex justify-around">
              <div className="flex flex-col items-center justify-center w-2/4">
                <h2
                  
                  className="text-4xl mb-4"
                >
                  {current.title}
                  <span className="text-lwyd-yellow">.</span>
                </h2>
                <p
                 
                  className="text-xl mb-8 text-[#7D7D7D]"
                >
                  "{current.subtitle}"
                </p>
              </div>
              <div className="w-2/4">
                <img
                  src={current.image}
                  alt={current.title}
                  className="mx-auto rounded-lg max-h-[400px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right panel: next content preview */}
        <div
          className="w-1/3 flex flex-col justify-center items-center text-[#7D7D7D] cursor-none"
          onClick={handleNextClick}
          onMouseEnter={() => setHoverType("next")}
          onMouseLeave={() => setHoverType("default")}
        >
          <h3 className="text-xl mb-2 transition-colors">{next.title}</h3>
          <p className="text-sm">"{next.subtitle}"</p>
        </div>
      </div>

      {/* Filter and Preview Images */}
      <div className="flex flex-col mt-12">
        {/* Category selection */}
        <div className="flex gap-4 mb-4">
          <div
            className={`flex ${
              currentCategory === "all" ? "text-lwyd-yellow" : ""
            } text-[#7D7D7D] items-center gap-2`}
          >
            <button
              onClick={() => {
                setCurrentCategory("all");
                setCurrentIndex(0);
              }}
              className={`text-lg px-2 py-2 rounded-full cursor-none ${
                currentCategory === "all"
                  ? "bg-yellow-400"
                  : "border border-[#7D7D7D]"
              }`}
            ></button>
            All
          </div>
          <div
            className={`flex ${
              currentCategory === "Leadership" ? "text-lwyd-yellow" : ""
            } text-[#7D7D7D] items-center gap-2`}
          >
            <button
              onClick={() => {
                setCurrentCategory("Leadership");
                setCurrentIndex(0);
              }}
              className={`text-lg px-2 py-2 rounded-full cursor-none ${
                currentCategory === "Leadership"
                  ? "bg-yellow-400"
                  : "border border-[#7D7D7D]"
              }`}
            ></button>
            Leadership
          </div>
          <div
            className={`flex ${
              currentCategory === "Lead" ? "text-lwyd-yellow" : ""
            } text-[#7D7D7D] items-center gap-2`}
          >
            <button
              onClick={() => {
                setCurrentCategory("Lead");
                setCurrentIndex(0);
              }}
              className={`text-lg px-2 py-2 rounded-full cursor-none ${
                currentCategory === "Lead"
                  ? "bg-yellow-400"
                  : "border border-[#7D7D7D]"
              }`}
            ></button>
            Lead
          </div>
          <div
            className={`flex ${
              currentCategory === "Designer" ? "text-lwyd-yellow" : ""
            } text-[#7D7D7D] items-center gap-2`}
          >
            <button
              onClick={() => {
                setCurrentCategory("Designer");
                setCurrentIndex(0);
              }}
              className={`text-lg px-2 py-2 rounded-full cursor-none ${
                currentCategory === "Designer"
                  ? "bg-yellow-400"
                  : "border border-[#7D7D7D]"
              }`}
            ></button>
            Designer
          </div>

          <div
            className={`flex ${
              currentCategory === "AM" ? "text-lwyd-yellow" : ""
            } text-[#7D7D7D] items-center gap-2`}
          >
            <button
              onClick={() => {
                setCurrentCategory("AM");
                setCurrentIndex(0);
              }}
              className={`text-lg px-2 py-2 rounded-full cursor-none ${
                currentCategory === "AM"
                  ? "bg-yellow-400"
                  : "border border-[#7D7D7D]"
              }`}
            ></button>
            Account Managers
          </div>
          <div
            className={`flex ${
              currentCategory === "Developer" ? "text-lwyd-yellow" : ""
            } text-[#7D7D7D] items-center gap-2`}
          >
            <button
              onClick={() => {
                setCurrentCategory("Developer");
                setCurrentIndex(0);
              }}
              className={`text-lg px-2 py-2 rounded-full cursor-none ${
                currentCategory === "Developer"
                  ? "bg-yellow-400"
                  : "border border-[#7D7D7D]"
              }`}
            ></button>
            Developer
          </div>
          <div
            className={`flex ${
              currentCategory === "Friyay" ? "text-lwyd-yellow" : ""
            } text-[#7D7D7D] items-center gap-2`}
          >
            <button
              onClick={() => {
                setCurrentCategory("Friyay");
                setCurrentIndex(0);
              }}
              className={`text-lg px-2 py-2 rounded-full cursor-none ${
                currentCategory === "Friyay"
                  ? "bg-yellow-400"
                  : "border border-[#7D7D7D]"
              }`}
            ></button>
            Friyay
          </div>
          <div
            className={`flex ${
              currentCategory === "Hr&Finance" ? "text-lwyd-yellow" : ""
            } text-[#7D7D7D] items-center gap-2`}
          >
            <button
              onClick={() => setCurrentCategory("Hr&Finance")}
              className={`text-lg px-2 py-2 rounded-full cursor-none ${
                currentCategory === "Hr&Finance"
                  ? "bg-yellow-400"
                  : "border border-[#7D7D7D]"
              }`}
            ></button>
            HR & Finance
          </div>
        </div>
      </div>
      {/* Thumbnails Preview */}
      <div className="flex gap-4 w-full overflow-x-auto overflow-y-hidden whitespace-nowrap" >
        {filteredTeam.map((member, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center ${
              index === currentIndex ? "border-1 border-white rounded-lg" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={member.image}
              alt={member.title}
              className={`transition-all duration-700 rounded-md object-cover w-15 h-20 ${
                index === currentIndex ? "scale-80" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
