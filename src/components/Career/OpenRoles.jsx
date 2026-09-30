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
    // Height follows the content (no fixed h-screen), so there's no empty space
    // under a short list on tall screens; a long list scrolls inside (max 70% of the screen)
    <section id="open-roles" ref={sectionRef} className="relative w-full p-1.5">
      <div className="relative flex w-full flex-col rounded-4xl bg-[#111111] px-[calc(var(--side-padding)-6px)] py-10 lg:py-[max(2.5rem,3vw)] text-white">
      {/* Label + filters: side by side, wrapping onto two rows on small screens */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 pb-8 lg:pb-[max(2rem,2.5vw)]">
        <h3 className="section-label text-white">
          Open{" "}
          <span className="text-lwyd-yellow font-[750] italic">Roles</span>
        </h3>

        <div className="flex gap-3 sm:gap-4 relative">
          {/* Location Dropdown */}
          <div className="relative">
            <div
              onClick={() => {
                setShowLocationDropdown((prev) => !prev);
                setShowDepartmentDropdown(false);
              }}
              className="bg-[#FFFFFF1A] px-4 sm:px-6 py-2.5 flex gap-2 sm:gap-3 items-center rounded-full text-base sm:text-lg cursor-pointer"
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
              className="bg-[#FFFFFF1A] px-4 sm:px-6 py-2.5 flex gap-2 sm:gap-3 items-center rounded-full text-base sm:text-lg cursor-pointer"
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

      {/* no-scrollbar: the list can still scroll (wheel/touch) when it's taller than 70% of the
          screen, but the inner scrollbar is hidden */}
      <div className="no-scrollbar flex max-h-[70vh] flex-col gap-4 lg:gap-5 overflow-y-auto">
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
                  // phones: title above the tags; sm+: title left, tags right
                  className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:items-center py-4 sm:py-5 bg-[#292929] rounded-[8px] px-5 sm:px-10 transition-all duration-700 ease-in-out hover:rounded-[50px] cursor-pointer"
                >
                  {/* Left content: Role */}
                  <div className="text-white font-light text-lg sm:text-xl md:text-2xl">
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
                  {/* Tags + chevron. The chevron takes no space until hover, then grows in and
                      pushes the tags left — so the right padding always equals the left padding */}
                  <div className="flex shrink-0 items-center">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-[#FFFFFF1A] px-3 py-1.5 rounded-full text-[#7D7D7D] text-sm sm:text-base whitespace-nowrap">
                        {role.department}
                      </div>
                      <div className="bg-[#FFFFFF1A] px-3 py-1.5 rounded-full text-[#7D7D7D] text-sm sm:text-base whitespace-nowrap">
                        {role.location}
                      </div>
                    </div>

                    {/* Chevron icon appears on hover */}
                    {/* arrow: ~26px on a 1920px monitor, scaling with the screen (min 20px) */}
                    <span className="flex w-0 items-center justify-end overflow-hidden opacity-0 transition-all duration-700 ease-in-out group-hover:w-[max(2.25rem,2.1vw)] group-hover:opacity-100">
                      <GoChevronRight className="shrink-0 text-white text-[max(1.25rem,1.35vw)]" />
                    </span>
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
