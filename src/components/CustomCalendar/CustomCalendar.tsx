import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { useState } from "react";

const CustomCalendar = ({ markedDates = [] }: { markedDates: string[] }) => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  const isMarked = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return markedDates.includes(dateStr);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow main-border w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold main-text">Calendar</h2>
        <button className="bg-black text-[rgba(255,237,223,1)] px-3 py-1 rounded text-sm hover:opacity-90 transition">
          New Quiz
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          modifiers={{ marked: isMarked }}
          modifiersClassNames={{
            marked:
              "after:content-[''] after:block after:w-1.5 after:h-1.5 after:rounded-full after:bg-black after:mx-auto after:mt-1",
          }}
          className="w-full"
          classNames={{
            caption: "text-center font-semibold mb-2",
            nav_button: "text-black",
            table: "table-fixed w-full border-collapse", 
            head_row: "text-gray-600",
            head_cell: "text-xs text-center p-2", 
            cell: "text-sm text-center hover:bg-gray-100 rounded-md cursor-pointer relative",
            day_selected: "bg-black text-white rounded-md",
            day_today: "border border-black",
          }}
        />
      </div>
    </div>
  );
};

export default CustomCalendar;
