import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "@/utils/validation/validation.ts";
import { useLogin } from "@/utils/hooks/Auth.tsx";
import type { LoginPayload } from "@/interface/AuthInterface.tsx";

/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "@/components/InputField";
import { FaCircleCheck, FaLock } from "react-icons/fa6";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const user = useSelector((state: any) => state.auth.user);
  console.log(user);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginPayload) => {
    loginMutation.mutate(data);

  };

  // Handle success/error after mutation
  useEffect(() => {
    if (loginMutation.isSuccess) {
  
      Cookies.set("token", loginMutation?.data?.data.accessToken, { expires: 7 , path: '/' });
     
   
     if (user?.role === "Instructor") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/learner-dashboard");
      }
    }
  }, [loginMutation.isSuccess, loginMutation.data?.token, navigate, loginMutation.data?.data?.accessToken,user?.role]);

  return (
    <div className="w-full max-w-lg lg:max-w-2xl sm:px-6 md:px-0">
      <h2 className="text-xl lg:text-2xl text-lime-300 font-semibold mb-6 lg:text-start md:text-center">
        Continue your learning journey with QuizWiz!
      </h2>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-6 mb-11 transition-all duration-300 ease-in-out">
        {/* Sign In */}
        <button
          onClick={() => {
            setActiveTab("signin");
            navigate("/login");
          }}
          className={`flex flex-col items-center justify-center gap-2 px-[63px] py-[19px] rounded-xl 
          transform transition-all duration-300 ease-in-out
          ${
            activeTab === "signin"
              ? "second-color second-border border bg-[#333333] scale-105"
              : "text-white border border-white bg-[#333333] scale-100"
          }`}
        >
          <BsFillPersonFill className="text-4xl lg:text-5xl" />
          <p className="text-sm lg:text-base font-bold">Sign in</p>
        </button>

        {/* Sign Up */}
        <button
          onClick={() => {
            setActiveTab("signup");
            navigate("/register");
          }}
          className={`flex flex-col items-center justify-center gap-2 px-[63px] py-[19px] rounded-xl 
          transform transition-all duration-300 ease-in-out
          ${
            activeTab === "signup"
              ? "second-color second-border border bg-[#333333] scale-105"
              : "text-white border border-white bg-[#333333] scale-100"
          }`}
        >
          <BsFillPersonPlusFill className="text-4xl lg:text-5xl" />
          <p className="text-sm lg:text-base font-bold">Sign Up</p>
        </button>
      </div>

      {/* Sign In Form */}
      {activeTab === "signin" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col min-h-[200px] justify-between"
        >
          {/* Email */}
          <div>
            <label className="text-sm block mb-3">Registered email address</label>
            <InputField
              {...register("email")}
              icon={<IoMdMail />}
              placeholder="Type your email"
              type="email"
              error={errors.email?.message}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm block mb-3">Password</label>
            <InputField
              {...register("password")}
              icon={<FaLock />}
              type="password"
              placeholder="Type your password"
              error={errors.password?.message}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
                  <span>Sign in</span>
                </>
              )}
            </button>

            <div className="text-sm">
              <span>Forgot password? </span>
              <Link to="/forget-password" className="second-color underline">
                Click here
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;