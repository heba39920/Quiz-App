import { fetchIncomingQuizzes } from "@/services/API/StudentExam";
import { useJoinQuiz } from "@/utils/hooks/StudentExam";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function JoinQuiz({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const joinMutation = useJoinQuiz();
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!code.trim()) {
      toast.error("Please enter a quiz code");
      return;
    }

    joinMutation.mutate(code.trim(), {
      onSuccess: async (data: any) => {
        toast.info(data?.message || "Joined successfully");
        try {
          const quizzes = await fetchIncomingQuizzes();
          const quiz = quizzes.find((q: any) => q.code === code.trim());
          if (quiz?._id) {
            onClose();
            navigate(`/dashboard/exammodel/${quiz._id}`);
          } else {
            toast.error("Quiz not found in incoming quizzes");
          }
        } catch (e) {
          toast.error("Failed to fetch quizzes");
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || error?.message || "Unknown error"
        );
      },
    });
  };

  // اغلاق بـ Esc
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl border bg-white dark:bg-[#0D1321] dark:text-white dark:border-[#fff]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-lg sm:text-xl font-semibold text-[#000333] dark:text-[#fff]">
            Join Quiz
          </h2>
          <button
            onClick={onClose}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border dark:text-[#fff] border-gray-200 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-[#182037] transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form
          className="px-5 pb-5 pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleJoin();
          }}
        >
          <label className="block text-sm mb-2 opacity-80">
            Enter quiz code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. ABC123"
            className="w-full h-11 px-3 rounded-md  border focus:outline-none focus:ring-2 focus:ring-[#f3caab] dark:bg-transparent dark:border-[#fff]"
          />

          {/* Footer */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-md border border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-[#182037] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={joinMutation.isPending}
              className="h-10 px-5 rounded-md bg-black text-[rgba(255,237,223,1)] hover:opacity-90 disabled:opacity-60 transition"
            >
              {joinMutation.isPending ? "Joining..." : "Join"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
