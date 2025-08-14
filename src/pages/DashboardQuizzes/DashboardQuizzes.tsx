/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SetUpQ from "@/assets/images/new quiz icon.png";
import QBank from "@/assets/images/Vault icon.png";
import QuizeImg from "@/assets/images/Quiz img.png";
import CustomCalendar from "@/components/CustomCalendar/CustomCalendar";
import QuizModal from "@/components/QuizModal/QuizModal";
import Loader from "@/components/Loader/Loader";

import {
  usefirstFiveIncommingQ,
  useLastFiveCompletedQ,
  useCreateQuiz,
} from "@/utils/hooks/Quizzes";
import { toast } from "react-toastify";
import JoinQuiz from "../Learner/JoinQuiz/JoinQuiz";
import { useCurrentUser } from "@/utils/hooks/Auth";
import Nodata from "@/components/NoData/Nodata";

const DashboardQuizzes = () => {
  const navigate = useNavigate();
    const { user } = useCurrentUser();
  const role: string | undefined = user?.role
  const isInstructor = role === "Instructor";

  // shared data
  const { data: incomingData, isLoading, isError } = usefirstFiveIncommingQ();
  const {
    data: completedData,
    isLoading: loadingCompleted,
    isError: errorCompleted,
  } = useLastFiveCompletedQ();

  // instructor-only
  const [showQuizModal, setShowQuizModal] = useState(false);
  const { mutate: createQuiz } = useCreateQuiz();

  // learner-only (Join modal)
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  // ✅ مودال الكود بعد نجاح الإنشاء
  const [codeModal, setCodeModal] = useState<{
    open: boolean;
    code: string;
    title?: string;
  }>({ open: false, code: "" });

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
      onSuccess: (response: any) => {
        const code = response?.data?.code;
        const title = response?.data?.title;

        toast.success(response?.message || "Quiz created successfully");
        setShowQuizModal(false);

        if (code) setCodeModal({ open: true, code, title });
      },
      onError: () => toast.error("Failed to create quiz. Please try again."),
    });
  };

  const markedDates =
    incomingData
      ?.filter((q: any) => q.schadule && !isNaN(new Date(q.schadule).getTime()))
      .map((q: any) => new Date(q.schadule).toISOString().split("T")[0]) ?? [];

  return (
    <section className="w-full px-4 py-6">
      {isInstructor ? (
        /* =============== Instructor Layout =============== */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
          {/* LEFT */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowQuizModal(true)}
                className="flex-1 bg-white dark:bg-[#0D1321] dark:text-white  dark:border-[#fff] border shadow rounded-lg flex flex-col items-center justify-center p-6 hover:bg-gray-50 hover:dark:bg-[#FFEDDF] hover:dark:text-[#0D1321] transition"
              >
                <img src={SetUpQ} alt="Set up new quiz" className="mb-2 w-10 h-10 dark:bg-white" />
                <span className="font-medium text-sm text-center">Set up a new quiz</span>
              </button>

              <button className="flex-1  bg-white  border dark:bg-[#0D1321]  dark:border-white dark:text-white shadow rounded-lg flex flex-col items-center justify-center p-6 hover:bg-gray-50 hover:dark:bg-[#FFEDDF] hover:dark:text-[#0D1321] transition">
                <img src={QBank} alt="Question Bank" className="mb-2 w-10 h-10 dark:bg-white" />
                <span className="font-medium text-sm text-center">Question Bank</span>
              </button>
            </div>

            <div className="w-full dark:border dark:border-white">
              <CustomCalendar markedDates={markedDates} showNewQuizButton />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            {/* Upcoming */}
            <Card title="Upcoming quizzes" loading={isLoading} error={isError}>
              {!incomingData?.length ? (
                <Nodata message="No upcoming quizzes." />
              ) : (
                <ul className="space-y-4">
                  {incomingData?.map((quiz: any) => (
                    <li
                      key={quiz._id}
                      onClick={() => navigate(`/dashboard/quizzes/${quiz._id}`)}
                      className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow-sm bg-white dark:bg-[#0D1321] dark:text-white  dark:border-[#fff] cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-orange-100 p-2 rounded-md">
                          <img src={QuizeImg} alt="" className="w-14 h-14 object-contain" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{quiz.title}</p>
                          <p className="text-xs opacity-80">
                            {quiz.schadule && !isNaN(new Date(quiz.schadule).getTime())
                              ? new Date(quiz.schadule).toLocaleDateString("en-GB")
                              : "Date not available"}{" "}
                            |{" "}
                            {quiz.schadule && !isNaN(new Date(quiz.schadule).getTime())
                              ? new Date(quiz.schadule).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                              : "--:--"}
                          </p>
                          <p className="text-xs mt-1 opacity-80">
                            No. of students enrolled: {quiz.participants ?? 0}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[#f3caab] font-semibold text-sm">
                        <span>Open</span> <span>→</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* Completed */}
            <Card title="Completed Quizzes" loading={loadingCompleted} error={errorCompleted} actionLabel="Results →">
              {!completedData?.length ? (
                <Nodata message="No completed quizzes." />
              ) : (
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
                        <tr key={quiz._id} className="border-t hover:dark:bg-[#FFEDDF] hover:dark:text-[#0D1321]">
                          <td className="p-2">{quiz.title}</td>
                          <td className="p-2">{quiz.group}</td>
                          <td className="p-2">{quiz.participants ?? 0} persons</td>
                          <td className="p-2">
                            {quiz.schadule && !isNaN(new Date(quiz.schadule).getTime())
                              ? new Date(quiz.schadule).toLocaleDateString("en-GB")
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      ) : (
        /* =============== Learner Layout =============== */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT column: Join (opens modal) then Upcoming */}
          <div className="space-y-6">
            <button
              onClick={() => setIsJoinOpen(true)}
              className="w-full h-[160px] sm:h-[180px] bg-white dark:bg-[#0D1321] dark:text-white border border-[#000033] dark:border-[#fff] shadow rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-[#182037] transition"
            >
              <img src={SetUpQ} alt="Join Quiz" className="mb-3 w-14 h-14 dark:bg-white" />
              <span className="font-medium text-sm sm:text-base">Join Quiz</span>
            </button>

            <div className="bg-white rounded-lg  shadow p-4 dark:bg-[#0D1321] dark:text-white border border-[#000033] dark:border-[#fff]">
              <h2 className="text-lg font-semibold mb-4">Upcoming quizzes</h2>
              {isLoading ? (
                <div className="py-6 flex justify-center"><Loader /></div>
              ) : isError ? (
                <p className="text-sm text-red-500">Failed to load quizzes.</p>
              ) : !incomingData?.length ? (
                <Nodata message="No upcoming quizzes." />
              ) : (
                <ul className="space-y-4">
                  {incomingData?.map((quiz: any) => (
                    <li
                      key={quiz._id}
                      onClick={() => navigate(`/dashboard/quizzes/${quiz._id}`)}
                      className="flex items-center justify-between gap-4 rounded-lg main-border p-4 shadow-sm bg-white dark:bg-[#0D1321] dark:text-white dark:border dark:border-white cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-orange-100 p-2 rounded-md">
                          <img src={QuizeImg} alt="" className="w-14 h-14 object-contain" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{quiz.title}</p>
                          <p className="text-xs opacity-80">
                            {quiz.schadule && !isNaN(new Date(quiz.schadule).getTime())
                              ? new Date(quiz.schadule).toLocaleDateString("en-GB")
                              : "Date not available"}{" "}
                            |{" "}
                            {quiz.schadule && !isNaN(new Date(quiz.schadule).getTime())
                              ? new Date(quiz.schadule).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                              : "--:--"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[#f3caab] text-sm font-semibold">Open →</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
 {/* RIGHT column: Calendar (no new quiz button) then Completed */}
      
          <div className="space-y-6">
            {isInstructor? (    <div className="bg-white rounded-lg main-border shadow p-4 dark:bg-[#0D1321] dark:text-white dark:border dark:border-white">
             
              <CustomCalendar
                markedDates={markedDates}
                showNewQuizButton={false}
              />
            </div>):""}

            <div className="bg-white rounded-lg  shadow p-4 dark:text-white dark:bg-[#0D1321] border border-[#000033] dark:border-[#fff]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Completed Quizzes</h2>
                <button className="text-sm text-[#f3caab] font-semibold hover:underline">Results →</button>
              </div>
              {loadingCompleted ? (
                <div className="py-6 flex justify-center"><Loader /></div>
              ) : errorCompleted ? (
                <p className="text-sm text-red-500">Failed to load completed quizzes.</p>
              ) : !completedData?.length ? (
                <Nodata message="No completed quizzes." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                    <thead className="bg-black text-[rgba(255,237,223,1)]">
                      <tr>
                        <th className="p-2 font-medium">Title</th>
                        <th className="p-2 font-medium">Group name</th>
                        <th className="p-2 font-medium">No. of persons in group</th>
                        <th className="p-2 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedData?.map((quiz: any) => (
                        <tr key={quiz._id} className="border-t">
                          <td className="p-2">{quiz.title}</td>
                          <td className="p-2">{quiz.group}</td>
                          <td className="p-2">{quiz.participants ?? 0} persons</td>
                          <td className="p-2">
                            {quiz.schadule && !isNaN(new Date(quiz.schadule).getTime())
                              ? new Date(quiz.schadule).toLocaleDateString("en-GB")
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
      )}

      {/* Modals */}
      {isInstructor && showQuizModal && (
        <QuizModal onClose={() => setShowQuizModal(false)} onSubmit={handleCreateQuiz} />
      )}

      {/* ✅ مودال كود الكويز بعد الإنشاء */}
      {codeModal.open && (
        <QuizCodeModal
          code={codeModal.code}
          title={codeModal.title}
          onClose={() => setCodeModal({ open: false, code: "" })}
        />
      )}

      {/* ✅ Join Quiz modal for Learner */}
      {!isInstructor && isJoinOpen && <JoinQuiz onClose={() => setIsJoinOpen(false)} />}
    </section>
  );
};

export default DashboardQuizzes;

/* --------- Helper Card --------- */
const Card = ({
  title,
  children,
  loading,
  error,
  actionLabel,
}: {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  actionLabel?: string;
}) => (
  <div className="bg-white rounded-lg border shadow p-4 dark:bg-[#0D1321] dark:text-white  dark:border-white">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {actionLabel && <button className="text-sm text-[#f3caab] font-semibold">{actionLabel}</button>}
    </div>
    {loading ? (
      <div className="py-6 flex justify-center"><Loader /></div>
    ) : error ? (
      <p className="text-sm text-red-500">Failed to load data.</p>
    ) : (
      children
    )}
  </div>
);

/* --------- Quiz Code Modal --------- */
function QuizCodeModal({
  code,
  title,
  onClose,
}: {
  code: string;
  title?: string;
  onClose: () => void;
}) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#0D1321] dark:text-white main-border shadow-xl rounded-xl w-[95%] max-w-md p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#172038]"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-1">Quiz Created</h3>
        {title && <p className="text-sm opacity-80 mb-3">Title: {title}</p>}

        <div className="bg-[#FFEDDF] text-[#0D1321] rounded-lg px-4 py-5 flex items-center justify-between gap-3">
          <div className="font-mono text-2xl tracking-widest">{code}</div>
          <button
            onClick={copy}
            className="shrink-0 px-3 py-1.5 dark:text-[#fff] rounded-md border border-[#0D1321] hover:bg-white/60"
          >
            Copy
          </button>
        </div>

        <p className="text-sm mt-3 opacity-80 dark:text-[#fff]">
          Share the code with students so they can join the exam.
        </p>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-black text-[rgba(255,237,223,1)] hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
