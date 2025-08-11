import { fetchIncomingQuizzes } from "@/services/API/StudentExam";
import { useJoinQuiz } from "@/utils/hooks/StudentExam";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function JoinQuiz({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const joinMutation = useJoinQuiz();
  const navigate = useNavigate();

  const handleJoin = () => {
    joinMutation.mutate(code, {
      onSuccess: (data) => {
        toast.info(data.message || "Joined successfully");
        onClose();

        
        fetchIncomingQuizzes().then((quizzes) => {
          
          const quiz = quizzes.find((q:any) => q.code === code);
          if (quiz) {
           
            navigate(`/dashboard/exammodel/${quiz._id}`);
          } else {
            toast.error("Quiz not found in incoming quizzes");
          }
        });
      },
      onError: (error:any) => {
        toast.error(error?.response?.data?.message || error.message || "Unknown error");
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm dark:bg-[#0D1321] dark:text-[#fff] dark:border dark:border-[#fff]" >
        <h2 className="text-xl font-bold mb-4">Join Quiz</h2>
        <input
          type="text"
          placeholder="Enter quiz code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            ✖
          </button>
          <button onClick={handleJoin} className="px-4 py-2 bg-amber-500 text-white rounded">
            ✔
          </button>
        </div>
      </div>
    </div>
  );
}
