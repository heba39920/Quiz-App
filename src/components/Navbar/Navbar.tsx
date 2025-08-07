import React, { useState } from "react";
import SetUpQ from "@/assets/images/new quiz icon.png";
import {
  FaPlusCircle,
  FaBell,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useSelector } from "react-redux";

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
  const auth = useSelector((state: any) => state.auth);

  console.log(auth);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`flex items-center justify-between px-6 py-4 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Left - Title */}
        <h1 className="text-lg font-semibold">{title}</h1>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center text-base">
          {/* Dark Mode */}
          <div className="pr-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition main-border"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {/* Add Quiz */}
          <div className="border-l border-gray-300 dark:border-gray-600 px-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition main-border">
              <img src={SetUpQ} alt="" className="w-6 h-6" />
              New quiz
            </button>
          </div>

          {/* Email */}
          <div className="border-l border-gray-300 dark:border-gray-600 px-4 relative">
            <FaEnvelope className="w-6 h-6" />
            <span className="absolute -top-2 right-1 bg-[#f7d6bd] text-white text-xs font-bold rounded-full px-1">
              10
            </span>
          </div>

          {/* Bell */}
          <div className="border-l border-gray-300 dark:border-gray-600 px-4 relative">
            <FaBell className="w-6 h-6" />
            <span className="absolute -top-2 right-1 bg-[#f7d6bd] text-white text-xs font-bold rounded-full px-1">
              10
            </span>
          </div>

          {/* User */}
          <div className="border-l border-gray-300 dark:border-gray-600 pl-4 relative">
            <button
              className="flex flex-col text-left cursor-pointer"
              onClick={toggleUserMenu}
            >
              <div className="flex items-center gap-1">
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-sm">
                    {auth.user.first_name} {auth.user.last_name}
                  </span>
                  <span className="text-green-500 text-xs">
                    {auth.user.role}
                  </span>
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
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-xl border border-gray-200 bg-white text-gray-800 animate-fadeIn z-50">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A9 9 0 1119.88 6.122M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7"
                      />
                    </svg>
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
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
              <FaPlusCircle className="text-indigo-500" />
              New Quiz
            </button>

            <div className="flex gap-6">
              <FaEnvelope className="w-6 h-6" />
              <FaBell className="w-6 h-6" />
            </div>

            <div
              className="flex items-center justify-between border-t pt-4 cursor-pointer"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <div className="flex flex-col">
                <span className="font-medium">{auth.user.email}</span>
                <span className="text-green-500 text-sm">{auth.user.role}</span>
              </div>

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
                  Change Password
                </button>
                <button className="text-left px-4 py-2 rounded text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800">
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
