import type {
  CompletedQuiz,
  CreateQuizPayload,
  CreateQuizResponse,
  FirstFiveIncoming,
  Quiz,
} from "@/interface/QuizzesInterface";
import {
  createQuiz,
  FetchfirstFiveIncomming,
  FetchLastFiveCompleted,
  fetchQuizDetails,
} from "@/services/API/Quizzes";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usefirstFiveIncommingQ = () => {
  return useQuery<FirstFiveIncoming[], Error>({
    queryFn: FetchfirstFiveIncomming,
    queryKey: ["firstFiveIncomming"],
  });
};

export const useLastFiveCompletedQ = () => {
  return useQuery<CompletedQuiz[]>({
    queryFn: FetchLastFiveCompleted,
    queryKey: ["lastFiveCompleted"],
  });
};


export const useCreateQuiz = () => {
  return useMutation<CreateQuizResponse, Error, CreateQuizPayload>({
    mutationFn: createQuiz,
  });
};

export const useQuizDetails = (quizId: string) => {
  return useQuery<Quiz, Error>({
    queryKey: ["quizDetails", quizId], // cache لكل Quiz ID
    queryFn: () => fetchQuizDetails(quizId),
    enabled: !!quizId, // عشان ما ينفذش لو quizId فاضي
  });
};