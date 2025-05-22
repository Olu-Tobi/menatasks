'use client';

import Image from "next/image";
import {
    MdLogout,
    MdOutlineCall,
    MdOutlineDashboard,
    MdOutlineGroup,
    MdOutlineKeyboardCommandKey,
    MdOutlineSettings,
    MdOutlineClose
} from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === "dark";

    return (
        <div
            className={`
        fixed top-0 left-0 h-full z-40 w-64 max-[1280px]:w-56 p-6 shadow-lg 
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${isDark ? 'bg-[var(--bg-color-sidebar-dark)]' : 'bg-[var(--bg-color-sidebar-light)]'} 
        md:relative md:translate-x-0
      `}
        >
            {/* Close Icon (Mobile only) */}
            <button
                className="absolute top-4 right-4 text-2xl md:hidden text-gray-500"
                onClick={onClose}
            >
                <MdOutlineClose />
            </button>

            <div className="flex flex-col justify-between h-full">
                <div>
                    <Image
                        src="/logo.svg"
                        width={140}
                        height={140}
                        alt="Logo"
                        className="object-contain max-[1280px]:w-[8rem]"
                        priority
                    />

                    <div className="mt-10">
                        <div className="flex flex-col gap-[1.5rem] text-[1rem] max-[1280px]:text-[0.8rem]">
                            <div className="nav-item font-medium nav-item-active">
                                <MdOutlineDashboard className="text-[1.2rem]" /> <p>Dashboard</p>
                            </div>
                            <div className="nav-item">
                                <MdOutlineKeyboardCommandKey className="text-[1.2rem]" /> <p>Teams</p>
                            </div>
                            <div className="nav-item">
                                <MdOutlineGroup className="text-[1.2rem]" />
                                <p>Employees</p>
                            </div>
                            <div className="nav-item">
                                <FiBriefcase className="text-[1.2rem]" /> <p>Projects</p>
                            </div>
                        </div>

                        <hr className="border-t border-[#C4C4C4] my-10" />

                        <div className="flex flex-col gap-[1.5rem] text-[1rem] max-[1280px]:text-[0.8rem]">
                            <div className="nav-item">
                                <MdOutlineCall className="text-[1.2rem]" /> <p>Meetings</p>
                            </div>
                            <div className="nav-item">
                                <MdOutlineSettings className="text-[1.2rem]" />
                                <p>Settings</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-item max-[1280px]:text-[0.8rem]">
                    <MdLogout className="text-[1.2rem]" />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
