import { useEffect, useState } from "react";
import PatientChartSection from "./PatientChartSection";
import PatientGeneralInfo from "./PatientGeneralInfo";
import PatientVisit from "./PatientVisit";
import NewVisit from "./NewVisit";

export default function PatientDetail({ patient }) {
  const [patientState, setPatientState] = useState(patient); // canonical server copy in this component
  const [editedPatient, setEditedPatient] = useState(() =>
    patient ? structuredClone(patient) : null
  );
  const [selectedVisitIndex, setSelectedVisitIndex] = useState(0);
  const [editModeGeneral, setEditModeGeneral] = useState(false);
  const [editModeVisit, setEditModeVisit] = useState(false);
  const [newVisit, setNewVisit] = useState(false);
  const baseUrl = "http://localhost:8000/patients";

  // Keep local state in sync when parent passes a different patient (e.g. route change)
  useEffect(() => {
    if (patient) {
      setPatientState(patient);
      // deep clone so we don't mutate prop object
      setEditedPatient(structuredClone(patient));
      setSelectedVisitIndex(0);
      setEditModeGeneral(false);
      setEditModeVisit(false);
    }
  }, [patient]);

  // Helper to PUT updated patient to server and update local state
  const savePatientToServer = async (updated) => {
    try {
      const res = await fetch(`${baseUrl}/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("خطا در ذخیره‌سازی روی سرور");
      const serverCopy = await res.json();
      setPatientState(serverCopy);
      setEditedPatient(structuredClone(serverCopy));
      return serverCopy;
    } catch (err) {
      console.error(err);
      alert("ذخیره‌سازی ناموفق بود: " + err.message);
      throw err;
    }
  };

  const handleSaveGeneral = async () => {
    if (!editedPatient) return;
    try {
      await savePatientToServer(editedPatient);
      setEditModeGeneral(false);
    } catch {
      /* error already handled in savePatientToServer */
    }
  };

  const handleSaveVisit = async () => {
    if (!editedPatient) return;
    try {
      await savePatientToServer(editedPatient);
      setEditModeVisit(false);
    } catch {
      /* handled above */
    }
  };

  const handleAddNewVisit = async (newVisitData) => {
    if (!editedPatient) return;
    const updatedVisits = [...(editedPatient.visits || []), newVisitData];
    const updatedPatient = { ...editedPatient, visits: updatedVisits };
    try {
      const serverCopy = await savePatientToServer(updatedPatient);
      // set selected to newly added visit
      setSelectedVisitIndex(serverCopy.visits.length - 1);
      setNewVisit(false);
    } catch {
      /* handled */
    }
  };

  // ensure editedPatient exists before rendering children
  if (!editedPatient) {
    return <p className="p-6 text-center text-gray-600">در حال بارگذاری...</p>;
  }

  return (
    <div className="p-6 grid gap-6 text-right">
      <PatientGeneralInfo
        editedPatient={editedPatient}
        setEditedPatient={(updater) =>
          // accept either function or value
          setEditedPatient((prev) =>
            typeof updater === "function" ? updater(prev) : updater
          )
        }
        editModeGeneral={editModeGeneral}
        handleSaveGeneral={handleSaveGeneral}
        setEditModeGeneral={setEditModeGeneral}
      />

      <PatientVisit
        selectedVisitIndex={selectedVisitIndex}
        setSelectedVisitIndex={setSelectedVisitIndex}
        editedPatient={editedPatient}
        handleSaveVisit={handleSaveVisit}
        editModeVisit={editModeVisit}
        setEditModeVisit={setEditModeVisit}
        setEditedPatient={(updater) =>
          setEditedPatient((prev) =>
            typeof updater === "function" ? updater(prev) : updater
          )
        }
      />

      <button
        className={`text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition ${
          !newVisit ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600"
        }`}
        onClick={() => setNewVisit((p) => !p)}
      >
        {!newVisit ? "افزودن ویزیت جدید" : "انصراف"}
      </button>

      {newVisit && (
        <section className="bg-white rounded-lg shadow">
          <NewVisit
            patientId={patientState.id}
            patientGender={editedPatient.gender} // <-- add this
            onSave={handleAddNewVisit}
            onCancel={() => setNewVisit(false)}
          />
        </section>
      )}

      <section className="bg-white rounded-lg shadow p-4">
        <PatientChartSection patient={patientState} />
      </section>
    </div>
  );
}
