import { fetchCompletedQuizzes, fetchIncomingQuizzes, fetchQuizWithoutAnswer, joinQuiz, submitQuiz } from "@/services/API/StudentExam"
import { useMutation, useQuery } from "@tanstack/react-query"


// export const useQuizWithoutAnswer = (id:string) =>{

//     return useQuery ({

//         queryKey: ["quizWithoutAnswer", id],
//         queryFn: () => fetchQuizWithoutAnswer(id),
//         enabled: !!id, // عشان ما يعملش fetch لو id فاضي
//     })
// }

export const useQuizWithoutAnswer = (id: string) => {
  console.log("Fetching Quiz with ID:", id);
  return useQuery({
    queryKey: ["quizWithoutAnswer", id],
    queryFn: () => fetchQuizWithoutAnswer(id),
    enabled: !!id,
  });
};

export const useJoinQuiz = () => {
  return useMutation({
    mutationFn: (code: string) => joinQuiz(code),
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({ quizId, answers }: { quizId: string; answers: any }) =>
      submitQuiz(quizId, { answers }),  // << هنا وضعتهم داخل كائن
  });
};


export const useIncomingQuizzes = () => {
  return useQuery({
    queryKey: ["incomingQuizzes"],
    queryFn: fetchIncomingQuizzes,
  });
};

export const useCompletedQuizzes = () => {
  return useQuery({
    queryKey: ["completedQuizzes"],
    queryFn: fetchCompletedQuizzes,
  });
};