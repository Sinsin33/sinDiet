import PatientInfoItems from "./PatientInfoItems";

function PatientGeneralInfo({
  editModeGeneral,
  setEditModeGeneral,
  editedPatient,
  setEditedPatient,
  handleSaveGeneral,
}) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-emerald-700 font-bold text-xl">اطلاعات کلی</h2>

          {editModeGeneral ? (
            <div className="flex gap-3">
              <button
                onClick={handleSaveGeneral}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                ذخیره اطلاعات
              </button>
              <button
                onClick={() => setEditModeGeneral(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                انصراف
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditModeGeneral(true)}
              className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-200 transition-colors"
            >
              ویرایش اطلاعات کلی
            </button>
          )}
        </div>
      </div>

      {/* Form Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientInfoItems
          itemInfo="firstName"
          title="نام"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />

        <PatientInfoItems
          itemInfo="lastName"
          title="نام خانوادگی"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            <strong>{"جنسیت"}</strong>
          </label>

          {editModeGeneral ? (
            <select
              value={editedPatient.gender || ""}
              onChange={(e) =>
                setEditedPatient({
                  ...editedPatient,
                  gender: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">انتخاب جنسیت</option>
              <option value="مرد">مرد</option>
              <option value="زن">زن</option>
            </select>
          ) : (
            <span className="text-gray-900 py-2">
              {editedPatient.gender || "-"}
            </span>
          )}

          {/* 🔹 Minimal divider line */}
          <hr className="border-t border-gray-200 mt-2" />
        </div>

        <PatientInfoItems
          itemInfo="phone"
          title="شماره تماس"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />

        <PatientInfoItems
          itemInfo="age"
          title="سن"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />

        <PatientInfoItems
          itemInfo="medicalConditions"
          title="شرایط پزشکی"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />

        <PatientInfoItems
          itemInfo="foodAllergies"
          title="حساسیت‌های غذایی"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />

        <PatientInfoItems
          itemInfo="drugsAndSupplements"
          title="داروهای مصرفی و مکمل‌ها"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />

        <PatientInfoItems
          itemInfo="foodRecord"
          title="تاریخچه غذایی"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />

        <PatientInfoItems
          itemInfo="foodPreferences"
          title="تمایلات غذایی"
          editModeGeneral={editModeGeneral}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
        />

        {/* Notes section (larger textarea) */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            <strong>یادداشت</strong>
          </label>
          {editModeGeneral ? (
            <textarea
              value={editedPatient.generalNote || ""}
              onChange={(e) =>
                setEditedPatient({
                  ...editedPatient,
                  generalNote: e.target.value,
                })
              }
              rows={4}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-vertical"
            />
          ) : (
            <span className="text-gray-900 py-2 whitespace-pre-wrap">
              {editedPatient.generalNote}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default PatientGeneralInfo;
