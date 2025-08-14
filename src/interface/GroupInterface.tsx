export interface Group {
  _id: string;
  name: string;
  status: "active" | "inactive" | string;
  instructor: string;
  students: string[];
  max_students: number;
}

export type GroupResponse = Group[];

export interface GroupDelete {
  data: GroupDeleteData;
  message: string;
}

export interface GroupDeleteData {
  _id: string;
  name: string;
  status: "active" | "inactive" | string;
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
}

export interface GroupView {
  _id: string;
  name: string;
  status: "active" | "inactive";
  max_students: number;
  instructor: string;
  students: Student[];
}


export interface GroupAdd {
    name: string;
    students: string[];
}

export interface StudentUpdate {
  id: string;
  name: string;
}