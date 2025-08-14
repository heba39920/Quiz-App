import { useEffect, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs"
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiTrash } from "react-icons/fi";

interface DropdownMenuProps {

  onView?: () => void;
  onDelete?: () => void;
  onRemove?: () => void;
  hasGroup ? : boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({  onView, onDelete, onRemove, hasGroup }) => {
  const [isOpen, setIsOpen] = useState(false);          // Manage open/close here
  const menuRef = useRef<HTMLDivElement>(null);

  // Handles outside click
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="flex items-center justify-center">
      <div  ref={menuRef} className="relative">
        <button onClick={handleToggle}  className="me-3 bg-[#0D1321] dark:bg-white dark:text-[#0D1321] text-white rounded-full p-1.5">
       
            <BsArrowRight size={20} />
        
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={wrapperVariants}
              style={{ originY: "top", translateX: "-50%" }}
              className="flex flex-col dark:bg-[#0D1321] dark:text-[#fff] dark:border dark:border-[#fff]  gap-2 p-2 rounded-lg bg-white shadow-xl z-50 absolute top-[120%] left-[50%] w-48 overflow-hidden"
            >
              <Option
                setOpen={() => setIsOpen(false)}
                Icon={FiEye}
                onClick={() => {
                  if (onView) onView();
                }}
                text="View"
                className="text-slate-700"
              />
              <Option
                setOpen={() => setIsOpen(false)}
                Icon={FiTrash}
                onClick={() => {
                  if (onDelete) onDelete();
                }}
                text="Delete Student"
                className="text-red-700 dark:text-red-500"
              />
               {hasGroup && (
        <Option
                setOpen={() => setIsOpen(false)}
                Icon={FiTrash}
                onClick={() => {
                  if (onRemove) onRemove();
                }}
                text="Remove From Group"
                 className="text-red-700 dark:text-red-500"
              />
    )}
            
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DropdownMenu;

// Animations
const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

// Option component
interface OptionProps {
  text: string;
  Icon: React.ComponentType;
  setOpen: () => void;
  onClick?: () => void;
  className?: string;
}

const Option: React.FC<OptionProps> = ({ text, Icon, setOpen, onClick, className }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen();
        if (onClick) onClick();
      }}
      className={`flex dark:text-[#fff] items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[#FFEDDF]  hover:text-[#0D1321] transition-colors cursor-pointer ${className}`}
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};


const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};