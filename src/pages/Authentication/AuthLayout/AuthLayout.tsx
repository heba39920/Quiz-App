

import { logoWhite, authImage } from "@/assets/images";
import { Outlet } from "react-router-dom";



const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#0c0f1a] text-white grid grid-cols-12 items-center">
      {/* Left Side: Form - 8 columns */}
      <div className="col-span-7 flex flex-col  px-20 py-10">
        <div className="mb-10">
          <img className="max-w-36" src={logoWhite} alt="logo white" />
        </div>

       <Outlet /> 
      </div>

      {/* Right Side: Image - 4 columns */}
      <div className="rounded-[20px] col-span-5  flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <img src={authImage} alt="Learning Illustration" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
