import { lightLogo, sideBarLogo } from "@/assets/images";
import {  useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { LuMenu } from "react-icons/lu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaChartBar, FaHome, FaRegListAlt, FaUserGraduate, FaUsers } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
interface SidebarProps {
  darkMode: boolean;
}
const SideBar:React.FC<SidebarProps> = ({darkMode}) => {
  const user = useSelector((state: any) => state.auth.user);
  console.log("user from sidebar", user);
  
  const dispatch = useDispatch();
  const location = useLocation(); 
  const [collapsed, setIsCollapsed] = useState(false);  
  const navigate = useNavigate();
  const handleCollapse = () => {  
    setIsCollapsed(prev => !prev);  
  };  
  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaHome className="w-6 h-6" />,
      path: "dashboard",
    },
    {
      label: "Students",
      icon: <FaUserGraduate className="w-6 h-6" />,
      path: "students",
    },
    {
      label: "Groups",
      icon: <FaUsers className="w-6 h-6" />,
      path: "groups",
    },
       {
      label: "Questions",
      icon:<FaRegListAlt className="w-6 h-6" />,
      path: "questions",
    },
    {
      label: "Quizzes",
     icon: <HiOutlineClipboardDocumentList className="w-6 h-6" />,
      path: "quizzes",
    },
    {
      label: "Results",
      icon: <FaChartBar className="w-6 h-6" />,
      path: "results",
    },
    {
      label: "Change Password",
      icon:<FaLock className="w-[30px] h-[30px]" />,
      path: "/change-password",
    }
  ];
   const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
      dispatch(logout());
  };

  return (
    <Sidebar
      backgroundColor="#fff"
      collapsed={collapsed }
      width="200px"
      breakPoint="md" 
      className=" h-full"
    >
        
      <Menu  className="dark:bg-[#0D1321] dark:text-white text-gray-800 bg-white ">
        <MenuItem className="border-b border-[#00000033] py-[28px] hover:bg-[#FFEDDF] hover:dark:border-0 hover:text-[#0D1321] transition-colors cursor-pointer hover:border-e-5 hover:border-[#0D1321]">
          <div className="flex items-center">
            <LuMenu
              className={`size-8 ${collapsed ? "" : "me-12"}`}
                onClick={handleCollapse}
            />{" "}
            {darkMode ? (     <img
              src={lightLogo}
              alt="side bar logo"
              onClick={handleCollapse}
              className={`w-[6rem] h-[1.5rem]  cursor-pointer object-fit dark:bg-[#0D1321]  ${collapsed ? "hidden" : "" }`}
            />):(  <img
              src={sideBarLogo}
              alt="side bar logo"
              onClick={handleCollapse}
              className={collapsed ? "hidden" : ""}
            />)}
          
          </div>
        </MenuItem>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <MenuItem
              component={<NavLink to={item.path} />}
              key={item.label}
              className={`menu-item  border-b-[#00000033] py-[28px] hover:bg-[#FFEDDF]  hover:text-[#0D1321] hover:border-e-5 hover:border-[#0D1321]  transition-colors  cursor-pointer hover:dark:border-0 text-[18px] font-bold ${isActive ? "active-menu-item" : ""}`}
              icon={
                <span
                  className={`rounded-[10px] bg-[#FFEDDF]  dark:text-[#0D1321]  p-2 me-[10px] ${
                    isActive ? "icon-active" : ""
                  }`}
                >
                  {item.icon}
                </span>
              }
            >
              {item.label}
            </MenuItem>
         
          );
        })}   <MenuItem
              key="logout"
              className="menu-item border-b-[#00000033] py-[28px] hover:bg-[#FFEDDF] hover:text-[#0D1321] hover:border-e-5 hover:border-[#0D1321] transition-colors cursor-pointer hover:dark:border-0 text-[18px] font-bold"
              icon={<span className={`rounded-[10px] bg-[#FFEDDF]  dark:text-[#0D1321]  p-2 me-[10px] 
                  }`}><IoIosLogOut  className="w-[30px] h-[30px]" /></span>}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
