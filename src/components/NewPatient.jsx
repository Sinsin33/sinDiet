import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

// Schema
const patientSchema = z.object({
  firstName: z
    .string()
    .min(2, "نام باید حداقل ۲ حرف باشد")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ حرف باشد"),
  lastName: z
    .string()
    .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد")
    .max(50, "نام خانوادگی نمی‌تواند بیشتر از ۵۰ حرف باشد"),
  phone: z
    .string()
    .min(11, "شماره تلفن باید ۱۱ رقم باشد")
    .max(11, "شماره تلفن باید ۱۱ رقم باشد")
    .regex(/^09[0-9]{9}$/, "شماره تلفن معتبر نیست (با 09 شروع شود)"),
  gender: z.enum(["مرد", "زن"], "لطفاً جنسیت را انتخاب کنید"),
  medicalConditions: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : []
    ),
  foodPreferences: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : []
    ),
  foodAllergies: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : []
    ),
  drugsAndSupplements: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : []
    ),
  foodRecord: z.string().optional(),
  generalNote: z.string().optional(),
});

export default function NewPatient({ onSave }) {
  const baseUrl = "http://localhost:8000/patients";

  // ✅ Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error' | 'info' | 'warning'
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      medicalConditions: "",
      foodPreferences: "",
      foodAllergies: "",
      drugsAndSupplements: "",
      foodRecord: "",
      generalNote: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const newPatient = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        gender: data.gender,
        medicalConditions: data.medicalConditions,
        foodPreferences: data.foodPreferences,
        foodAllergies: data.foodAllergies,
        drugsAndSupplements: data.drugsAndSupplements,
        foodRecord: data.foodRecord,
        generalNote: data.generalNote,
        visits: [],
      };

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient),
      });

      if (!response.ok) throw new Error("خطا در ایجاد بیمار جدید");

      const savedPatient = await response.json();
      if (onSave) onSave(savedPatient);

      reset();

      // ✅ Show success notification
      setSnackbar({
        open: true,
        message: "✅ بیمار جدید با موفقیت ایجاد شد",
        severity: "success",
      });
    } catch (error) {
      console.error("Error creating patient:", error);

      // ❌ Show error notification
      setSnackbar({
        open: true,
        message: error.message || "خطا در ایجاد بیمار جدید",
        severity: "error",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-emerald-700 font-bold text-xl">بیمار جدید</h2>
        <div className="flex gap-3">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "در حال ثبت..." : "ثبت بیمار"}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">نام *</label>
            <input
              type="text"
              {...register("firstName")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="نام بیمار"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              نام خانوادگی *
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="نام خانوادگی بیمار"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          {/* /// gender */}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">جنسیت *</label>

            <select
              {...register("gender")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option className="border border-gray-300 rounded-lg px-3 py-2">
                لطفا جنسیت را انتخاب کنید
              </option>
              <option
                value={"مرد"}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                مرد
              </option>
              <option
                value={"زن"}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                زن
              </option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              شماره تلفن *
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="09xxxxxxxxx"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medical Conditions */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              بیماری‌ها
            </label>
            <input
              type="text"
              {...register("medicalConditions")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="مثلاً: دیابت نوع ۲, افزایش چربی خون"
            />
            <p className="text-xs text-gray-500">مقادیر را با کاما جدا کنید</p>
          </div>

          {/* Food Preferences */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              ترجیحات غذایی
            </label>
            <input
              type="text"
              {...register("foodPreferences")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="مثلاً: گیاه‌خواری نسبی, صبحانه سبک"
            />
            <p className="text-xs text-gray-500">مقادیر را با کاما جدا کنید</p>
          </div>

          {/* Food Allergies */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              آلرژی‌های غذایی
            </label>
            <input
              type="text"
              {...register("foodAllergies")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="مثلاً: تخم‌مرغ, بادام زمینی"
            />
            <p className="text-xs text-gray-500">مقادیر را با کاما جدا کنید</p>
          </div>

          {/* Drugs and Supplements */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              داروها و مکمل‌ها
            </label>
            <input
              type="text"
              {...register("drugsAndSupplements")}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="مثلاً: متفورمین 500mg روزی دوبار, اومگا 3"
            />
            <p className="text-xs text-gray-500">مقادیر را با کاما جدا کنید</p>
          </div>
        </div>

        {/* Food Record */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            سابقه غذایی
          </label>
          <textarea
            rows={3}
            {...register("foodRecord")}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-vertical"
            placeholder="مثلاً: صبحانه: نان سبوس‌دار و پنیر، ناهار: مرغ و برنج، شام: سوپ سبزیجات"
          />
        </div>

        {/* General Note */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            یادداشت کلی
          </label>
          <textarea
            rows={3}
            {...register("generalNote")}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-vertical"
            placeholder="مثلاً: بسیار منظم و پیگیر در اجرای رژیم. نیاز به کنترل دقیق‌تر کربوهیدرات‌ها دارد."
          />
        </div>
      </form>
    </div>
  );
}
