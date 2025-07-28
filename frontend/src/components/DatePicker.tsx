import { useRef } from "react";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  additionalClass?: string;
}

const DatePicker = ({ value, onChange, additionalClass }: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.showPicker?.();
  };
  return (
    <div onClick={handleClick} className="date-picker-in-modal d-inline">
      <input
        type="date"
        ref={inputRef}
        value={value.toLocaleDateString("en-CA")}
        className={!additionalClass ? "w-max-con" : additionalClass}
        onChange={(e) => {
          const newDate =
            e.target.value === "" ? new Date() : new Date(e.target.value);
          onChange(newDate);
        }}
      />
    </div>
  );
};

export default DatePicker;
