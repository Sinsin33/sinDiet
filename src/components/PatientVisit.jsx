import { useState, useEffect } from "react";
import CalorieCalculator from "./CalorieCalculator";
import JalaliDateInput from "./JalaliDateInput";

function PatientVisit({
  setEditModeVisit,
  selectedVisitIndex,
  setSelectedVisitIndex,
  editedPatient,
  handleSaveVisit,
  editModeVisit,
  setEditedPatient,
}) {
  const selectedVisit = editedPatient.visits[selectedVisitIndex];

  // Temporary state for live calculation
  const [tempWeight, setTempWeight] = useState(0);
  const [tempHeight, setTempHeight] = useState(0);
  const [tempPal, setTempPal] = useState(1);

  // Initialize temp states whenever selectedVisit changes
  useEffect(() => {
    if (selectedVisit) {
      setTempWeight(Number(selectedVisit.weight) || 0);
      setTempHeight(Number(selectedVisit.height) || 0);
      setTempPal(Number(selectedVisit.physicalActivityMultiplier) || 1);
    }
  }, [selectedVisit]);

  if (!selectedVisit) {
    return (
      <div className="p-4 text-center text-gray-500">
        هنوز ویزیتی ثبت نشده است.
      </div>
    );
  }

  // Immutable update helper
  const updateVisitField = (field, value) => {
    const updatedVisits = editedPatient.visits.map((visit, index) =>
      index === selectedVisitIndex ? { ...visit, [field]: value } : visit
    );
    setEditedPatient({
      ...editedPatient,
      visits: updatedVisits,
    });
  };

  return (
    <section className="bg-white rounded-lg shadow p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-emerald-700 font-bold text-xl">ویزیت‌ها</h2>

          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">انتخاب ویزیت:</span>
              <select
                className="border rounded-md px-3 py-2 min-w-[150px]"
                onChange={(e) => setSelectedVisitIndex(Number(e.target.value))}
                value={selectedVisitIndex}
              >
                {editedPatient.visits.map((v, i) => (
                  <option key={i} value={i}>
                    {new Date(v.date).toLocaleDateString("fa-IR")}
                  </option>
                ))}
              </select>
            </div>

            {editModeVisit ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveVisit}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  ذخیره ویزیت
                </button>
                <button
                  onClick={() => setEditModeVisit(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  انصراف
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditModeVisit(true)}
                className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-200 transition-colors"
              >
                ویرایش ویزیت
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Visit fields */}
      <div className="grid grid-cols-2 gap-4">
        {/* Date */}
        <div className="flex flex-col gap-1">
          <strong>تاریخ:</strong>
          {editModeVisit ? (
            <JalaliDateInput
              value={selectedVisit.date}
              onChange={(newTimestamp) =>
                updateVisitField("date", newTimestamp)
              }
            />
          ) : selectedVisit.date ? (
            <span className="text-gray-700">
              {new Date(selectedVisit.date).toLocaleDateString("fa-IR")}
            </span>
          ) : (
            <span className="text-gray-500">ثبت نشده</span>
          )}
        </div>

        {/* Weight */}
        <div className="flex flex-col gap-1">
          <strong>وزن:</strong>
          {editModeVisit ? (
            <input
              type="number"
              value={tempWeight}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTempWeight(val);
                updateVisitField("weight", val);
              }}
              className="border rounded px-3 py-2"
            />
          ) : (
            <span className="text-gray-700">{selectedVisit.weight} kg</span>
          )}
        </div>

        {/* Height */}
        <div className="flex flex-col gap-1">
          <strong>قد:</strong>
          {editModeVisit ? (
            <input
              type="number"
              value={tempHeight}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTempHeight(val);
                updateVisitField("height", val);
              }}
              className="border rounded px-3 py-2"
            />
          ) : (
            <span className="text-gray-700">{selectedVisit.height} cm</span>
          )}
        </div>

        {/* PAL */}
        <div className="flex flex-col gap-1">
          <strong>سطح فعالیت بدنی (PAL):</strong>
          {editModeVisit ? (
            <input
              type="number"
              step="0.1"
              min="1"
              max="2"
              value={tempPal}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setTempPal(val);
                updateVisitField("physicalActivityMultiplier", val);
              }}
              className="border rounded px-3 py-2"
              placeholder="مثلاً 1.2"
            />
          ) : (
            <span className="text-gray-700">
              {selectedVisit.physicalActivityMultiplier || "-"}
            </span>
          )}
        </div>

        {/* Suggested Calories */}
        <div className="flex flex-col gap-1">
          <strong>کالری پیشنهادی:</strong>
          {editModeVisit ? (
            <input
              type="number"
              value={selectedVisit.suggestedCalories || ""}
              onChange={(e) =>
                updateVisitField("suggestedCalories", Number(e.target.value))
              }
              className="border rounded px-3 py-2"
            />
          ) : (
            <span className="text-gray-700">
              {selectedVisit.suggestedCalories}
            </span>
          )}
        </div>

        {/* Fat % */}
        <div className="flex flex-col gap-1">
          <strong>درصد چربی:</strong>
          {editModeVisit ? (
            <input
              type="number"
              value={selectedVisit.fatPercent || ""}
              onChange={(e) =>
                updateVisitField("fatPercent", Number(e.target.value))
              }
              className="border rounded px-3 py-2"
            />
          ) : (
            <span className="text-gray-700">{selectedVisit.fatPercent}%</span>
          )}
        </div>

        {/* Lean Mass % */}
        <div className="flex flex-col gap-1">
          <strong>درصد عضله:</strong>
          {editModeVisit ? (
            <input
              type="number"
              value={selectedVisit.leanMassPercent || ""}
              onChange={(e) =>
                updateVisitField("leanMassPercent", Number(e.target.value))
              }
              className="border rounded px-3 py-2"
            />
          ) : (
            <span className="text-gray-700">
              {selectedVisit.leanMassPercent}%
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <strong>توضیحات:</strong>
          {editModeVisit ? (
            <textarea
              rows={3}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 resize-vertical"
              placeholder="توضیحات اضافی..."
              value={selectedVisit.notes || ""}
              onChange={(e) => updateVisitField("notes", e.target.value)}
            />
          ) : (
            <span className="text-gray-700">{selectedVisit.notes || "-"}</span>
          )}
        </div>
      </div>

      {/* Calorie Calculator */}
      <CalorieCalculator
        weight={tempWeight}
        height={tempHeight}
        pal={tempPal}
        gender={editedPatient.gender}
      />
    </section>
  );
}

export default PatientVisit;
