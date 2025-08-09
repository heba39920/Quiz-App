
import { useQuizWithoutAnswer, useSubmitQuiz } from "@/utils/hooks/StudentExam";
import React, { useState } from "react";
import { useParams } from "react-router-dom";


const ExamModel = () => {
  const { quizId } = useParams<{ quizId: string }>();
  console.log("Exam ID:", quizId);
  const { data, isLoading, error } = useQuizWithoutAnswer(quizId!);
  console.log("Quiz data:", data);
  const { mutate: submitQuiz, isPending } = useSubmitQuiz();

  const [answers, setAnswers] = useState<{ questionId: string; selectedChoice: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 دقائق = 600 ثانية


 if (isLoading || !data) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-40 bg-gray-300 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="h-4 w-24 bg-gray-300 mb-4 rounded" />
              <div className="h-4 w-full bg-gray-200 mb-2 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 mb-2 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 mb-2 rounded" />
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <div className="h-10 w-32 bg-gray-300 rounded inline-block animate-pulse" />
        </div>
      </div>
    </div>
  );
}

  if (error) return <p className="p-4 text-red-600">حدث خطأ أثناء تحميل البيانات</p>;

  const handleSelect = (questionId: string, selectedChoice: string) => {
    setAnswers((prevAnswers) => {
      const updated = prevAnswers.filter((a) => a.questionId !== questionId);
      return [...updated, { questionId, selectedChoice }];
    });
  };

  const handleSubmit = () => {
    submitQuiz(
      { quizId: quizId!, answers },
      {
        onSuccess: (data) => {
          alert("تم تسليم الامتحان بنجاح ✅");
          console.log("Response:", data);
        },
        onError: (error) => {
          alert("حدث خطأ أثناء التسليم ❌");
          console.error(error);
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{data.title}</h1>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.questions.map((q: any, index: number) => (
            <div key={q._id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-3">Question {index + 1}</h3>
              <p className="mb-4">{q.questionText}</p>
              <div className="space-y-2">
                {q.choices.map((opt: string, i: number) => (
                  <label
                    key={i}
                    className={`block p-2 border rounded-lg cursor-pointer hover:bg-gray-50`}
                  >
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={opt}
                      className="mr-2"
                      onChange={() => handleSelect(q._id, opt)}
                      checked={
                        answers.find((a) => a.questionId === q._id)?.selectedChoice === opt
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "جارٍ الإرسال..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamModel;
