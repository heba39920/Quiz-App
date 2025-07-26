import { logoWhite, authImage } from "@/assets/images";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#0c0f1a] text-white grid grid-cols-12 items-center">
      {/* Left Side: Form - 8 columns */}
      <div className="col-span-7 flex flex-col  px-10 py-10">
        <div className="mb-10">
          <img className="max-w-36" src={logoWhite} alt="logo white" />
        </div>
        {/* Form */}
        <div className="mt-30">
          <Outlet />
        </div>
      </div>
      {/* Right: Image */}
      <div className="col-span-5 flex items-center justify-center p-10">
        <div className="bg-[#ffeadd] rounded-3xl p-6 w-[90%] max-w-[570px] h-auto">
          <img
            src={authImage}
            alt="Learning Illustration"
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
