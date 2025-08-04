import type {
  CompletedQuiz,
  CreateQuizPayload,
  CreateQuizResponse,
  FirstFiveIncoming,
} from "@/interface/QuizzesInterface";
import {
  createQuiz,
  FetchfirstFiveIncomming,
  FetchLastFiveCompleted,
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
