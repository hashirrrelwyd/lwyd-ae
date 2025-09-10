import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { openRoles, roleDepartments } from "../../data/roles";
import { useState } from "react";

export default function OpenRoles() {
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);

  const locations = ["Location", "Onsite", "Remote"];

  return (
    <div className="bg-[#111111] m-1.5 px-[34px] py-12 text-white rounded-b-4xl rounded-t-4xl relative">
      <div className="flex justify-between pb-4">
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
              className="bg-[#FFFFFF1A] px-4 py-1 flex gap-3 items-center rounded-full"
            >
              <p>{selectedLocation}</p>
              <GoChevronDown className="text-xl" />
            </div>

            {showLocationDropdown && (
              <div className="absolute z-10 mt-2 bg-[#1e1e1e] border border-gray-700 rounded-sm w-full">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                    className="px-3 py-2 hover:bg-[#2a2a2a]"
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
              className="bg-[#FFFFFF1A] px-4 py-1 flex gap-3 items-center rounded-full"
            >
              <p>{selectedDepartment}</p>
              <GoChevronDown className="text-xl" />
            </div>

            {showDepartmentDropdown && (
              <div className="absolute z-10 mt-2 bg-[#1e1e1e] border border-gray-700 rounded-sm w-full">
                {["Department", ...roleDepartments].map((dept) => (
                  <div
                    key={dept}
                    onClick={() => {
                      setSelectedDepartment(dept);
                      setShowDepartmentDropdown(false);
                    }}
                    className="px-3 py-2 hover:bg-[#2a2a2a]"
                  >
                    {dept}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {openRoles
          .filter(
            (role) =>
              (selectedLocation === "Location" ||
                role.location === selectedLocation) &&
              (selectedDepartment === "Department" ||
                role.department === selectedDepartment)
          )
          .map((role, index) => (
            <div key={index} className="group">
              <div
                onClick={() => window.open(`${role.googleForm}`, "_blank")}
                className="flex justify-between items-center py-3 bg-[#292929] rounded-[8px] px-8 hover:rounded-[50px] transition-all duration-1000 ease-in-out"
              >
                {/* Left content: Role */}
                <div className="text-white">
                  <h3>{role.role}</h3>
                </div>

                {/* Right content: Tags and chevron */}
                <div className="flex items-center gap-2 transition-all duration-1000 ease-in-out group-hover:-translate-x-10">
                  <div className="bg-[#FFFFFF1A] px-2 py-1 rounded-full text-[#7D7D7D]">
                    {role.department}
                  </div>
                  <div className="bg-[#FFFFFF1A] px-2 py-1 rounded-full text-[#7D7D7D]">
                    {role.location}
                  </div>

                  {/* Chevron icon appears on hover */}
                  <GoChevronRight className="text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </div>

              
            </div>
          ))}
      </div>
    </div>
  );
}
