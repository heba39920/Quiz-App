export interface ForgetPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirmPassword?: string; }


export interface RegisterPayload {
  first_name :string;
  last_name:string;
  email:string;
  password:string;
  role:string;
}  