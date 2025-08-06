import { fetchQuizWithoutAnswer } from "@/services/API/StudentExam"
import { useQuery } from "@tanstack/react-query"


export const useQuizWithoutAnswer = (id:string) =>{

    return useQuery ({

        queryKey: ["quizWithoutAnswer", id],
        queryFn: () => fetchQuizWithoutAnswer(id),
        enabled: !!id, // عشان ما يعملش fetch لو id فاضي
    })
}