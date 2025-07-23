import InputField from "@/components/InputField";
import { FaCircleCheck } from "react-icons/fa6";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h2 className="text-xl text-lime-300 font-semibold mb-6">
        Continue your learning journey with QuizWiz!
      </h2>

      <div className="flex gap-4 mb-6">
        <button className="flex items-center flex-col gap-2 px-[63px] py-[19px] border-2 border-lime-400 text-lime-400 rounded-md bg-[#333333]">
          <BsFillPersonFill className="text-5xl" />
          <p> Sign in</p>
        </button>
        <button className="flex items-center flex-col gap-2 px-[63px] py-[19px] bg-[#333333] text-white rounded-md">
          <BsFillPersonPlusFill className="text-5xl" />
          <p>Sign Up</p>
        </button>
      </div>

      {/* المدخلات */}
      <form className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Registered email address</label>
          <InputField
            icon={<IoMdMail />}
            placeholder="Type your email"
            type="email"
          />
        </div>

        <div>
          <>
            <label className="text-sm block mb-1">Password</label>
            <InputField
              icon={<FaKey />}
              placeholder="Type your password"
              type="password"
            />
          </>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="bg-white text-black font-semibold py-2 px-6 rounded-md flex items-center gap-2"
          >
            Sign In <FaCircleCheck className="size-7" />
          </button>
          <div>
            <span className="text-sm"> Forgot password? </span>
            <Link
              to="forget-password"
              className="text-sm text-lime-400 underline"
            >
              click here
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
