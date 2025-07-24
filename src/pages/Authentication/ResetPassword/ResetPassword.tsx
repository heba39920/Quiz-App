// src/pages/Authentication/ResetPassword.tsx
import InputField from "@/components/InputField";
import { IoMdMail } from "react-icons/io";
import { FaCircleCheck, FaKey } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/utils/validation/validation";
import type { z } from "zod";
import { useResetPassword } from "@/utils/hooks/Auth";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPasswordMutation = useResetPassword();
  const [isLoading, setIsLoading] = useState(false);
  const email = useLocation()?.state?.email;

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const onSubmit = (data: ResetPasswordPayload) => {
    setIsLoading(true);
    resetPasswordMutation.mutate(data, {
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      <h2 className="text-xl text-lime-300 font-semibold mb-6">
        Reset Password
      </h2>

      <div>
        <label className="text-sm block mb-1">Email</label>
        <InputField
          icon={<IoMdMail />}
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm block mb-1">OTP</label>
        <InputField
          icon={<IoMdMail />}
          type="text"
          placeholder="Enter OTP"
          {...register("otp")}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm block mb-1">Password</label>
        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Enter new password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm block mb-1">Confirm Password</label>
        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className=" bg-white text-black font-semibold py-2 rounded-md flex items-center justify-center gap-2 disabled:opacity-70 mt-12 w-50"
      >
        {isLoading ? (
          <>
            Resetting... <ImSpinner2 className="animate-spin" />
          </>
        ) : (
          <>
            Reset <FaCircleCheck />
          </>
        )}
      </button>
    </form>
  );
};

export default ResetPassword;
