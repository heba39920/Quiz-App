import React, { useState } from "react";
import {
  FaPlusCircle,
  FaBell,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = "Dashboard" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`flex items-center justify-between px-6 py-3 shadow-md ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Left - Title */}
        <h1 className="text-lg font-semibold">{title}</h1>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Add Quiz */}
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition">
            <FaPlusCircle className="text-indigo-500" />
            New quiz
          </button>

          {/* Icons */}
          <div className="relative">
            <FaEnvelope className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              10
            </span>
          </div>

          <div className="relative">
            <FaBell className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              10
            </span>
          </div>

          {/* User */}
          <div className="relative">
            <button
              className="flex flex-col text-left cursor-pointer"
              onClick={toggleUserMenu}
            >
              <div className="flex items-center gap-1">
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-sm">
                    Nwabulikwu Chizurooke
                  </span>
                  <span className="text-green-500 text-xs">Tutor</span>
                </div>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-xl border dark:border-gray-700 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                } animate-fadeIn`}
              >
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      

      {/* Mobile Dropdown */}
    {isMenuOpen && (
  <div
    className={`md:hidden fixed top-16 left-0 w-full shadow-lg z-50 border-t animate-slideDown ${
      darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
    }`}
  >
    <div className="flex flex-col gap-4 px-6 py-4">
      {/* Dark Mode */}
      <button
        onClick={toggleDarkMode}
        className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* New Quiz */}
      <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
        <FaPlusCircle className="text-indigo-500" />
        New Quiz
      </button>

      {/* Icons */}
      <div className="flex gap-6">
        <FaEnvelope className="w-6 h-6" />
        <FaBell className="w-6 h-6" />
      </div>

    
{/* User Info */}
<div
  className="flex items-center justify-between border-t pt-4 cursor-pointer"
  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
>
  <div className="flex flex-col">
    <span className="font-medium">Nwabulikwu Chizurooke</span>
    <span className="text-green-500 text-sm">Tutor</span>
  </div>

  {/* Arrow Icon */}
  <svg
    className={`w-4 h-4 transform transition-transform duration-300 ${
      isUserDropdownOpen ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
</div>


{isUserDropdownOpen && (
  <div className="mt-3 flex flex-col gap-2 animate-slideDown">
    <button className="text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
      Profile
    </button>
    <button className="text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
      Settings
    </button>
    <button className="text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
      Logout
    </button>
  </div>
)}

    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
