import { fetchQuizWithoutAnswer, joinQuiz, submitQuiz } from "@/services/API/StudentExam"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useQuizWithoutAnswer = (id:string) =>{

    return useQuery ({

        queryKey: ["quizWithoutAnswer", id],
        queryFn: () => fetchQuizWithoutAnswer(id),
        enabled: !!id, // عشان ما يعملش fetch لو id فاضي
    })
}

export const useJoinQuiz = () => {
  return useMutation({
    mutationFn: (code: string) => joinQuiz(code),
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({ quizId, answers }: { quizId: string; answers: any }) =>
    submitQuiz(quizId, answers),
  });
};