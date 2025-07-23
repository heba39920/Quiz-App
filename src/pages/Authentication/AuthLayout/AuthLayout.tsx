import { logoWhite, authImage } from "@/assets/images";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-12 bg-[#0c0f1a] text-white">
      {/* Left: Logo and Form */}
      <div className="col-span-6 flex flex-col px-16 py-10">
        {/* Logo */}
        <div>
          <img className="w-36" src={logoWhite} alt="logo white" />
        </div>

        {/* Form */}
        <div className="mt-30">
          <Outlet />
        </div>
      </div>

      {/* Right: Image */}
      <div className="col-span-6 flex items-center justify-center p-10">
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
