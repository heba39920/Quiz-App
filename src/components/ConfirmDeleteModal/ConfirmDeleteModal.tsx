import React, { useEffect, useRef } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import deleteImage from "@/assets/images/Delete.png";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title = "Delete Group",
  
  message = `Are you sure you want to delete this Group?`,
  onCancel,
  onConfirm,
  isLoading = false,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      cancelRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl main-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#00000033] shadow-sm">
          <h2 className="px-6 py-2 text-lg font-semibold text-gray-800">
            {title}
          </h2>
          <div className="flex divide-x border-s border-[#00000033]">
            <button
              onClick={onConfirm}
              aria-label="Confirm delete"
              disabled={isLoading}
              className="w-12 h-12 flex items-center justify-center main-text hover:bg-[#FFEDDF] transition"
            >
              <FiCheck size={20} />
            </button>
            <button
              onClick={onCancel}
              aria-label="Cancel delete"
              ref={cancelRef}
              className="w-12 h-12 flex items-center justify-center main-text hover:bg-[#FFEDDF] transition"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-[16px] text-gray-700 leading-relaxed text-center">
          <img
            src={deleteImage}
            alt="Delete Illustration"
            className="mx-auto mb-4 w-50 h-50 object-contain"
          />
          {message}
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
