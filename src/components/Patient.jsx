import { useNavigate } from "react-router-dom";

function Patient({ patientData }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patients/${patientData.id}`);
  };

  const getLastVisitDate = () => {
    try {
      if (
        !patientData.visits ||
        !Array.isArray(patientData.visits) ||
        patientData.visits.length === 0
      ) {
        return "بدون ویزیت";
      }

      const validVisits = patientData.visits.filter(
        (visit) => visit && visit.date && !isNaN(new Date(visit.date).getTime())
      );

      if (validVisits.length === 0) {
        return "تاریخ نامعتبر";
      }

      const latestVisit = validVisits.reduce((latest, current) => {
        return current.date > latest.date ? current : latest;
      });

      const latestDate = new Date(latestVisit.date);
      const today = new Date();

      const latestDateMidnight = new Date(
        latestDate.getFullYear(),
        latestDate.getMonth(),
        latestDate.getDate()
      );
      const todayMidnight = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      console.log("today", today);
      console.log("totoday midday", todayMidnight);

      const timeDifference =
        todayMidnight.getTime() - latestDateMidnight.getTime();

      if (timeDifference === 0) {
        return "امروز";
      } else if (timeDifference === 86400000) {
        return "دیروز";
      }

      return new Date(latestVisit.date).toLocaleDateString("fa-IR");
    } catch (error) {
      console.error("Error calculating last visit date:", error);
      return "خطا در تاریخ";
    }
  };

  const lastVisit = getLastVisitDate();

  return (
    <ul
      onClick={handleClick}
      className="list-none grid grid-cols-5 gap-4 text-right items-center px-4 py-2 border-b border-emerald-200 hover:bg-emerald-50 cursor-pointer transition"
    >
      <li className="font-medium text-gray-700">{patientData.id}</li>
      <li className="text-gray-700">{patientData.firstName}</li>
      <li className="text-gray-700">{patientData.lastName}</li>
      <li className="text-gray-700">{patientData.phone}</li>
      <li className="text-gray-600 text-sm" dir="ltr">
        {lastVisit}
      </li>
    </ul>
  );
}

export default Patient;
