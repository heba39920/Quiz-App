// src/components/ReusableModal.tsx
import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  title: string;
  children: ReactNode;
  className?: string;
}

const ReusableModal = ({
  isOpen,
  onClose,
  onConfirm,
  confirmDisabled = false,
  title,
  children,
  className,
}: ReusableModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        className={clsx(
          "bg-white rounded-lg shadow-xl w-full max-w-lg",
          className
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onConfirm}
              disabled={confirmDisabled}
              title="Confirm"
            >
              <FaCheck className="text-lg text-black" />
            </button>
            <button onClick={onClose} title="Close">
              <IoClose className="text-xl text-black" />
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
