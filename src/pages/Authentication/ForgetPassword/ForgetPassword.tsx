import InputField from "@/components/InputField";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ForgetPasswordPayload } from "@/interface/AuthInterface";
import { useForgotPassword } from "@/utils/hooks/Auth";
import { emailValidation } from "@/utils/validation/validation";
import { useEffect, useState } from "react";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordPayload>();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = (data: ForgetPasswordPayload) => {
    setIsLoading(true);

    forgotPasswordMutation.mutate(data, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
    setTimeout(() => {
      navigate("/reset-password", { state: { email: data.email } });
    }, 2000);
  };



  return (
    <>
      <h2 className="text-xl text-lime-300 font-semibold mb-6">
        Forget password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col min-h-[300px] justify-between"
      >
        {/* Email input */}
        <div>
          <label className="text-sm block mb-1">Email address</label>
          <InputField
            icon={<IoMdMail />}
            placeholder="Type your email"
            type="email"
            {...register("email", emailValidation)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div className="mt-12">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black font-semibold py-2 px-6 rounded-md flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                Sending... <ImSpinner2 className="animate-spin size-5" />
              </>
            ) : (
              <>
                Send email <FaCircleCheck className="size-6" />
              </>
            )}
          </button>
        </div>

        {/* Link at the bottom */}
        <div className="mt-36 flex justify-end">
          <span className="text-sm">Forgot password? </span>
          <Link
            to="forget-password"
            className="text-sm text-lime-400 underline"
          >
            click here
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
