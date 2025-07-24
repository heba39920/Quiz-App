import InputField from "@/components/InputField";
import { FaCircleCheck, FaKey } from "react-icons/fa6";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Login = () => {
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
      <form className="space-y-5">
        {/* Email */}
        <div>
          <label className="text-sm block mb-1">Registered email address</label>
          <InputField
            icon={<IoMdMail />}
            placeholder="Type your email"
            type="email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm block mb-1">Password</label>
          <InputField
            icon={<FaKey />}
            placeholder="Type your password"
            type="password"
          />
        </div>

        {/* Submit + Forgot Password */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-12">
          <button
            type="submit"
            className="bg-white text-black font-semibold py-2 px-6 rounded-md flex items-center justify-center gap-2"
          >
            Sign In <FaCircleCheck className="size-6" />
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
