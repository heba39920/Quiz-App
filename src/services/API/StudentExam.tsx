import { axiosInstance, STUDENT_EXAM } from "../EndPoints/EndPoints";


export const fetchQuizWithoutAnswer = async (id : string) =>{
  const response = await axiosInstance.get(STUDENT_EXAM.GET_QUIZWITHOUTANSWER(id));
  return response.data.data;

}

export const joinQuiz  = async (code: string)=>{
  const response = await axiosInstance.post(STUDENT_EXAM.JOIN_EXAM , {code});
  return response.data;

}

export const submitQuiz = async (quizId: string, data: any) => {
  const response = await axiosInstance.post(STUDENT_EXAM.SUBMIT_QUIZ(quizId), data);
  return response.data;
};


export const fetchIncomingQuizzes = async () => {
  const { data } = await axiosInstance.get(STUDENT_EXAM.GET_INCOMING);
  return data;
};

export const fetchCompletedQuizzes = async () => {
  const { data } = await axiosInstance.get(STUDENT_EXAM.GET_COMPLETED);
  return data;
};

export const fetchResults = async ()=>{
  const {data} = await axiosInstance.get(STUDENT_EXAM.GET_RESULTS);
  return data;
};