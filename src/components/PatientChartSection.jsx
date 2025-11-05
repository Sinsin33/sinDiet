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

  const chartData = patient.visits.map((v) => ({
    name: v.date,
    weight: v.weight,
    fat: v.bodyFatPercent,
    muscle: v.leanBodyMassPercent,
    calorie: v.suggestedCalorie,
  }));

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={(e, val) => setSelectedTab(val)}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="وزن" />
        <Tab label="درصد عضله" />
        <Tab label="درصد چربی" />
        <Tab label="کالری" />
      </Tabs>

      <div className="mt-6" style={{ direction: "ltr" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedTab === 0 && (
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#059669"
                strokeWidth={3}
              />
            )}
            {selectedTab === 1 && (
              <Line
                type="monotone"
                dataKey="muscle"
                stroke="#2563EB"
                strokeWidth={3}
              />
            )}
            {selectedTab === 2 && (
              <Line
                type="monotone"
                dataKey="fat"
                stroke="#DC2626"
                strokeWidth={3}
              />
            )}
            {selectedTab === 3 && (
              <Line
                type="monotone"
                dataKey="calorie"
                stroke="#F59E0B"
                strokeWidth={3}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
