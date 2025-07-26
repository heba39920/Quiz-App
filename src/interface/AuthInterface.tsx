/************Forget password************** */
export interface ForgetPasswordPayload {
  email: string;
}
/************reset password************** */
export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirmPassword?: string; }

/************change password************** */
export interface ChangePasswordData {
  password: string;
  password_new: string; }

/************Register************** */
export interface RegisterPayload {
  first_name :string;
  last_name:string;
  email:string;
  password:string;
  role:string;
}  


/**************Login interface******/
export interface LoginPayload {
  email:string;
  password:string;
}