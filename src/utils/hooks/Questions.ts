import type { QuestionsInterface } from "@/interface/QuestionsInterface";
import { addQuestion, editQuestion } from "@/services/API/Questions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const  useAddQuestion = () => {
    const QueryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: QuestionsInterface) => addQuestion(data),
        onSuccess: (data) => {
            toast.success(data.message || "Question has been added successfully");
            QueryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message);
        },
    });
}
export const useEditQuestion = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => editQuestion(id),
    onSuccess: (data) => {
      toast.success(data.message || "Question has been updated successfully");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};