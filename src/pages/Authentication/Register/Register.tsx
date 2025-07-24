import InputField from "@/components/InputField";
import {
  BsFillPersonFill,
  BsFillPersonPlusFill,
  BsPersonBadge,
} from "react-icons/bs";
import { FaLock, FaUser } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/validation/validation";
import type { RegisterPayload } from "@/interface/AuthInterface";
import { useRegister } from "@/utils/hooks/Auth";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  // ✅ React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
  });

  // ✅ Mutation Hook
  const registerMutation = useRegister();

  // ✅ Submit handler
  const onSubmit = (data: RegisterPayload) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Registration successful!");
        navigate("/login");
      },
    });
  };

  return (
    <>
      <h2 className="text-xl text-lime-300 font-semibold mb-6">
        Create your account and start using QuizWiz!
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          className="flex items-center flex-col gap-2 px-[63px] py-[19px] bg-[#333333]"
          onClick={() => navigate("/login")}
        >
          <BsFillPersonFill className="text-5xl" />
          <p>Sign in</p>
        </button>
        <button
          type="button"
          className="flex items-center flex-col gap-2 px-[63px] py-[19px] bg-[#333333] border-2 border-lime-400 text-lime-400 rounded-md"
        >
          <BsFillPersonPlusFill className="text-5xl" />
          <p>Sign Up</p>
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col min-h-[200px] justify-between"
      >
        {/* First & Last Name */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm block mb-1">First Name</label>
            <InputField
              icon={<FaUser />}
              placeholder="Enter your first name"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label className="text-sm block mb-1">Last Name</label>
            <InputField
              icon={<FaUser />}
              placeholder="Enter your last name"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm block">Email Address</label>
          <InputField
            icon={<IoMdMail />}
            placeholder="Type your email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="text-sm block">Role</label>
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <span className="px-3 text-black text-xl">
              <BsPersonBadge />
            </span>
            <select
              {...register("role")}
              className="w-full px-3 py-2 bg-[#0c0f1a] border-3 border-white text-white outline-none"
            >
              <option value="">Select Role</option>
              <option value="Instructor">Instructor</option>
              <option value="Student">Student</option>
            </select>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm block">Password</label>
          <InputField
            icon={<FaLock />}
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="bg-white text-black font-semibold py-2 px-6 w-50 rounded-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {registerMutation.isPending ? (
            <>
              Registering... <ImSpinner2 className="animate-spin size-5" />
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </>
  );
};

export default Register;
