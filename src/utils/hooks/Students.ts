import { deleteStudent, deleteStudentFromGroup, getAllStudents, getAllStudentsWithoutGroup, getStudentById } from "@/services/API/Students";
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
      queryClient.invalidateQueries({ queryKey: ["GroupList"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
export const useDeleteStudentFromGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (studentId: string, groupId:string) => deleteStudentFromGroup(studentId, groupId),
    onSuccess: (data) => {
      toast.success(data.message || "student has been deleted from this group successfully");
      queryClient.invalidateQueries({ queryKey: ["students", "studentsWithoutGroup"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGroupDetails = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id),
    enabled: !!id && enabled,
    retry: false,
  });
};
