import { MdFeaturedPlayList } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useState } from "react";
import { useCompletedQuizzes, useIncomingQuizzes } from "@/utils/hooks/StudentExam";
import JoinQuiz from "../JoinQuiz/JoinQuiz";


export default function LearnerDashboard() {
  const { data: incomingQuizzes, isLoading: loadingIncoming } = useIncomingQuizzes();
  const { data: completedQuizzes, isLoading: loadingCompleted } = useCompletedQuizzes();
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  return (
    <div className="flex">
  

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quizzes</h1>
          {/* <button
            onClick={() => setIsJoinOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
          >
            Join Quiz
          </button> */}
        </div>

        {/* Join Quiz Big Button */}
        <div
          onClick={() => setIsJoinOpen(true)}
          className="border-2 border-dashed border-gray-400 rounded-xl flex flex-col justify-center items-center py-12 cursor-pointer hover:bg-gray-100 transition"
        >
          <MdFeaturedPlayList className="text-4xl text-amber-500 mb-2" />
          <p className="text-lg font-semibold">Join Quiz</p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Upcoming Quizzes */}
          <section>
            <h2 className="flex items-center gap-2 font-bold text-lg mb-2">
              <MdFeaturedPlayList /> Upcoming Quizzes
            </h2>
            {loadingIncoming ? (
              <p>Loading...</p>
            ) : incomingQuizzes?.length ? (
              incomingQuizzes.map((quiz: any) => (
                <div key={quiz._id} className="border p-3 rounded-lg mb-3">
                  <p className="font-bold">{quiz.title}</p>
                  <p>Date: {new Date(quiz.schadule).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No upcoming quizzes</p>
            )}
          </section>

          {/* Completed Quizzes */}
          <section>
            <h2 className="flex items-center gap-2 font-bold text-lg mb-2">
              <IoCheckmarkDoneCircleSharp /> Completed Quizzes
            </h2>
            {loadingCompleted ? (
              <p>Loading...</p>
            ) : completedQuizzes?.length ? (
              completedQuizzes.map((quiz: any) => (
                <div key={quiz._id} className="border p-3 rounded-lg mb-3">
                  <p className="font-bold">{quiz.title}</p>
                  <p>Score: {quiz.score}</p>
                </div>
              ))
            ) : (
              <p>No completed quizzes</p>
            )}
          </section>
        </div>
      </div>

      {/* Join Quiz Modal */}
      {isJoinOpen && <JoinQuiz onClose={() => setIsJoinOpen(false)} />}
    </div>
  );
}
