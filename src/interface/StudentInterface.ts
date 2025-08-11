import { getTopFiveStudents } from "@/services/API/Students";
import { useQuery } from "@tanstack/react-query";

// src/types/Student.ts
export interface Group {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: Group;
}

// types
export interface TopStudent {
  _id: string;
  first_name: string;
  last_name: string;
  group?: { name?: string } | string | null;
  average_score?: number;
  rank?: number;
}

// hook
export const useTopFiveStudents = () => {
  return useQuery<TopStudent[]>({
    queryKey: ["topFiveStudents"],
    queryFn: getTopFiveStudents, 
    staleTime: 1000 * 60 * 5,
  });
};
