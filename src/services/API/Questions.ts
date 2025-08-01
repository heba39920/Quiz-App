import { axiosInstance, QUESTIONS_URLS } from "../EndPoints/EndPoints";

export const addQuestion= async (data:any) => {
      const response = await axiosInstance.post(QUESTIONS_URLS.ADD_QUESTION, data);
      return response.data;
};
export const editQuestion= async (id:string) => {

      const response = await axiosInstance.put(QUESTIONS_URLS.UPDATE_QUESTION(id));
      return response.data;
};