// src/components/ReusableModal.tsx
import {type ReactNode } from "react";

import { FiCheck, FiX } from "react-icons/fi";

interface ReusableModalProps { 
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const ReusableModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  className,
}: ReusableModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div
        className={`
          bg-white rounded-lg shadow-xl 
          dark:text-[#fff]  dark:bg-[#0D1321] dark:border dark:border-[#fff]
          ${className}
        `}
      >
     {/* Header */}
          <div className="flex items-center justify-between border-b border-[#00000033] dark:border-[#fff] shadow-sm ">
            <h2 className="px-6 py-2 text-lg font-semibold text-gray-800 dark:text-[#fff] ">
              {title}
            </h2>
            <div className="flex divide-x border-s border-[#00000033]">
              <button
              type="submit"
                onClick={onConfirm}
                aria-label="Confirm"
                // disabled={isLoading}
                className="w-12 h-12 flex items-center justify-center main-text hover:bg-[#FFEDDF] transition"
              >
                <FiCheck size={20} />
              </button>
              <button
                onClick={onClose}
                aria-label="Cancel"
              
                className="w-12 h-12 flex items-center justify-center main-text hover:bg-[#FFEDDF] transition"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default ReusableModal;
