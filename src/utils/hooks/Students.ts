import type { TopStudent } from "@/interface/StudentInterface";
import {
  deleteStudent,
  deleteStudentFromGroup,
  getAllStudents,
  getAllStudentsWithoutGroup,
  getStudentById,
  getTopFiveStudents,
} from "@/services/API/Students";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAllStudents = () => {
  return useQuery({
    queryFn: getAllStudents,
    queryKey: ["students"],
  });
};

export const useGetAllStudentsWithoutGroup = () => {
  return useQuery({
    queryFn: getAllStudentsWithoutGroup,
    queryKey: ["studentsWithoutGroup"],
  });
};
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: (data) => {
      toast.success(data.message || "student has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
export const useDeleteStudentFromGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      studentId,
      groupId,
    }: {
      studentId: string;
      groupId: string;
    }) => deleteStudentFromGroup(studentId, groupId),
    onSuccess: (data) => {
      toast.success(
        data.message || "student has been deleted from this group successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useStudentDetails = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id),
    enabled: !!id && enabled,
    retry: false,
  });
};

export const useTopFiveStudents = () => {
  return useQuery<TopStudent[]>({
    queryKey: ["topFiveStudents"],
    queryFn: getTopFiveStudents,
    staleTime: 1000 * 60 * 5,
  });
};
