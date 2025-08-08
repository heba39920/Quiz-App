import { lightLogo, sideBarLogo } from "@/assets/images";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { LuMenu } from "react-icons/lu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaChartBar, FaHome, FaRegListAlt, FaUserGraduate, FaUsers, FaLock } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

interface SidebarProps {
  darkMode: boolean;
  toggled: boolean;                 // للتحكم بالـdrawer على الموبايل
  setToggled: (v: boolean) => void; // يجي من الـMasterLayout
}

const SideBar: React.FC<SidebarProps> = ({ darkMode, toggled, setToggled }) => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // collapse للدسكتوب فقط
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      // < lg => افتح/اقفل drawer
      setToggled(!toggled);
    } else {
      // ≥ lg => collapse/expand
      setCollapsed((p) => !p);
    }
  };

  const handleBackdrop = () => setToggled(false);

  const menuItems = [
    { label: "Dashboard", icon: <FaHome className="w-6 h-6" />, path: "/dashboard" },
    { label: "Students", icon: <FaUserGraduate className="w-6 h-6" />, path: "/dashboard/students" },
    { label: "Groups", icon: <FaUsers className="w-6 h-6" />, path: "/dashboard/groups" },
    { label: "Questions", icon: <FaRegListAlt className="w-6 h-6" />, path: "/dashboard/questions" },
    { label: "Quizzes", icon: <HiOutlineClipboardDocumentList className="w-6 h-6" />, path: "/dashboard/quizzes" },
    { label: "Results", icon: <FaChartBar className="w-6 h-6" />, path: "/dashboard/results" },
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
      width="240px"              // عرض الدسكتوب
      collapsedWidth="72px"      // عرض الحالة المصغّرة
      collapsed={collapsed}
      breakPoint="lg"            // < lg يتحول لدروار
      toggled={toggled}          // تحكم فتح/إغلاق الموبايل
      onBackdropClick={handleBackdrop}
    >
      <Menu className={`${darkMode ? "dark bg-[#0D1321] text-white" : "bg-white text-gray-800"}`}>
        {/* Header / Toggle */}
        <MenuItem className="main-border py-5 hover:bg-[#FFEDDF] hover:text-[#0D1321] transition-colors">
          <div className="flex items-center">
            <LuMenu className={`size-7 ${collapsed ? "" : "me-4"}`} onClick={handleMenuClick} />
            {darkMode ? (
              <img
                src={lightLogo}
                alt="logo"
                className={`h-6 cursor-pointer ${collapsed ? "hidden" : "block"}`}
                onClick={handleMenuClick}
              />
            ) : (
              <img
                src={sideBarLogo}
                alt="logo"
                className={`${collapsed ? "hidden" : "block"}`}
                onClick={handleMenuClick}
              />
            )}
          </div>
        </MenuItem>

        {/* Links */}
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
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
