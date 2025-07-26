import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <header className="w-full h-[80px] border border-b-[1px] border-b-[rgba(0,0,0,0.2)]" role="banner">
        <Navbar />
      </header>

      {/* Main Layout */}
      <main className="flex flex-1" role="main">
        {/* Sidebar - hidden on small screens */}
        <aside
         className="hidden md:block w-[200px] border-r border-r-[rgba(0,0,0,0.2)] bg-white"

          role="complementary"
          aria-label="Sidebar Navigation"
        >
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <section className="w-full p-4" aria-label="Page Content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MasterLayout;
