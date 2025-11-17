import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientDetail from "../components/PatientDetail";

export default function PatientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "http://localhost:8000/patients";

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/${id}`);
        if (!res.ok) throw new Error("مراجع پیدا نشد");
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center text-gray-600">در حال بارگذاری...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>❌ {error}</p>
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
      {patient && <PatientDetail patient={patient} />}
    </div>
  );
}
