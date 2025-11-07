import { useState } from "react";
import PatientChartSection from "./patientChartSection";

export default function PatientDetail({ patient }) {
  const [selectedVisitIndex, setSelectedVisitIndex] = useState(0);
  const [editedPatient, setEditedPatient] = useState(patient);
  const [editModeGeneral, setEditModeGeneral] = useState(false);
  const [editModeVisit, setEditModeVisit] = useState(false);

  const selectedVisit = editedPatient.visits[selectedVisitIndex];

  const handleSaveGeneral = () => {
    setEditModeGeneral(false);
    // later: send PUT/PATCH request here
  };

  const handleSaveVisit = () => {
    setEditModeVisit(false);
    // later: send PUT/PATCH request here
  };

  return (
    <div className="p-6 grid gap-6 text-right">
      {/* 🩺 General Info */}
      <section className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-emerald-700 font-bold text-xl">اطلاعات کلی</h2>
          {editModeGeneral ? (
            <div className="flex gap-2">
              <button
                onClick={handleSaveGeneral}
                className="bg-emerald-600 text-white px-3 py-1 rounded-md hover:bg-emerald-700"
              >
                ذخیره
              </button>
              <button
                onClick={() => setEditModeGeneral(false)}
                className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400"
              >
                انصراف
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditModeGeneral(true)}
              className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md hover:bg-emerald-200"
            >
              ویرایش اطلاعات کلی
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <p>
            <strong>نام:</strong>{" "}
            {editModeGeneral ? (
              <input
                type="text"
                value={editedPatient.firstName}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    firstName: e.target.value,
                  })
                }
                className="border rounded px-2 py-1"
              />
            ) : (
              editedPatient.firstName
            )}
          </p>

          <p>
            <strong>نام خانوادگی:</strong>{" "}
            {editModeGeneral ? (
              <input
                type="text"
                value={editedPatient.lastName}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    lastName: e.target.value,
                  })
                }
                className="border rounded px-2 py-1"
              />
            ) : (
              editedPatient.lastName
            )}
          </p>

          <p>
            <strong>شماره تماس:</strong>{" "}
            {editModeGeneral ? (
              <input
                type="text"
                value={editedPatient.phone}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    phone: e.target.value,
                  })
                }
                className="border rounded px-2 py-1"
              />
            ) : (
              editedPatient.phone
            )}
          </p>

          <p>
            <strong>سن:</strong>{" "}
            {editModeGeneral ? (
              <input
                type="number"
                value={editedPatient.age}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    age: e.target.value,
                  })
                }
                className="border rounded px-2 py-1"
              />
            ) : (
              editedPatient.age
            )}
          </p>

          <p>
            <strong>شرایط پزشکی:</strong>{" "}
            {editModeGeneral ? (
              <input
                type="text"
                value={editedPatient.medicalConditions}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    medicalConditions: e.target.value,
                  })
                }
                className="border rounded px-2 py-1"
              />
            ) : (
              editedPatient.medicalConditions
            )}
          </p>

          <p>
            <strong>یادداشت کلی:</strong>{" "}
            {editModeGeneral ? (
              <textarea
                value={editedPatient.generalNotes}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    generalNotes: e.target.value,
                  })
                }
                className="border rounded px-2 py-1"
              />
            ) : (
              editedPatient.generalNotes
            )}
          </p>
        </div>
      </section>

      {/* 🗓 Visits */}
      <section className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-emerald-700 font-bold text-xl">ویزیت‌ها</h2>

          <div className="flex gap-2 items-center">
            <select
              className="border rounded-md px-2 py-1"
              onChange={(e) => setSelectedVisitIndex(Number(e.target.value))}
              value={selectedVisitIndex}
            >
              {editedPatient.visits.map((v, i) => (
                <option key={i} value={i}>
                  {new Date(v.date).toLocaleDateString("fa-IR")}
                </option>
              ))}
            </select>

            {editModeVisit ? (
              <>
                <button
                  onClick={handleSaveVisit}
                  className="bg-emerald-600 text-white px-3 py-1 rounded-md hover:bg-emerald-700"
                >
                  ذخیره ویزیت
                </button>
                <button
                  onClick={() => setEditModeVisit(false)}
                  className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400"
                >
                  انصراف
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditModeVisit(true)}
                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md hover:bg-emerald-200"
              >
                ویرایش ویزیت
              </button>
            )}
          </div>
        </div>

        {/* Visit details */}
        <div className="grid grid-cols-2 gap-3">
          <p>
            <strong>وزن:</strong>{" "}
            {editModeVisit ? (
              <input
                type="number"
                value={selectedVisit.weight}
                onChange={(e) => {
                  const newVisits = [...editedPatient.visits];
                  newVisits[selectedVisitIndex].weight = e.target.value;
                  setEditedPatient({ ...editedPatient, visits: newVisits });
                }}
                className="border rounded px-2 py-1"
              />
            ) : (
              selectedVisit.weight + " kg"
            )}
          </p>

          <p>
            <strong>قد:</strong>{" "}
            {editModeVisit ? (
              <input
                type="number"
                value={selectedVisit.height}
                onChange={(e) => {
                  const newVisits = [...editedPatient.visits];
                  newVisits[selectedVisitIndex].height = e.target.value;
                  setEditedPatient({ ...editedPatient, visits: newVisits });
                }}
                className="border rounded px-2 py-1"
              />
            ) : (
              selectedVisit.height + " cm"
            )}
          </p>

          <p>
            <strong>کالری پیشنهادی:</strong>{" "}
            {editModeVisit ? (
              <input
                type="number"
                value={selectedVisit.suggestedCalories}
                onChange={(e) => {
                  const newVisits = [...editedPatient.visits];
                  newVisits[selectedVisitIndex].suggestedCalories =
                    e.target.value;
                  setEditedPatient({ ...editedPatient, visits: newVisits });
                }}
                className="border rounded px-2 py-1"
              />
            ) : (
              selectedVisit.suggestedCalories
            )}
          </p>
          <p>
            <strong>درصد چربی:</strong>{" "}
            {editModeVisit ? (
              <input
                type="number"
                value={selectedVisit.fatPercent}
                onChange={(e) => {
                  const newVisits = [...editedPatient.visits];
                  newVisits[selectedVisitIndex].fatPercent = e.target.value;
                  setEditedPatient({ ...editedPatient, visits: newVisits });
                }}
                className="border rounded px-2 py-1"
              />
            ) : (
              selectedVisit.fatPercent
            )}
          </p>
          <p>
            <strong>درصد عضله:</strong>{" "}
            {editModeVisit ? (
              <input
                type="number"
                value={selectedVisit.leanMassPercent}
                onChange={(e) => {
                  const newVisits = [...editedPatient.visits];
                  newVisits[selectedVisitIndex].leanMassPercent =
                    e.target.value;
                  setEditedPatient({ ...editedPatient, visits: newVisits });
                }}
                className="border rounded px-2 py-1"
              />
            ) : (
              selectedVisit.leanMassPercent
            )}
          </p>
        </div>

        <button className="bg-emerald-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-emerald-700 transition">
          افزودن ویزیت جدید
        </button>
      </section>
      <section className="bg-white rounded-lg shadow p-4">
        <PatientChartSection patient={patient} />
      </section>
    </div>
  );
}
