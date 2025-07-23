export interface ForgetPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirmPassword?: string; }
/************change password************** */
export interface ChangePasswordData {
  password: string;
  password_new: string; }