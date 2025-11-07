import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PatientChartSection({ patient }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const chartData = patient.visits
    .slice()
    .sort((a, b) => a.date - b.date) // ascending order
    .map((v) => ({
      name: new Date(v.date).toLocaleDateString("fa-IR"), // 🟢 Jalali date display
      weight: v.weight,
      fat: v.fatPercent,
      muscle: v.leanMassPercent,
      calorie: v.suggestedCalories,
    }));

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={(e, val) => setSelectedTab(val)}
        centered
      >
        <Tab label="وزن" />
        <Tab label="ترکیب بدن" />
        <Tab label="کالری" />
      </Tabs>

      <div className="mt-6" style={{ direction: "ltr" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />

            {selectedTab === 0 && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="weight"
                stroke="#059669"
                strokeWidth={3}
                name="وزن (kg)"
              />
            )}

            {selectedTab === 1 && (
              <>
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="muscle"
                  stroke="#2563EB"
                  strokeWidth={3}
                  name="درصد عضله"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="fat"
                  stroke="#DC2626"
                  strokeWidth={3}
                  name="درصد چربی"
                />
              </>
            )}

            {selectedTab === 2 && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="calorie"
                stroke="#F59E0B"
                strokeWidth={3}
                name="کالری پیشنهادی"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
