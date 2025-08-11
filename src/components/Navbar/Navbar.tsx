import Cookies from "js-cookie";
import React, { useState } from "react";
import SetUpQ from "@/assets/images/new quiz icon.png";
import { FaBell, FaEnvelope, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "@/utils/hooks/Auth";
import { logout as logoutAction } from "@/redux/slices/authSlice";
interface NavbarProps {
  title?: string;
  handleDarkMode: () => void;
  darkMode: boolean;
  onToggleSidebar?: () => void; // لفتح/إغلاق السايدبار بالموبايل
}

const Navbar: React.FC<NavbarProps> = ({
  title = "Dashboard",
  handleDarkMode,
  darkMode,
  onToggleSidebar,
}) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        Cookies.remove("token", { path: "/" });
        dispatch(logoutAction());
        navigate("/login");
      },
      onError: () => {
        Cookies.remove("token", { path: "/" });
        dispatch(logoutAction());
        navigate("/login");
      },
    });
  };

  return (
    <nav
      className="sticky top-0 z-40 grid [grid-template-columns:auto_1fr_auto] items-center gap-2 px-3 sm:px-6 py-3 bg-white text-gray-800 dark:bg-[#0D1321] dark:text-white shadow-md border-b border-gray-100 dark:border-gray-800"
      role="navigation"
      aria-label="Top Navigation"
    >
      {/* LEFT: Burger (موبايل فقط) */}
      <div className="lg:hidden">
        <button
          type="button"
          className="p-2 rounded-md border border-gray-200 dark:border-gray-700"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <FaBars className="w-4 h-4" />
        </button>
      </div>

      {/* CENTER: العنوان — بالنص على الموبايل، يسار على md+ */}
      <h1 className="justify-self-center md:justify-self-start text-base sm:text-lg font-semibold text-center md:text-left">
        {title}
      </h1>

      {/* RIGHT: موبايل = أيقونات صغيرة | تابلت/ديسكتوب = واجهة كاملة */}
      <div className="flex items-center justify-end gap-2">
        {/* === موبايل فقط (< md) === */}
        <div className="flex md:hidden items-center gap-2">
          {/* New (أيقونة فقط) */}
          <button
            className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="New quiz"
            aria-label="New quiz"
          >
            <img src={SetUpQ} alt="" className="w-4 h-4" />
          </button>

          {/* Theme */}
          <button
            onClick={handleDarkMode}
            className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
            title="Toggle theme"
          >
            {darkMode ? (
              <FaSun className="w-4 h-4" />
            ) : (
              <FaMoon className="w-4 h-4" />
            )}
          </button>

          {/* User (أيقونة بحرف أول + منيو صغيرة) */}
          <div className="relative">
            <button
              className="p-2 rounded-md border border-gray-200 dark:border-gray-700"
              onClick={() => setIsUserDropdownOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={isUserDropdownOpen}
              title="User menu"
            >
              <span className="block w-4 h-4 text-xs font-semibold text-center leading-4">
                {(auth?.user?.first_name?.[0] ?? "G").toUpperCase()}
              </span>
            </button>

            {isUserDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-40 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0D1321] text-gray-800 dark:text-white z-50"
                role="menu"
              >
                <ul className="py-2 text-sm">
                  <li className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* === تابلت + ديسكتوب (≥ md) === */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme */}
          <button
            onClick={handleDarkMode}
            className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle dark mode"
            title="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* New Quiz — زر مرتب */}
          <button
            className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            title="Create new quiz"
          >
            <img src={SetUpQ} alt="" className="w-5 h-5 dark:bg-[#fff]" />
            <span className="text-sm font-medium">New quiz</span>
          </button>

          {/* Email */}
          <div className="relative px-2">
            <FaEnvelope className="w-5 h-5" />
            <span
              className="absolute -top-2 -right-1 bg-[#f7d6bd] text-white dark:text-[#0D1321]
             text-[10px] font-bold rounded-full px-1"
            >
              10
            </span>
          </div>

          {/* Bell */}
          <div className="relative px-2">
            <FaBell className="w-5 h-5" />
            <span className="absolute -top-2 -right-1 bg-[#f7d6bd]  text-white dark:text-[#0D1321] text-[10px] font-bold rounded-full px-1">
              10
            </span>
          </div>

          {/* User (Dropdown) */}
          <div className="relative">
            <button
              className="flex items-center gap-2 h-9 px-3 rounded-md border border-gray-200 dark:border-gray-700"
              onClick={() => setIsUserDropdownOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={isUserDropdownOpen}
            >
              <div className="flex flex-col leading-tight text-left">
                <span className="font-medium text-sm">
                  {auth?.user?.first_name ?? "Guest"}{" "}
                  {auth?.user?.last_name ?? ""}
                </span>
                <span className="text-green-500 text-xs">
                  {auth?.user?.role ?? ""}
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
            </button>

            {isUserDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0D1321] text-gray-800 dark:text-white z-50"
                role="menu"
              >
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
