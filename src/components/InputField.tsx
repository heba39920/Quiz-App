// src/components/InputField.tsx
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
                <div className="flex items-center bg-white rounded-md overflow-hidden relative">
                    <span className="px-3 text-black text-xl">{icon}</span>
                    <input
                        ref={ref}
                        type={isPassword ? (show ? "text" : "password") : type}
                        placeholder={placeholder}
                        {...rest}
                        className="w-full px-3 py-2 bg-[#0c0f1a] border-3 border-white text-white outline-none"
                    />
                    {isPassword && (
                        <span
                            className="absolute right-3 text-black cursor-pointer"
                            onClick={() => setShow((prev) => !prev)}
                        >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
                    )}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        );
    }
);

export default InputField;
