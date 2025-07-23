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
    <div className="my-4">
      <div className="flex items-center bg-white rounded-md overflow-hidden">
        <span className="px-3 text-black text-xl">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="w-full px-3 py-2 bg-[#0c0f1a] border-3 border-white text-white outline-none"
        />
      </div>
    </div>
  );
};

export default InputField;
