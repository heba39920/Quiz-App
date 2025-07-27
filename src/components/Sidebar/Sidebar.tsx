import { sideBarLogo } from "@/assets/images";
import {  useState } from "react";
import { Sidebar, Menu, MenuItem, type SidebarProps } from "react-pro-sidebar";
import { LuMenu } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { PiStudent } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { CiViewTimeline } from "react-icons/ci";

import { IoNewspaperOutline } from "react-icons/io5";

import { IoIosHelpCircleOutline } from "react-icons/io";
const SideBar:React.FC<SidebarProps> = ({...props }) => {
  const location = useLocation(); 
  const [collapsed, setIsCollapsed] = useState(false);  

  const handleCollapse = () => {  
    setIsCollapsed(prev => !prev);  
  };  
  const menuItems = [
    {
      label: "Dashboard",
      icon: <IoHomeOutline className="w-[30px] h-[30px]" />,
      path: "dashboard",
    },
    {
      label: "Students",
      icon: <PiStudent className="w-[30px] h-[30px]" />,
      path: "students",
    },
    {
      label: "Groups",
      icon: <GrGroup className="w-[30px] h-[30px]" />,
      path: "groups",
    },
    {
      label: "Quizzes",
      icon: <CiViewTimeline className="w-[30px] h-[30px]" />,
      path: "quizzes",
    },
    {
      label: "Results",
      icon: <IoNewspaperOutline className="w-[30px] h-[30px]" />,
      path: "results",
    },
    {
      label: "Help",
      icon: <IoIosHelpCircleOutline className="w-[30px] h-[30px]" />,
      path: "help",
    },
  ];


  return (
    <Sidebar
      backgroundColor="#fff"
      collapsed={collapsed }
  
      {...props}
      width="200px"
        breakPoint="md" 
    >
      <Menu>
        <MenuItem className="border-b border-[#00000033] py-[28px] ">
          <div className="flex items-start">
            <LuMenu
              className={`size-8 ${collapsed ? "" : "me-8"}`}
                onClick={handleCollapse}
            />{" "}
            <img
              src={sideBarLogo}
              alt="side bar logo"
              onClick={handleCollapse}
            />
          </div>
        </MenuItem>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <MenuItem
              component={<NavLink to={item.path} />}
              key={item.label}
              className={`menu-item border-b border-[#00000033] py-[28px]  size[18px] font-bold ${isActive ? "active-menu-item" : ""}`}
              icon={
                <span
                  className={`rounded-[10px] bg-[#FFEDDF] p-2 me-[10px] ${
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
        })}
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
