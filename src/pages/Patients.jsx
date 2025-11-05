import { useState } from "react";

import Patient from "../components/patient";
import patientsData from "../data/patientsData";
import Pagination from "../components/Pagination";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' | 'desc'
  const itemsPerPage = 15;

  // 🔍 Filter full dataset (before slicing)
  const filteredPatients = patientsData.filter((p) =>
    [p.firstName, p.lastName, p.phone, p.id.toString()].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // 🔽 Sort filtered data
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // 🔢 Pagination
  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = sortedPatients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔁 Handle sorting click
  const handleSort = (field) => {
    if (sortField === field) {
      // toggle order if same field clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-emerald-700 mb-4 border-b-4 border-emerald-500 pb-2">
        لیست مراجعین
      </h1>

      {/* Search & Filter bar */}
      <div className="w-[90%] bg-emerald-50 rounded-lg p-3 shadow flex justify-between mb-2 mx-auto">
        {/* Search bar */}
        <div className="mb-3 flex justify-end">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 text-right"
          />
        </div>
        <div className="w-32 bg-emerald-200 text-emerald-800 font-medium rounded-md flex items-center justify-center">
          فیلتر
        </div>
      </div>

      {/* Header (click to sort) */}
      <div className="bg-emerald-600 text-white rounded-md px-1 py-2 grid grid-cols-5 text-right mb-1">
        <span className="cursor-pointer" onClick={() => handleSort("id")}>
          شماره پرونده {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
        </span>
        <span
          className="cursor-pointer"
          onClick={() => handleSort("firstName")}
        >
          اسم {sortField === "firstName" && (sortOrder === "asc" ? "↑" : "↓")}
        </span>
        <span className="cursor-pointer" onClick={() => handleSort("lastName")}>
          نام خانوادگی{" "}
          {sortField === "lastName" && (sortOrder === "asc" ? "↑" : "↓")}
        </span>
        <span className="cursor-pointer" onClick={() => handleSort("phone")}>
          شماره تماس{" "}
          {sortField === "phone" && (sortOrder === "asc" ? "↑" : "↓")}
        </span>
        <span
          className="cursor-pointer"
          onClick={() => handleSort("lastVisit")}
        >
          آخرین مراجعه{" "}
          {sortField === "lastVisit" && (sortOrder === "asc" ? "↑" : "↓")}
        </span>
      </div>

      {/* Table body */}
      <div className="bg-white rounded-lg p-3 h-[75vh] overflow-y-scroll shadow-inner">
        {currentPatients.map((patientData) => {
          return <Patient key={patientData.id} patientData={patientData} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
