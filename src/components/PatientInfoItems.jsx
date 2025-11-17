function PatientInfoItems({
  editModeGeneral,
  editedPatient,
  setEditedPatient,
  itemInfo,
  title,
}) {
  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <label className="text-sm font-medium text-gray-700">
        <strong>{title}</strong>
      </label>

      {editModeGeneral ? (
        <input
          type="text"
          value={editedPatient[itemInfo] || ""}
          onChange={(e) =>
            setEditedPatient({
              ...editedPatient,
              [itemInfo]: e.target.value,
            })
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      ) : (
        <span className="text-gray-900 py-2">{editedPatient[itemInfo]}</span>
      )}

      {/* 🔹 Minimal divider line */}
      <hr className="border-t border-gray-200 mt-2" />
    </div>
  );
}

export default PatientInfoItems;
