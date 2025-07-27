
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
 
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Layout */}
      <main className="flex flex-1" role="main">
        {/* Sidebar for small screens, controlled by toggled state */}
        <aside role="complementary" aria-label="Sidebar Navigation">
          <SideBar/>
        </aside>

        {/* Main Content Area */}
        <section className="w-full" aria-label="Page Content">
          {/* Navbar Section */}
          <header className="w-full h-[80px] border border-b-[1px] border-b-[rgba(0,0,0,0.2)]" role="banner">
            <Navbar />
          </header>

          {/* Content */}
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MasterLayout;