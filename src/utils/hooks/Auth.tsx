import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import {
  changePassword,
  forgotPassword,
  logout,
  register,
  resetPassword,
  login,
} from "@/services/API/Auth";
import type {
  ForgetPasswordPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/interface/AuthInterface";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  clearAuthData, getPersistedProfile, setAuthData } from "@/services/UserData";


export const useForgotPassword = (): UseMutationResult<
  any,
  unknown,
  ForgetPasswordPayload,
  unknown
> => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Check your email for reset instructions!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useResetPassword = (): UseMutationResult<
  any,
  Error,
  ResetPasswordPayload,
  unknown
> => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password has been changed successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong with changing your password!"
      );
    },
  });
};
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
  mutationFn: logout,
    
      onSuccess: () => {
        // Clear in-memory token
       clearAuthData()
        // Clear current user data from cache
        queryClient.setQueryData(['me'], null);
        toast.success('Logged out');
        // Redirect to login page
        navigate('/login', { replace: true });
      },
      onError: (e:any) => {
        toast.error(e?.response?.data?.message || 'Logout failed');
      },
    }
  );
};


export const useRegister = (): UseMutationResult<
  any,
  Error,
  RegisterPayload,
  unknown
> => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Registration successful! You can now log in.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
export const useCurrentUser = () => {

  
  // Get initial state from localStorage
  const user = getPersistedProfile();
  


  return { 
    user

  };
};
export const useLogin = () => {  
  const navigate = useNavigate();  

  return useMutation(  {
    mutationFn: login,
      onSuccess: (response:any) => {  
 
      
          
        const {data} = response ?? {};  
        const { accessToken, profile, message } = data;  
      
        

        if (!accessToken || !profile) {  
          toast.error('No token or user profile returned from server');  
          return;  
        }  

        // Persist token in memory for subsequent requests  
setAuthData(accessToken, profile);

      

        toast.success(message ?? 'Logged in successfully!');  

        const redirectPath =  
          profile?.role === 'Instructor' ? '/dashboard' : '/dashboard/quizzes';  
        navigate(redirectPath, { replace: true });  
      },  
      onError: (error: any) => {  
        toast.error(error?.response?.data?.message || 'Something went wrong');  
      },  
    }  
  );  
};  


