// src/pages/Authentication/ForgetPassword/ForgetPassword.tsx

import InputField from "@/components/InputField";
import { IoMdMail } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/utils/validation/validation";
import { useForgotPassword } from "@/utils/hooks/Auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { z } from "zod";

// Infer the schema type
type ForgetPasswordPayload = z.infer<typeof forgetPasswordSchema>;

const ForgetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordPayload>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = (data: ForgetPasswordPayload) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        navigate("/reset-password", { state: { email: data.email } });
      },
      onError: () => {
        toast.error("Failed to send OTP");
      },
    });
  };

  return (
    <>
      <h2 className="text-2xl second-color font-semibold mb-6 lg:text-start tracking-wider">
        Forget Password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col min-h-[200px] justify-between  "
      >
        {/* Email Input */}
        <div>
          <label className="text-sm block mb-3">Email Address</label>
          <InputField
            icon={<IoMdMail />}
            placeholder="Enter your email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={forgotPasswordMutation.isPending}
          className="bg-white w-50 text-black font-semibold py-2 px-2 rounded-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {forgotPasswordMutation.isPending ? (
            <>
              Sending... <ImSpinner2 className="animate-spin size-5" />
            </>
          ) : (
            "Send Email"
          )}
        </button>
        <div className="text-sm flex justify-end">
          <span>Login? </span>
          <Link to="/login" className="second-color underline">
            Click here
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
