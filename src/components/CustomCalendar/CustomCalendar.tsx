import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "@/styles/global.css";
import { format } from "date-fns";
import QuizModal from "../QuizModal/QuizModal";
import { toast } from "react-toastify";
import { useCreateQuiz } from "@/utils/hooks/Quizzes";

const CustomCalendar = ({ markedDates = [] }: { markedDates: string[] }) => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [showQuizModal, setShowQuizModal] = useState(false);

  const isMarked = (date: Date) =>
    markedDates.includes(format(date, "yyyy-MM-dd"));
  const { mutate: createQuiz } = useCreateQuiz();

  const handleCreateQuiz = (data: any) => {
    const schadule = new Date(`${data.scheduleDate}T${data.scheduleTime}`);
    const payload = {
      title: data.title,
      description: data.description,
      group: data.group,
      questions_number: Number(data.questionsCount),
      difficulty: data.difficulty,
      type: data.category,
      schadule: schadule.toISOString(),
      duration: Number(data.duration),
      score_per_question: Number(data.score),
    };
    createQuiz(payload, {
      onSuccess: (response) => {
        toast.success(response.message || "Quiz created successfully");
        setTimeout(() => setShowQuizModal(false), 1500);
      },
      onError: () => toast.error("Failed to create quiz. Please try again."),
    });
  };

  return (
    <div className="bg-white dark:bg-[#0D1321] dark:text-white p-4 rounded-lg shadow main-border w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold main-text dark:text-white">
          Calendar
        </h2>
        <button
          className="bg-black text-[rgba(255,237,223,1)] px-3 py-1 rounded text-sm hover:opacity-90 transition"
          onClick={() => setShowQuizModal(true)}
        >
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
              "after:content-[''] after:block after:w-1.5 after:h-1.5 after:rounded-full after:mx-auto after:mt-1 after:bg-black dark:after:bg-[#FFEDDF]",
          }}
          className="w-full"
          classNames={{
            caption: "text-center font-semibold mb-2 dark:text-white",
            nav_button: "text-black dark:text-white",
            table: "w-full border-collapse",
            head_row: "text-gray-600 dark:text-gray-300",
            head_cell: "text-xs text-center p-2",
            cell: "text-sm text-center hover:bg-gray-100 dark:hover:bg-[#172038] rounded-md cursor-pointer relative",
            day_selected: "rounded-md",
            day_today: "border border-black dark:border-[#FFEDDF]",
            day_outside: "text-gray-400 dark:text-gray-500",
            day_disabled: "opacity-50",
          }}
        />
      </div>

      {showQuizModal && (
        <QuizModal
          onClose={() => setShowQuizModal(false)}
          onSubmit={handleCreateQuiz}
        />
      )}
    </div>
  );
};

export default CustomCalendar;
