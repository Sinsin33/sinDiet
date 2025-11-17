import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";

export default function JalaliDateInput({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (newDate) {
      onChange(newDate.getTime());
    } else {
      onChange(null);
    }
  };

  return (
    <DatePicker
      value={selectedDate}
      onChange={handleDateChange}
      format="yyyy/MM/dd"
      slotProps={{
        textField: {
          size: "small",
          className: "w-full",
        },
      }}
      // Add this to show Persian text in the input
      localeText={{
        fieldMonthPlaceholder: () => "ماه",
        fieldDayPlaceholder: () => "روز",
        fieldYearPlaceholder: () => "سال",
      }}
    />
  );
}
