import { useParams, useNavigate } from "react-router-dom";
import patientsData from "../data/patientsData"; // adjust path if needed
import PatientDetail from "../components/PatientDetail";

export default function PatientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the patient by id (convert id to number)
  const patient = patientsData.find((p) => p.id === Number(id));

  // Handle case: no patient found
  if (!patient) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>❌ مراجع با این شناسه پیدا نشد.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
        >
          بازگشت
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
      >
        بازگشت به لیست مراجعین
      </button>

      {/* Patient Details */}
      <PatientDetail patient={patient} />
    </div>
  );
}
