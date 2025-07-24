import InputField from "@/components/InputField";
import type { RegisterPayload } from "@/interface/AuthInterface";
import { useRegister } from "@/utils/hooks/Auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPersonFill, BsFillPersonPlusFill, BsPersonBadge } from "react-icons/bs"
import { FaLock, FaUser } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom"


const Register = () => {

  const {
    register , 
    handleSubmit,
    formState: { errors },
  } = useForm <RegisterPayload>();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const registerMutation = useRegister();

 const onSubmit = (data: RegisterPayload) => {
    setIsLoading(true);
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate("/login");
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };


  return (
    <>
       <h2 className="text-xl text-lime-300 font-semibold mb-6">
          Create your account and start using QuizWiz!
        </h2>

      <div className="flex gap-4 mb-6">
        <button className="flex items-center flex-col gap-2 px-[63px] py-[19px]  bg-[#333333]"
        onClick={()=> navigate("/login")}>
          <BsFillPersonFill className="text-5xl" />
          <p> Sign in</p>
        </button>
        <button className="flex items-center flex-col gap-2 px-[63px] py-[19px] bg-[#333333] border-2 border-lime-400 text-lime-400 rounded-md"
        onClick={()=>navigate ("/register") }>
          <BsFillPersonPlusFill className="text-5xl" />
          <p>Sign Up</p>
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm block mb-1">First Name</label>
                <InputField
                  icon={<FaUser />}
                  placeholder="Enter your first name"
                  {...register("first_name", { required: "First name is required" })}
                />
                 {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
            )}
              </div>

              
              <div className="flex-1">
                <label className="text-sm block mb-1">Last Name</label>
                <InputField
                  icon={<FaUser />}
                  placeholder="Enter your last name"
                  {...register("last_name", { required: "Last name is required" })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm block mb-1">Your email address</label>
              <InputField
                icon={<IoMdMail/>}
                placeholder="Type your email"
                type="email"
                {...register ("email" , {required:"Email is required"})}
              />
            </div>


          <div>
            <label className="text-sm block mb-1">Role</label>
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <span className="px-3 text-black text-xl">
                <BsPersonBadge />
              </span>
              <select
                 {...register("role", { required: "Role is required" })}
                className="w-full px-3 py-2 bg-[#0c0f1a] border-3 border-white text-white outline-none"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>


        <div>
            <label className="text-sm block mb-1">Password</label>
            <InputField
              icon={<FaLock />}
              type="password"
              placeholder="Enter your password"
               {...register("password", { required: "Password is required" })}
            />
          </div>

   <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black font-semibold py-2 px-6 rounded-md flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                Registering... <ImSpinner2 className="animate-spin size-5" />
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>



    </>
  )
}

export default Register
