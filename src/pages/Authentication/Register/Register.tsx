import InputField from "@/components/InputField";
import { BsFillPersonFill, BsFillPersonPlusFill, BsPersonBadge } from "react-icons/bs"
import { FaLock, FaUser } from "react-icons/fa6";
import { IoMdCodeWorking, IoMdGitNetwork, IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom"


const Register = () => {


  const navigate = useNavigate();


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

      <form className="space-y-4">
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm block mb-1">First Name</label>
                <InputField
                  icon={<FaUser />}
                  placeholder="Enter your first name"
                  // {...register("first_name", { required: true })}
                />
              </div>

              
              <div className="flex-1">
                <label className="text-sm block mb-1">Last Name</label>
                <InputField
                  icon={<FaUser />}
                  placeholder="Enter your last name"
                  // {...register("last_name", { required: true })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm block mb-1">Your email address</label>
              <InputField
                icon={<IoMdMail/>}
                placeholder="Type your email"
                type="email"
              />
            </div>


          <div>
            <label className="text-sm block mb-1">Role</label>
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <span className="px-3 text-black text-xl">
                <BsPersonBadge />
              </span>
              <select
                // {...register("role", { required: true })}
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
              // {...register("password", { required: true })}
            />
          </div>


      </form>



    </>
  )
}

export default Register
