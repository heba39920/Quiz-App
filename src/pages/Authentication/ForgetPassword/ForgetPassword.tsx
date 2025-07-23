import InputField from "@/components/InputField";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <>
      <h2 className="text-xl text-lime-300 font-semibold mb-6">
        Forget password
      </h2>

      <form className="space-y-6 flex flex-col min-h-[300px] justify-between">
        {/* Email input */}
        <div>
          <label className="text-sm block mb-1">Email address</label>
          <InputField
            icon={<IoMdMail />}
            placeholder="Type your email"
            type="email"
          />
        </div>

        {/* Submit button */}
        <div className="mt-12">
          <button
            type="submit"
            className="bg-white text-black font-semibold py-2 px-6 rounded-md flex items-center gap-2"
          >
            Send email <FaCircleCheck className="size-6" />
          </button>
        </div>

        {/* Link at the bottom */}
        <div className="mt-36 flex justify-end">
          <span className="text-sm">Forgot password? </span>
          <Link to="forget-password" className="text-sm text-lime-400 underline">
            click here
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
