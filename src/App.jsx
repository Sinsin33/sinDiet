import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import DietPlans from "./pages/DietPlans";
import AddNewPatient from "./pages/AddNewPatient";
import AddNewDiet from "./pages/AddNewDiet";

function App() {
  return (
    <div
      dir="rtl"
      className="min-h-screen grid grid-rows-[1fr_auto] p-4 gap-4 bg-white"
    >
      {/* Main area (dashboard + sidebar) */}
      <div className="grid lg:grid-cols-[minmax(150px,15%)_1fr] gap-4 grid-cols-1">
        {/* Sidebar */}
        <aside className="bg-emerald-50 text-white rounded-lg p-4">
          <SideBar />
        </aside>

        {/* Dashboard */}
        <main className="bg-sky-50 rounded-lg h-lvh p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/new" element={<AddNewPatient />} />
            <Route path="/diet-plans" element={<DietPlans />} />
            <Route path="/diet-plans/new" element={<AddNewDiet />} />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-emerald-700 text-white text-center p-4 rounded-lg">
        © 2025 داشبورد من
      </footer>
    </div>
  );
}

export default App;
