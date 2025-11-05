import { useNavigate } from "react-router-dom";

function Patient({ patientData }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patients/${patientData.id}`);
  };

  return (
    <ul
      onClick={handleClick}
      className="list-none grid grid-cols-5 gap-4 text-right items-center px-4 py-2 border-b border-emerald-200 hover:bg-emerald-50 cursor-pointer transition"
    >
      <li className="font-medium text-gray-700">{patientData.id}</li>
      <li className="text-gray-700">{patientData.firstName}</li>
      <li className="text-gray-700">{patientData.lastName}</li>
      <li className="text-gray-700">{patientData.phone}</li>
      <li className="text-gray-600 text-sm">{patientData.lastVisit}</li>
    </ul>
  );
}

export default Patient;
