import { logoWhite, authImage } from "@/assets/images";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#0c0f1a] text-white flex flex-col lg:grid lg:grid-cols-12 items-center">
      {/* Left Side: Form */}
      <div className="w-full lg:col-span-6 flex flex-col px-6 py-10 lg:px-10">
        {/* Logo */}
        <div className="mb-10">
          <img className="max-w-32 lg:max-w-36" src={logoWhite} alt="logo white" />
        </div>

        {/* Form Content */}
        <div className="mt-10">
          <Outlet />
        </div>
      </div>

      {/* Right Side: Image (hidden below lg) */}
      <div className="hidden lg:flex lg:col-span-6 items-center justify-center p-6 lg:p-10">
        <div className="bg-[#ffeadd] rounded-3xl p-4 w-full max-w-[570px] h-auto">
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
