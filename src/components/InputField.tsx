// src/components/InputField.tsx

import React, { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ icon, placeholder, type = "text", ...rest }, ref) => {
    return (
      <div className="my-2">
        <div className="flex items-center bg-white rounded-md overflow-hidden">
          <span className="px-3 text-black text-xl">{icon}</span>
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...rest}
            className="w-full px-3 py-2 bg-[#0c0f1a] border-3 border-white text-white outline-none"
          />
        </div>
      </div>
    );
  }
);

export default InputField;
