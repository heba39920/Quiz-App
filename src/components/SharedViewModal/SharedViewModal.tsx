import React, { useEffect, useRef } from "react";

interface SharedViewModalProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const SharedViewModal: React.FC<SharedViewModalProps> = ({
  isOpen,
  title = "View Details",
  children,
  onClose,
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
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
          <div className="border-s border-[#00000033]">
            <button
              onClick={onClose}
              aria-label="Close details modal"
              ref={closeRef}
              className="w-12 h-12 flex items-center justify-center main-text hover:bg-gray-[#FFEDDF] transition"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-6 text-[16px] text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SharedViewModal;
