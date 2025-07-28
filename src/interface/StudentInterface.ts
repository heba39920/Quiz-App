
export interface Student {
  _id : string,
  first_name: string,
      last_name: string,
       email: string,
     status: string,
        role: string,
        group: Group;

}

interface Group {
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
export interface StudentWithoutGroup {
  _id : string,
  first_name: string,
      last_name: string,
       email: string,
     status: string,
        role: string,
}
export interface StudentResponse {
  data: Student | Student[]; 
  message?: string; 
}


export interface StudentsListResponse {
  data: Student[];
  message?: string;
}