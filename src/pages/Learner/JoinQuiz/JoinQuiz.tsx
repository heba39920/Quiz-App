import { useJoinQuiz } from "@/utils/hooks/StudentExam";
import { useState } from "react";


export default function JoinQuiz({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const joinMutation = useJoinQuiz();

//   const handleJoin = () => {
//     joinMutation.mutate(code, {
//       onSuccess: (data) => {
//         console.log("Joined quiz:", data);
//         onClose();
//       },
//       onError: (err) => {
//         console.error(err);
//       },
//     });
//   };

const handleJoin = () => {
  joinMutation.mutate(code, {
    onSuccess: (data) => {
      console.log("API Response:", data); // شوفي هنا إيه اللي راجع
    },
    onError: (error) => {
      console.error("Join failed:", error);
    },
  });
};


  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
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
          <button
            onClick={handleJoin}
            className="px-4 py-2 bg-amber-500 text-white rounded"
          >
            ✔
          </button>
        </div>
      </div>
    </div>
  );
}
