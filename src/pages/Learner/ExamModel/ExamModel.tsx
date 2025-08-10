import { useQuizWithoutAnswer, useSubmitQuiz } from "@/utils/hooks/StudentExam";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ExamModel = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuizWithoutAnswer(quizId!);
  const { mutate: submitQuiz, isPending } = useSubmitQuiz();

  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState<{ score: number; total: number } | null>(null);

  if (isLoading || !data) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) return <p className="text-red-600">Error loading data</p>;

  const handleSelect = (questionId: string, selectedChoice: string) => {
    setAnswers((prevAnswers) => {
      const updated = prevAnswers.filter((a) => a.question !== questionId);
      return [...updated, { question: questionId, answer: selectedChoice }];
    });
  };

  const handleSubmit = () => {
    if (!quizId) return;

    submitQuiz(
      { quizId, answers },
      {
        onSuccess: (data) => {
          // Assuming the API returns score and total
          setResultData({ score: data.score, total: data.total });
          setShowResultModal(true);
        },
        onError: (error: any) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Unknown error occurred";
          alert(`Error submitting quiz: ${message}`);
        },
      }
    );
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    navigate("/dashboard/learner-dashboard"); // Redirect to learner dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-gray-600">{data.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.questions.map((q) => {
          const options = Object.entries(q.options).filter(([key]) => key !== "_id");
          return (
            <div key={q._id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{q.title}</h3>
              <div className="space-y-3">
                {options.map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded p-2"
                  >
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={value}
                      checked={answers.find((a) => a.question === q._id)?.answer === value}
                      onChange={() => handleSelect(q._id, value)}
                      className="form-radio"
                    />
                    <span>{key}: {value}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-right">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Loading..." : "Submit"}
        </button>
      </div>

      {showResultModal && resultData && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Your Result</h2>
            <p className="text-lg mb-6">
              Score: <span className="font-semibold">{resultData.score}</span> out of <span className="font-semibold">{resultData.total}</span>
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamModel;
