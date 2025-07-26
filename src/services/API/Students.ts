import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { axiosInstance, STUDENT_URLS } from "../EndPoints/EndPoints";
import { toast } from "react-toastify";
import type { StudentPayload } from "@/interface/StudentInterface";


export const useAddStudent = (): UseMutationResult<any, Error, StudentPayload> => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(STUDENT_URLS.ADD_STUDENT, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Student added successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};