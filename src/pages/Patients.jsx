import { useState, useEffect } from "react";
import Patient from "../components/Patient";
import Pagination from "../components/Pagination";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 15;

  const baseUrl = "http://localhost:8000/patients";

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await fetch(baseUrl);
        if (!res.ok) throw new Error("خطا در بارگذاری مراجعین");
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // ✅ Compute last visit (timestamp + formatted date)
  const patientsWithLastVisit = patients.map((p) => {
    let lastVisitTimestamp = null;
    if (p.visits && p.visits.length > 0) {
      lastVisitTimestamp = Math.max(...p.visits.map((v) => v.date));
    }

    const lastVisitDate = lastVisitTimestamp
      ? new Date(lastVisitTimestamp).toLocaleDateString("fa-IR")
      : "بدون ویزیت";

    return { ...p, lastVisitDate, lastVisitTimestamp };
  });

  // ✅ Filter by search term
  const filteredPatients = patientsWithLastVisit.filter((p) =>
    [p.firstName, p.lastName, p.phone, p.id?.toString()].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ✅ Sort correctly
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    // special case: sort by last visit timestamp instead of formatted text
    if (sortField === "lastVisit") {
      valA = a.lastVisitTimestamp || 0;
      valB = b.lastVisitTimestamp || 0;
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // ✅ Pagination
  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = sortedPatients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading)
    return <p className="p-6 text-center text-gray-600">در حال بارگذاری...</p>;
  if (error) return <p className="p-6 text-center text-red-600">❌ {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-emerald-700 mb-4 border-b-4 border-emerald-500 pb-2">
        لیست مراجعین
      </h1>

      {/* Search bar */}
      <div className="w-[90%] bg-emerald-50 rounded-lg p-3 shadow flex justify-between mb-2 mx-auto">
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

      {/* Header */}
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
        {currentPatients.map((patientData) => (
          <Patient
            key={patientData.id}
            patientData={{
              ...patientData,
              lastVisit: patientData.lastVisitDate, // 👈 display formatted date
            }}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
