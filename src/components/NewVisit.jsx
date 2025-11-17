import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import JalaliDateInput from "./JalaliDateInput";
import CalorieCalculator from "./CalorieCalculator";

const visitSchema = z.object({
  date: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "تاریخ ویزیت الزامی است" }),

  weight: z
    .number()
    .nullable()
    .refine((val) => val !== null && val > 0, {
      message: "وزن باید بیشتر از صفر باشد",
    }),

  height: z
    .number()
    .nullable()
    .refine((val) => val !== null && val > 0, {
      message: "قد باید بیشتر از صفر باشد",
    }),

  suggestedCalories: z
    .number()
    .nullable()
    .refine((val) => val !== null && val > 0, {
      message: "کالری باید بیشتر از صفر باشد",
    }),

  fatPercent: z
    .number()
    .nullable()
    .refine((val) => val !== null && val >= 1 && val <= 100, {
      message: "درصد چربی باید بین ۱ تا ۱۰۰ باشد",
    }),

  leanMassPercent: z
    .number()
    .nullable()
    .refine((val) => val !== null && val >= 1 && val <= 100, {
      message: "درصد عضله باید بین ۱ تا ۱۰۰ باشد",
    }),

  notes: z.string().optional(),

  pal: z.number().nullable(),
});

export default function NewVisit({ patientId, patientGender, onSave }) {
  const baseUrl = "http://localhost:8000/patients";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      date: null,
      weight: null,
      height: null,
      suggestedCalories: null,
      fatPercent: null,
      leanMassPercent: null,
      pal: 1.2,
      notes: "",
    },
  });

  const weight = watch("weight") || 0;
  const height = watch("height") || 0;
  const pal = watch("pal") || 1.2;

  const onSubmit = async (data) => {
    try {
      const newVisit = {
        id: Date.now(),
        ...data,
        physicalActivityMultiplier: pal,
      };

      const res = await fetch(`${baseUrl}/${patientId}`);
      if (!res.ok) throw new Error("خطا در دریافت اطلاعات بیمار");
      const patient = await res.json();

      const updatedPatient = {
        ...patient,
        visits: [...(patient.visits || []), newVisit],
        lastVisit: new Date(newVisit.date).toLocaleDateString("fa-IR"),
      };

      const updateRes = await fetch(`${baseUrl}/${patientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPatient),
      });
      if (!updateRes.ok) throw new Error("خطا در ذخیره ویزیت جدید");

      if (onSave) onSave(newVisit);
      reset();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-emerald-700 font-bold text-xl mb-4">ویزیت جدید</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            تاریخ ویزیت
          </label>
          <JalaliDateInput onChange={(ts) => setValue("date", ts)} />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Weight */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">وزن (kg)</label>
          <input
            type="number"
            {...register("weight", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? null : v),
            })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
            placeholder="وزن به کیلوگرم"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight.message}</p>
          )}
        </div>

        {/* Height */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">قد (cm)</label>
          <input
            type="number"
            {...register("height", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? null : v),
            })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
            placeholder="قد به سانتی‌متر"
          />
          {errors.height && (
            <p className="text-red-500 text-sm">{errors.height.message}</p>
          )}
        </div>

        {/* PAL */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            سطح فعالیت بدنی (PAL)
          </label>
          <input
            type="number"
            step="0.1"
            value={pal}
            onChange={(e) => setValue("pal", Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
            placeholder="مثلاً 1.2"
          />
        </div>

        {/* Suggested Calories */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            کالری پیشنهادی
          </label>
          <input
            type="number"
            {...register("suggestedCalories", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? null : v),
            })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
            placeholder="کالری روزانه پیشنهادی"
          />
          {errors.suggestedCalories && (
            <p className="text-red-500 text-sm">
              {errors.suggestedCalories.message}
            </p>
          )}
        </div>

        {/* Fat Percent */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">درصد چربی</label>
          <input
            type="number"
            {...register("fatPercent", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? null : v),
            })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          />
          {errors.fatPercent && (
            <p className="text-red-500 text-sm">{errors.fatPercent.message}</p>
          )}
        </div>

        {/* Lean Mass */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">درصد عضله</label>
          <input
            type="number"
            {...register("leanMassPercent", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? null : v),
            })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          />
          {errors.leanMassPercent && (
            <p className="text-red-500 text-sm">
              {errors.leanMassPercent.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            یادداشت (اختیاری)
          </label>
          <textarea
            rows={3}
            {...register("notes")}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 resize-vertical"
            placeholder="توضیحات اضافی..."
          />
        </div>
      </form>

      {/* Calorie Calculator */}
      <CalorieCalculator
        weight={weight}
        height={height}
        pal={pal}
        gender={patientGender}
      />

      {/* Submit */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
        >
          ثبت ویزیت
        </button>
        <button
          onClick={() => reset()}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          انصراف
        </button>
      </div>
    </div>
  );
}
