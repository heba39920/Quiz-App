import Navbar from "../Navbar/Navbar";

import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import { useState } from "react";

const MasterLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
   const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={`flex flex-col min-h-screen dark:bg-[#0D1321] dark:text-white ${darkMode? "dark" : ''}`}>
      {/* Main Layout */}
      <main className="flex flex-1" role="main">
        {/* Sidebar for small screens, controlled by toggled state */}
        <aside role="complementary" aria-label="Sidebar Navigation">
          <SideBar darkMode= {darkMode}/>
        </aside>

        {/* Main Content Area */}
        <section className="w-full" aria-label="Page Content">
          {/* Navbar Section */}
          <header className="w-full h-[80px] main-border" role="banner">
            <Navbar handleDarkMode={toggleDarkMode} darkMode={darkMode}/>
          </header>

          {/* Content */}
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MasterLayout;
