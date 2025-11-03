import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Salad,
  ChevronDown,
  ChevronUp,
  PlusCircle,
} from "lucide-react";

function NavBar() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (name) => {
    setOpenSection(openSection === name ? null : name);
  };

  return (
    <nav
      dir="rtl"
      className="flex flex-col gap-2 text-white py-1  rounded-xl h-full "
    >
      {/* Dashboard */}
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-1  py-2 rounded-lg transition-colors duration-200 text-right ${
            isActive
              ? "bg-emerald-700 text-white"
              : "text-emerald-600 hover:text-emerald-400"
          }`
        }
      >
        <Home className="w-5 h-5" />
        <span className="text-sm ">صفحه اصلی</span>
      </NavLink>

      {/* Patients section */}
      <div>
        <button
          onClick={() => toggleSection("patients")}
          className={`flex px-1 items-center justify-between w-full  py-2 rounded-lg transition 
            ${
              openSection === "patients"
                ? "bg-emerald-700 text-white"
                : "text-emerald-600 hover:text-emerald-400"
            }`}
        >
          <div className="flex items-center gap-2 text-right">
            <Users className="w-5 h-5" />
            <span className="text-sm">مراجعین</span>
          </div>
          {openSection === "patients" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            openSection === "patients"
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mt-1 pl-8 flex flex-col gap-1 text-sm">
            <NavLink
              to="/patients"
              end
              className={({ isActive }) =>
                `flex items-center gap-2  py-2 rounded-md transition ${
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "text-emerald-700 hover:text-emerald-400"
                }`
              }
            >
              <Users className="w-4 h-4" /> همه مراجعین
            </NavLink>

            <NavLink
              to="/patients/new"
              className={({ isActive }) =>
                `flex items-center gap-2  py-1 rounded-md transition ${
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "text-emerald-700 hover:text-emerald-400"
                }`
              }
            >
              <PlusCircle className="w-4 h-4" /> افزودن مراجع جدید
            </NavLink>
          </ul>
        </div>
      </div>

      {/* Diet Plans section */}
      <div>
        <button
          onClick={() => toggleSection("diet")}
          className={`flex px-1 items-center justify-between w-full  py-2 rounded-lg transition 
            ${
              openSection === "diet"
                ? "bg-emerald-700 text-white"
                : "text-emerald-600 hover:text-emerald-400"
            }`}
        >
          <div className="flex items-center gap-2 text-right">
            <Salad className="w-5 h-5" />
            <span className="text-sm">رژیم‌های غذایی</span>
          </div>
          {openSection === "diet" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            openSection === "diet"
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mt-1 pl-8 flex flex-col gap-1 text-sm">
            <NavLink
              to="/diet-plans"
              end
              className={({ isActive }) =>
                `flex items-center gap-2  py-1 rounded-md transition ${
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "text-emerald-700 hover:text-emerald-400"
                }`
              }
            >
              <Salad className="w-4 h-4 text-xs" /> همه رژیم‌ها
            </NavLink>

            <NavLink
              to="/diet-plans/new"
              className={({ isActive }) =>
                `flex items-center gap-1  py-1 rounded-md transition ${
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "text-emerald-700 hover:text-emerald-400"
                }`
              }
            >
              <PlusCircle className="w-4 h-4 text-xs" /> افزودن رژیم جدید
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
