import React, { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ icon, placeholder, type = "text", error, ...rest }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="my-2">
        <div className="relative">
          {/* Icon on the left inside the input */}
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg pointer-events-none">
            {icon}
          </span>

          {/* Input field */}
          <input
            ref={ref}
            type={isPassword ? (show ? "text" : "password") : type}
            placeholder={placeholder}
            {...rest}
            className="w-full pl-10 pr-10 py-2 bg-[#0c0f1a] border border-white text-white rounded-md outline-none"
          />

          {/* Password toggle icon */}
          {isPassword && (
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default InputField;
