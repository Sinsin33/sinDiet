import { useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";

export default function SidebarUserSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div dir="rtl" className="text-right">
      {/* Header (clickable) */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex  items-center justify-between w-full px-4 py-2 text-white bg-emerald-200 hover:bg-emerald-400 rounded-lg transition"
      >
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-700" />
          <span className="text-emerald-700">سینا امیرجانی</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-emerald-700" />
        ) : (
          <ChevronDown className="w-4 h-4 text-emerald-700" />
        )}
      </button>

      {/* Expandable content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-emerald-200 rounded-lg mt-1 text-sm">
          <li className="px-4 py-2 hover:bg-emerald-400 cursor-pointer text-emerald-700">
            پروفایل
          </li>
          <li className="px-4 py-2 hover:bg-emerald-400 cursor-pointer text-emerald-700">
            تنظیمات
          </li>
          <li className="px-4 py-2 hover:bg-emerald-400 cursor-pointer text-emerald-700">
            خروج
          </li>
        </ul>
      </div>
      <hr className="border-t border-gray-600 my-2" />
    </div>
  );
}
