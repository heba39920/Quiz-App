import type { TopStudent } from "@/interface/StudentInterface";
import { axiosInstance, STUDENT_URLS } from "../EndPoints/EndPoints";
export const getAllStudentsWithoutGroup = async () => {
  const response = await axiosInstance.get(
    STUDENT_URLS.GET_ALL_STUDENTS_WITHOUT_GROUP
  );
  return response.data;
};

export const getAllStudents = async () => {
  const response = await axiosInstance.get(STUDENT_URLS.GET_ALL_STUDENT);
  return response.data;
};
export const deleteStudent = async (id: string) => {
  const response = await axiosInstance.delete(STUDENT_URLS.DELETE_STUDENT(id));
  return response.data;
};
export const deleteStudentFromGroup = async (
  studentId: string,
  groupId: string
) => {
  const response = await axiosInstance.delete(
    STUDENT_URLS.DELETE_STUDENT_FROM_GROUP(studentId, groupId)
  );

  return response.data;
};

export const getStudentById = async (id: string) => {
  const response = await axiosInstance.get(STUDENT_URLS.GET_STUDENT_BY_ID(id));
  return response.data;
};

export const getTopFiveStudents = async (): Promise<TopStudent[]> => {
  const { data } = await axiosInstance.get(STUDENT_URLS.GET_TOP_FIVE);
  return Array.isArray(data) ? data : data?.data ?? [];
};

