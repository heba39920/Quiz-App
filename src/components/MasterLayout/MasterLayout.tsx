import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../SideBar/Sidebar";

const MasterLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarToggled, setSidebarToggled] = useState(false); // Drawer للموبايل

  const toggleDarkMode = () => setDarkMode((p) => !p);
  const toggleSidebarMobile = () => setSidebarToggled((p) => !p);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? "dark bg-[#0D1321] text-white" : ""}`}>
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside aria-label="Sidebar Navigation">
          <SideBar darkMode={darkMode} toggled={sidebarToggled} setToggled={setSidebarToggled} />
        </aside>

        {/* Content */}
        <section className="w-full">
          <header className="w-full h-[80px]">
            <Navbar
              handleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              onToggleSidebar={toggleSidebarMobile}
            />
          </header>

          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MasterLayout;
