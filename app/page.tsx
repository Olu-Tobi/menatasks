'use client';

import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import { CgMenuLeft } from "react-icons/cg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === "dark";

  return (
    <main className={`h-screen flex ${isDark ? ' bg-[var(--bg-color-body-dark)]' : 'bg-[var(--bg-color-body-light)]'} relative`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />


      {/* Main Body */}
      <div className="flex-1 overflow-y-auto w-full relative">
        {/* Menu Icon for Mobile */}
        {!isSidebarOpen && <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 z-50 text-3xl text-[#6956E5] md:hidden"
        >
          <CgMenuLeft />
        </button>}

        <Dashboard />
      </div>
    </main>
  );
}



