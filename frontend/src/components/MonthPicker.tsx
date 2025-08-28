import { useState } from "react";
interface MonthPickerProps {
  onChange: (monthYear: MonthYear) => void;
}

export type MonthYear = {
  month: number;
  year: number;
};

const MonthPicker = ({ onChange }: MonthPickerProps) => {
  const [monthYear, setMonthYear] = useState<MonthYear>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const handleSelectMonth = (month: number) => {
    const newMonthYear = { ...monthYear, month };
    setMonthYear(newMonthYear);
    onChange(newMonthYear);
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      {months.map((m, ind) => {
        return (
          <div
            key={ind}
            onClick={() => handleSelectMonth(ind)}
            className={ind === monthYear.month ? "selected" : ""}
          >
            {m}
          </div>
        );
      })}
    </div>
  );
};

export default MonthPicker;
