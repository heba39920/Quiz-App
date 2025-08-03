import React, { useState } from "react";
import SetUpQ from "@/assets/images/new quiz icon.png";
import QBank from "@/assets/images/Vault icon.png";
import QuizeImg from "@/assets/images/Quiz img.png";
import CustomCalendar from "@/components/CustomCalendar/CustomCalendar";
import QuizModal from "@/components/QuizModal/QuizModal";
import {
  usefirstFiveIncommingQ,
  useLastFiveCompletedQ,
  useCreateQuiz,
} from "@/utils/hooks/Quizzes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DashboardQuizzes = () => {
  const [showQuizModal, setShowQuizModal] = useState(false);

  const { data: incomingData, isLoading, isError } = usefirstFiveIncommingQ();
  const {
    data: completedData,
    isLoading: loadingCompleted,
    isError: errorCompleted,
  } = useLastFiveCompletedQ();

  const navigate = useNavigate();

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
      onError: () => {
        toast.error("Failed to create quiz. Please try again.");
      },
    });
  };

  const markedDates =
    incomingData
      ?.filter(
        (quiz: any) =>
          quiz.schadule && !isNaN(new Date(quiz.schadule).getTime())
      )
      .map(
        (quiz: any) => new Date(quiz.schadule).toISOString().split("T")[0]
      ) || [];

  return (
    <section className="w-full px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowQuizModal(true)}
              className="flex-1 bg-white main-border shadow rounded-lg flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition focus:outline-none"
            >
              <img
                src={SetUpQ}
                alt="Set up new quiz"
                className="mb-2 w-10 h-10"
              />
              <span className="font-medium text-sm text-center">
                Set up a new quiz
              </span>
            </button>
            <button className="flex-1 bg-white main-border shadow rounded-lg flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition focus:outline-none">
              <img src={QBank} alt="Question Bank" className="mb-2 w-10 h-10" />
              <span className="font-medium text-sm text-center">
                Question Bank
              </span>
            </button>
          </div>

          <div className="w-full">
            <CustomCalendar markedDates={markedDates} />
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg main-border shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Upcoming quizzes</h2>
            {isLoading && (
              <p className="text-sm text-gray-500">Loading quizzes...</p>
            )}
            {isError && (
              <p className="text-sm text-red-500">Failed to load quizzes.</p>
            )}
            {!isLoading && !isError && (
              <ul className="space-y-4">
                {incomingData?.map((quiz: any) => (
                  <li
                    key={quiz._id}
                    onClick={() => navigate(`/dashboard/quizzes/${quiz._id}`)}
                    className="flex items-center justify-between gap-4 rounded-lg main-border p-4 shadow-sm bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-2 rounded-md">
                        <img
                          src={QuizeImg}
                          alt={`${quiz.title} illustration`}
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {quiz.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {quiz.schadule &&
                          !isNaN(new Date(quiz.schadule).getTime())
                            ? new Date(quiz.schadule).toLocaleDateString(
                                "en-GB"
                              )
                            : "Date not available"}{" "}
                          |{" "}
                          {quiz.schadule &&
                          !isNaN(new Date(quiz.schadule).getTime())
                            ? new Date(quiz.schadule).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "--:--"}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          No. of students enrolled: {quiz.participants ?? 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#f3caab]  font-semibold text-sm">
                        Open
                      </span>
                      <span className="text-[#f3caab] text-sm">→</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-lg main-border shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Completed Quizzes</h2>
              <button className="text-sm text-[#f3caab] font-semibold hover:underline">
                Results →
              </button>
            </div>
            {loadingCompleted && (
              <p className="text-sm text-gray-500">
                Loading completed quizzes...
              </p>
            )}
            {errorCompleted && (
              <p className="text-sm text-red-500">
                Failed to load completed quizzes.
              </p>
            )}
            {!loadingCompleted && !errorCompleted && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                  <thead className="bg-black text-[rgba(255,237,223,1)]">
                    <tr>
                      <th className="p-2 font-medium">Title</th>
                      <th className="p-2 font-medium">Group name</th>
                      <th className="p-2 font-medium">No. of persons</th>
                      <th className="p-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedData?.map((quiz: any) => (
                      <tr key={quiz._id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{quiz.title}</td>
                        <td className="p-2">{quiz.group}</td>
                        <td className="p-2">
                          {quiz.participants ?? 0} persons
                        </td>
                        <td className="p-2">
                          {quiz.schadule &&
                          !isNaN(new Date(quiz.schadule).getTime())
                            ? new Date(quiz.schadule).toLocaleDateString(
                                "en-GB"
                              )
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showQuizModal && (
        <QuizModal
          onClose={() => setShowQuizModal(false)}
          onSubmit={handleCreateQuiz}
        />
      )}
    </section>
  );
};

export default DashboardQuizzes;
