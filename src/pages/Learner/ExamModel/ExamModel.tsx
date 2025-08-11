import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuizWithoutAnswer, useSubmitQuiz } from "@/utils/hooks/StudentExam";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { FaTimes, FaMedal, FaSmile, FaRegSadTear, FaRegThumbsUp } from "react-icons/fa";
import useAuth from "@/utils/hooks/Auth";


const ScoreCardModal = ({
  isOpen,
  onClose,
  score,
  total,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
  title: string | null;
}) => {
  const navigate = useNavigate();
  const { logedInData } = useAuth();
  const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : "0";

  const getMessage = () => {
    if (+percentage >= 90)
      return { msg: "Excellent!", icon: <FaMedal className="text-yellow-500" /> };
    if (+percentage >= 75)
      return { msg: "Great Job!", icon: <FaSmile className="text-green-500" /> };
    if (+percentage >= 50)
      return { msg: "Good Effort!", icon: <FaRegThumbsUp className="text-blue-500" /> };
    return { msg: "Keep Practicing!", icon: <FaRegSadTear className="text-red-500" /> };
  };

  const result = getMessage();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className=" bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md text-center relative"
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold text-main-color mb-2">Quiz Result</h2>

          <p className="text-gray-600 dark:text-amber-400 text-lg mb-1">
            You scored <span className="font-bold text-main-color">{score}</span> out of{" "}
            <span className="font-bold">{total}</span>
          </p>

          <div className="text-4xl font-extrabold text-green-600 mb-2">{percentage}%</div>

          <div className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
            {result.icon}
            {result.msg}
          </div>

          <button
            onClick={() => {
              onClose();
              navigate(`/learner/certificate/${logedInData?.profile._id}`, {
                state: { score: percentage, title, total },
              });
            }}
            className="mt-5 px-5 py-2 bg-main-color text-white rounded-lg hover:bg-main-hover transition"
          >
            Close
          </button>
        </motion.div>
      </div>
    </Dialog>
  );
};

const ExamModel = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuizWithoutAnswer(quizId!);
  const { mutate: submitQuiz, isPending } = useSubmitQuiz();

  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState<{ score: number; total: number } | null>(null);

  if (isLoading || !data) {
    return <div>Loading...</div>;
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
        {data.questions.map((q:any) => {
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
          className="bg-orange-300 text-black px-8 py-3 rounded-lg hover:bg-orange-400 disabled:opacity-50"
        >
          {isPending ? "Loading..." : "Submit"}
        </button>
      </div>

      {/* مودال النتيجة */}
      {showResultModal && resultData && (
        <ScoreCardModal
          isOpen={showResultModal}
          onClose={handleCloseModal}
          score={resultData.score}
          total={resultData.total}
          title={data.title}
        />
      )}
    </div>
  );
};

export default ExamModel;
