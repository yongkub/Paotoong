import { useState } from "react";
import "../css/MonthPicker.css";
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

  const [showPicker, setShowPicker] = useState(false);

  const handleSelectMonth = (month: number) => {
    const newMonthYear = { ...monthYear, month };
    setMonthYear(newMonthYear);
    onChange(newMonthYear);
  };

  const handleSelectYear = (isNext: boolean) => {
    const newMonthYear = {
      ...monthYear,
      year: monthYear.year + (isNext ? 1 : -1),
    };
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
      <div className="header">
        <span onClick={() => handleSelectYear(false)}>
          <i className="bi bi-arrow-left"></i>
        </span>
        <span>{monthYear.year}</span>
        <span onClick={() => handleSelectYear(true)}>
          <i className="bi bi-arrow-right"></i>
        </span>
      </div>
      <div className="calendar-wrapper">
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
    </div>
  );
};

export default MonthPicker;
