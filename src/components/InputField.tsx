import React from "react";

interface InputFieldProps {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const InputField = ({ icon, placeholder, type = "text", value, onChange, name }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center bg-white rounded-md overflow-hidden">
        <span className="px-3 text-black text-xl">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="w-full px-3 py-2 text-black outline-none"
        />
      </div>
    </div>
  );
};

export default InputField;
