// src/pages/Authentication/ResetPassword/ResetPassword.tsx

import InputField from "@/components/InputField";
import { FaCircleCheck, FaKey } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { ResetPasswordPayload } from "@/interface/AuthInterface";
import { useResetPassword } from "@/utils/hooks/Auth";
import {
  otpValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "@/utils/validation/validation";
import { useLocation, useParams } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ResetPasswordPayload>();

  const [isLoading, setIsLoading] = useState(false);
  const resetPasswordMutation = useResetPassword();
  const location = useLocation();
  const email = location.state?.email;
  const onSubmit = (data: ResetPasswordPayload) => {
    setIsLoading(true);
    resetPasswordMutation.mutate(data, {
      onSettled: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    setValue("email", email);
  });

  return (
    <>
      <h2 className="text-xl text-lime-300 font-semibold mb-6">
        Reset password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col min-h-[200px] justify-between"
      >
        {/* Email input */}
        <div>
          <label className="text-sm block ">Email address</label>
          <InputField
            icon={<IoMdMail />}
            placeholder="Type your email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* OTP input */}
        <div>
          <label className="text-sm block ">OTP</label>
          <InputField
            icon={<IoMdMail />}
            type="text"
            placeholder="Enter OTP"
            {...register("otp", otpValidation)}
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>

        {/* Password input */}
        <div>
          <label className="text-sm block ">Password</label>
          <InputField
            icon={<FaKey />}
            type="password"
            placeholder="Type your password"
            {...register("password", passwordValidation)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password input */}
        <div>
          <label className="text-sm block ">Confirm Password</label>
          <InputField
            icon={<FaKey />}
            type="password"
            placeholder="Type your confirm password"
            {...register(
              "confirmPassword",
              confirmPasswordValidation(watch("password"))
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black font-semibold py-2 px-6 rounded-md flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                Resetting... <ImSpinner2 className="animate-spin size-5" />
              </>
            ) : (
              <>
                Reset <FaCircleCheck className="size-6" />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
