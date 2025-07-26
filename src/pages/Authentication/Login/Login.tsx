import InputField from "@/components/InputField";
import {FaCircleCheck, FaLock} from "react-icons/fa6";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import {Link, useNavigate} from "react-router-dom";
import type {LoginPayload} from "@/interface/AuthInterface.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/utils/validation/validation.ts";
import {useLogin} from "@/utils/hooks/Auth.tsx";
import {ImSpinner2} from "react-icons/im";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,

      handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({resolver: zodResolver(loginSchema),});
  const loginMutation = useLogin();
const onSubmit = (data: LoginPayload)=>{

  loginMutation.mutate(data)
  navigate("/dashboard")
}
  return (
    <div className="w-full max-w-lg lg:max-w-2xl  sm:px-6 md:px-0">
      <h2 className="text-xl lg:text-2xl text-lime-300 font-semibold mb-6 lg:text-start md:text-center">
        Continue your learning journey with QuizWiz!
      </h2>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Sign In */}
        <button className="flex flex-col items-center justify-center gap-2 w-full sm:w-1/2 py-4 bg-[#333333] text-lime-400 border-2 border-lime-400 rounded-md">
          <BsFillPersonFill className="text-4xl lg:text-5xl" />
          <p className="text-sm lg:text-base">Sign in</p>
        </button>

        {/* Sign Up */}
        <button className="flex flex-col items-center justify-center gap-2 w-full sm:w-1/2 py-4 bg-[#333333] text-white rounded-md">
          <BsFillPersonPlusFill className="text-4xl lg:text-5xl" />
          <Link to="/register" className="text-sm lg:text-base">
            Sign Up
          </Link>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="text-sm block mb-1">Registered email address</label>
          <InputField
              {...register("email")}
              icon={<IoMdMail />}
              placeholder="Type your email"
              type="email"
              error={errors.email?.message}
          />
          {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm block mb-1">Password</label>
          <InputField
              {...register("password")}
              icon={<FaLock />}
              type="password"
            placeholder="Type your password"

              error={errors.password?.message}
          />
          {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
          )}
        </div>

        {/* Submit + Forgot Password */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-12">


          <button
              type="submit"
              disabled={loginMutation.isPending}
              className="bg-white text-black font-semibold py-2 px-6 w-50 rounded-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? (
                <>
                  Sign In... <ImSpinner2 className="animate-spin size-5" />
                </>
            ) : (
                <>
                  <FaCircleCheck className="size-6" />
                  <span>Sign in </span>

                </>

            )}
          </button>

          <div className="text-sm">
            <span>Forgot password? </span>
            <Link to="/forget-password" className="text-lime-400 underline">
              Click here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
