import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SideBar from "../Sidebar/Sidebar";

const MasterLayout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = Cookies.get("darkMode");
    return savedDarkMode === "true";
  });

  const [sidebarToggled, setSidebarToggled] = useState(false); // Drawer للموبايل
  const toggleDarkMode = () => setDarkMode((p) => !p);
  const toggleSidebarMobile = () => setSidebarToggled((p) => !p);

  useEffect(() => {
    Cookies.set("darkMode", darkMode ? "true" : "false", {
      expires: 365,
    });
  }, [darkMode]);
  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "dark bg-[#0D1321] text-[#fff]" : ""
      }`}
    >
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside
          aria-label="Sidebar Navigation "
          className={`sticky top-0 left-0 lg:z-50 ${
            sidebarToggled ? "z-500" : "z-40"
          } h-screen `}
        >
          <SideBar
            darkMode={darkMode}
            toggled={sidebarToggled}
            setToggled={setSidebarToggled}
          />
        </aside>

        {/* Content */}
        <section className={`w-full transition-all duration-300 ease-in-out`}>
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
