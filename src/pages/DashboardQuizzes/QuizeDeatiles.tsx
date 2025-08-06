import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuizDetails } from "@/utils/hooks/Quizzes";
import { Calendar, Clock } from "lucide-react";
import { FormInput } from "@/components/FormInput/FormInput"; 

const QuizeDeatiles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: quiz, isLoading, isError } = useQuizDetails(id!);

  if (isLoading) {
    return (
      <div className="w-full p-6 flex justify-center items-center">
        <p className="text-gray-500">Loading quiz details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-6 flex justify-center items-center">
        <p className="text-red-500">Error loading quiz details</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="w-full p-6 flex justify-center items-center">
        <p className="text-gray-500">No quiz found</p>
      </div>
    );
  }

  const date = quiz.schadule
    ? new Date(quiz.schadule).toLocaleDateString("en-GB")
    : "N/A";
  const time = quiz.schadule
    ? new Date(quiz.schadule).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-4">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>

        {/* Date & Time */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-500" />
            <span className="text-xl font-bold text-gray-600">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-gray-500" />
            <span className="text-xl font-bold text-gray-600">{time}</span>
          </div>
        </div>

        <p className="text-gray-500 mb-4">Quiz Details Overview</p>

        
        <FormInput label="Duration" labelWidth="190px" labelHeight="38px">
          <span className="ps-5 text-gray-700">{quiz.duration} mins</span>
        </FormInput>

        <FormInput label="Number of Questions" labelWidth="190px" labelHeight="38px">
          <span className=" ps-5 text-gray-700">{quiz.questions_number}</span>
        </FormInput>

        <FormInput label="Score per Question" labelWidth="190px" labelHeight="38px">
          <span className="ps-5 text-gray-700">{quiz.score_per_question}</span>
        </FormInput>

        <div className="border border-gray-300 rounded-xl overflow-hidden">
        <div className="bg-[#FFEDDF]  px-4 py-2 font-medium text-gray-700">
            Description
        </div>

        <div className="px-4 py-2">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {quiz.description}
            </p>
        </div>
        </div>



        <FormInput label="Question Bank" labelWidth="190px" labelHeight="38px">
          <span className=" ps-5 text-gray-700">Bank One</span>
        </FormInput>

    
        <div className="flex items-center gap-3  rounded-xl px-3 py-2">
          <input
            type="checkbox"
            checked={quiz.randomize}
            disabled
            className="w-5 h-5 accent-[#FFEDDF] cursor-not-allowed"
          />
          <span className="text-gray-700">Randomize Questions</span>
        </div>

        {/* Edit Button */}
        <div className="text-right">
          <button
            // onClick={() => navigate(`/dashboard/quizzes/edit/${quiz._id}`)}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Edit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizeDeatiles;
