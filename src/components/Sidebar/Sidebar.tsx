import { lightLogo, sideBarLogo } from "@/assets/images";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { LuMenu } from "react-icons/lu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaHome,
  FaRegListAlt,
  FaUserGraduate,
  FaUsers,
  FaLock,
} from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

interface SidebarProps {
  darkMode: boolean;
  toggled: boolean;                 // Drawer للموبايل
  setToggled: (v: boolean) => void; // تحكم فتح/اغلاق الدروار
}

const SideBar: React.FC<SidebarProps> = ({ darkMode, toggled, setToggled }) => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false); // للدسكتوب/تابلت

  const handleMenuButton = () => {
    if (window.innerWidth < 768) {
      setToggled(!toggled);      // موبايل => Drawer
    } else {
      setCollapsed((p) => !p);   // تابلت/ديسكتوب => Collapse
    }
  };

  const handleBackdrop = () => setToggled(false);

  const menuItems = [
    { label: "Dashboard", icon: <FaHome className="w-6 h-6" />, path: "/dashboard" },
    { label: "Students",  icon: <FaUserGraduate className="w-6 h-6" />, path: "/dashboard/students" },
    { label: "Groups",    icon: <FaUsers className="w-6 h-6" />, path: "/dashboard/groups" },
    { label: "Questions", icon: <FaRegListAlt className="w-6 h-6" />, path: "/dashboard/questions" },
    { label: "Quizzes",   icon: <HiOutlineClipboardDocumentList className="w-6 h-6" />, path: "/dashboard/quizzes" },
    { label: "Results",   icon: <FaChartBar className="w-6 h-6" />, path: "/dashboard/results" },
    { label: "Change Password", icon: <FaLock className="w-[30px] h-[30px]" />, path: "/change-password" },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Sidebar
      backgroundColor={darkMode ? "#0D1321" : "#fff"}
      className="h-full"
      width="240px"
      collapsedWidth="72px"
      collapsed={collapsed}        // تابلت/ديسكتوب
      breakPoint="md"              // < md = Drawer فقط (موبايل)
      toggled={toggled}            // فتح/إغلاق الدروار
      onBackdropClick={handleBackdrop}
    >
      <Menu className={darkMode ? "dark bg-[#0D1321] text-white" : "bg-white text-gray-800"}>
        {/* Header / Toggle */}
        <MenuItem className="main-border py-5 hover:bg-[#FFEDDF] hover:text-[#0D1321] transition-colors">
          <div className="flex items-center">
            <LuMenu
              className={`size-7 ${collapsed ? "" : "me-4"}`}
              onClick={handleMenuButton}
              aria-label="Toggle sidebar"
              role="button"
            />
            {darkMode ? (
              <img
                src={lightLogo}
                alt="logo"
                className={`h-6 cursor-pointer ${collapsed ? "hidden" : "block"}`}
                onClick={handleMenuButton}
              />
            ) : (
              <img
                src={sideBarLogo}
                alt="logo"
                className={`${collapsed ? "hidden" : "block"}`}
                onClick={handleMenuButton}
              />
            )}
          </div>
        </MenuItem>

        {/* Links */}
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");
          return (
            <MenuItem
              key={item.label}
              component={<NavLink to={item.path} />}
              className={`main-border py-5 text-[16px] font-semibold hover:bg-[#FFEDDF] hover:text-[#0D1321] transition-colors ${
                isActive ? "bg-[#FFEDDF]/60 text-[#0D1321]" : ""
              }`}
              icon={
                <span className="rounded-[10px] bg-[#FFEDDF] text-[#0D1321] p-2 me-2">
                  {item.icon}
                </span>
              }
              onClick={() => {
                if (window.innerWidth < 768) setToggled(false); // اغلاق Drawer بعد التنقل
              }}
            >
              {item.label}
            </MenuItem>
          );
        })}

        {/* Logout */}
        <MenuItem
          key="logout"
          onClick={handleLogout}
          className="border-t py-5 text-[16px] font-semibold hover:bg-[#FFEDDF] hover:text-[#0D1321] transition-colors"
          icon={
            <span className="rounded-[10px] bg-[#FFEDDF] text-[#0D1321] p-2 me-2">
              <IoIosLogOut className="w-[30px] h-[30px]" />
            </span>
          }
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
