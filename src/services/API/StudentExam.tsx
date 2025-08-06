import { axiosInstance, STUDENT_EXAM } from "../EndPoints/EndPoints";


export const fetchQuizWithoutAnswer = async (id : string) =>{
  const response = await axiosInstance.get(STUDENT_EXAM.GET_QUIZWITHOUTANSWER(id));
  return response.data;

}