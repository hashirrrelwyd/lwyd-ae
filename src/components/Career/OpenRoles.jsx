import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { openRoles, roleDepartments } from "../../data/roles";
import { useRef, useState } from "react";
import { useSectionTheme } from "../../hooks/useHeaderThemeSection";

export default function OpenRoles() {
  const sectionRef = useRef(null);
  useSectionTheme(sectionRef, "dark");
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);

  const locations = ["Location", "Onsite", "Remote"];

  return (
    <section ref={sectionRef} className="relative h-screen w-full p-1.5">
      <div className="relative flex h-full w-full flex-col rounded-b-4xl rounded-t-4xl bg-[#111111] px-[34px] py-12 text-white">
      <div className="flex shrink-0 justify-between pb-6">
        <div>
          <h3 className="text-[22px] font-[500] text-white mb-8">
            Open{" "}
            <span className="text-lwyd-yellow font-[750] italic">Roles</span>
          </h3>
        </div>

        <div className="flex gap-4 relative">
          {/* Location Dropdown */}
          <div className="relative">
            <div
              onClick={() => {
                setShowLocationDropdown((prev) => !prev);
                setShowDepartmentDropdown(false);
              }}
              className="bg-[#FFFFFF1A] px-6 py-2.5 flex gap-3 items-center rounded-full text-lg cursor-pointer"
            >
              <p>{selectedLocation}</p>
              <GoChevronDown className="text-2xl" />
            </div>

            {showLocationDropdown && (
              <div className="absolute z-10 mt-2 min-w-full bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                    className="px-5 py-3 text-base whitespace-nowrap hover:bg-[#2a2a2a] cursor-pointer"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Department Dropdown */}
          <div className="relative">
            <div
              onClick={() => {
                setShowDepartmentDropdown((prev) => !prev);
                setShowLocationDropdown(false);
              }}
              className="bg-[#FFFFFF1A] px-6 py-2.5 flex gap-3 items-center rounded-full text-lg cursor-pointer"
            >
              <p>{selectedDepartment}</p>
              <GoChevronDown className="text-2xl" />
            </div>

            {showDepartmentDropdown && (
              <div className="absolute z-10 mt-2 min-w-full bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden">
                {["Department", ...roleDepartments].map((dept) => (
                  <div
                    key={dept}
                    onClick={() => {
                      setSelectedDepartment(dept);
                      setShowDepartmentDropdown(false);
                    }}
                    className="px-5 py-3 text-base whitespace-nowrap hover:bg-[#2a2a2a] cursor-pointer"
                  >
                    {dept}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto pr-1">
        {openRoles
          .filter(
            (role) =>
              (selectedLocation === "Location" ||
                role.location === selectedLocation) &&
              (selectedDepartment === "Department" ||
                role.department === selectedDepartment)
          )
          .map((role, index) => {
            const words = role.role.split(" ");
            const lastWord = words.pop();
            const restWords = words.join(" ");

            return (
              <div key={index} className="group shrink-0">
                <div
                  onClick={() => window.open(`${role.googleForm}`, "_blank")}
                  className="flex justify-between items-center py-5 bg-[#292929] rounded-[8px] px-10 transition-all duration-700 ease-in-out hover:rounded-[50px] cursor-pointer"
                >
                  {/* Left content: Role */}
                  <div className="text-white font-light text-xl md:text-2xl">
                    <h3>
                      {restWords && <>{restWords} </>}
                      <span className="relative inline-grid">
                        {/* reserves the (wider) bold+italic width from the start, so nothing reflows on hover */}
                        <span className="invisible col-start-1 row-start-1 font-[750] italic">
                          {lastWord}
                        </span>
                        <span className="col-start-1 row-start-1 transition-opacity duration-500 group-hover:opacity-0">
                          {lastWord}
                        </span>
                        <span className="col-start-1 row-start-1 font-[750] italic text-[#FFCC00] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {lastWord}
                        </span>
                      </span>
                    </h3>
                  </div>

                  {/* Right content: Tags and chevron */}
                  <div className="flex items-center gap-3 transition-all duration-700 ease-in-out group-hover:-translate-x-10">
                    <div className="bg-[#FFFFFF1A] px-3 py-1.5 rounded-full text-[#7D7D7D] text-base">
                      {role.department}
                    </div>
                    <div className="bg-[#FFFFFF1A] px-3 py-1.5 rounded-full text-[#7D7D7D] text-base">
                      {role.location}
                    </div>

                    {/* Chevron icon appears on hover */}
                    <GoChevronRight className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      </div>
    </section>
  );
}
