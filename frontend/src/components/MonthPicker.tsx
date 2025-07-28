import { useRef } from "react";
interface MonthPickerProps {
  value: Date;
  onChange: (dateStr: Date) => void;
}
const MonthPicker = ({ value, onChange }: MonthPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.showPicker?.();
  };
  const formatMonthYear = (date: Date) => {
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    //yyyy-MM
    return (
      year.toString().padStart(4, "0") + "-" + month.toString().padStart(2, "0")
    );
  };
  return (
    <div onClick={handleClick} className="w-max-con">
      <input
        type="month"
        ref={inputRef}
        value={formatMonthYear(value)}
        onChange={(e) => {
          const myStr =
            e.target.value === ""
              ? formatMonthYear(new Date())
              : e.target.value;
          onChange(new Date(myStr));
        }}
      />
    </div>
  );
};

export default MonthPicker;
