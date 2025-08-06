import type { CompletedQuiz, CreateQuizPayload, CreateQuizResponse, FirstFiveIncoming, Quiz} from "@/interface/QuizzesInterface";
import { axiosInstance, QUIZZES_URL } from "../EndPoints/EndPoints"


export const FetchfirstFiveIncomming=async()=>{
  const response = await axiosInstance.get<FirstFiveIncoming[]>(QUIZZES_URL.GET_FIRSTFIVEINCOMING);
return response.data;
}
export const FetchLastFiveCompleted = async (): Promise<CompletedQuiz[]> => {
  const response = await axiosInstance.get(QUIZZES_URL.GET_LASTFIVECOMPLETED);
  return response.data;
};

export const createQuiz = async (
  payload: CreateQuizPayload
): Promise<CreateQuizResponse> => {
  const response = await axiosInstance.post(QUIZZES_URL.CREATE_NEW_QUIZE, payload);
  return response.data;
};

export const fetchQuizDetails = async (quizId: string): Promise<Quiz> => {
  const response = await axiosInstance.get(QUIZZES_URL.GET_QUIZ_DETAILS(quizId));
  return response.data;
};