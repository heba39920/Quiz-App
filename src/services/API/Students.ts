

import type { StudentResponse, StudentsListResponse } from "@/interface/StudentInterface";
import { axiosInstance, STUDENT_URLS } from "../EndPoints/EndPoints";
export const getAllStudentsWithoutGroup = async ():Promise<StudentsListResponse> => {

      const response = await axiosInstance.get(STUDENT_URLS.GET_ALL_STUDENTS_WITHOUT_GROUP);
      return response.data;
};

export const getAllStudents= async ():Promise<StudentsListResponse> => {

      const response = await axiosInstance.get(STUDENT_URLS.GET_ALL_STUDENT);
      return response.data;
};
export const deleteStudent= async (id:string) => {

      const response = await axiosInstance.delete(STUDENT_URLS.DELETE_STUDENT(id));
      return response.data;
};
export const deleteStudentFromGroup= async (studentId:string, groupId:string) => {

      const response = await axiosInstance.delete(STUDENT_URLS.DELETE_STUDENT_FROM_GROUP(studentId, groupId));
      return response.data;
};

export const getStudentById= async (id:string): Promise<StudentResponse>  => {

      const response = await axiosInstance.get(STUDENT_URLS.GET_STUDENT_BY_ID(id));
      return response.data;
};