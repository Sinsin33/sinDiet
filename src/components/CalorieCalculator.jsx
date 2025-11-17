import { useState } from "react";

function CalorieCalculator({ weight, height, pal, gender }) {
  const [internalCalorieAdjustment, setInternalCalorieAdjustment] =
    useState("");

  if (!weight || !height || !pal || !gender) return null;

  // Calculate BMI
  const bmi = weight / (height / 100) ** 2;

  // Ideal weight at BMI 22
  const idealWeight = 22 * (height / 100) ** 2;

  // Justified weight for BMI > 25
  const usedWeight =
    bmi > 25 ? idealWeight + 0.25 * (weight - idealWeight) : weight;

  // Base calorie calculation
  const baseCalories =
    usedWeight * pal * (gender === "مرد" ? 1 : 0.95) * 1.1 * 24;

  // Final calorie with adjustment
  const finalCalories = baseCalories + Number(internalCalorieAdjustment || 0);
  const isAbove = bmi > 25;

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="font-semibold text-gray-700 mb-2">محاسبه کالری</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>BMI: {bmi.toFixed(1)}</div>
        <div>وزن ایده آل: {idealWeight.toFixed(1)} kg</div>
        {isAbove && <div>وزن تعدیل شده: {usedWeight.toFixed(1)} kg</div>}

        <div>کالری پایه: {baseCalories.toFixed(0)} kcal</div>
        <div>کالری نهایی: {finalCalories.toFixed(0)} kcal</div>

        <div className="col-span-2 flex flex-col gap-1 mt-2">
          <label className="font-semibold">کاهش/افزایش کالری دلخواه:</label>
          <input
            type="number"
            value={internalCalorieAdjustment}
            onChange={(e) => setInternalCalorieAdjustment(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="مثلاً -500 یا 200"
          />
        </div>
      </div>
    </div>
  );
}

export default CalorieCalculator;
