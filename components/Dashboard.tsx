import Image from "next/image";
import { BsBell } from "react-icons/bs";
import { useMemo, useCallback } from "react";
import SearchBar from "./SearchBar";
import FilterControls from "./FilterControls";
import ThemeToggle from "./ToggleMode";
import TaskList from "./TaskList";
import AddTaskTrigger from "./AddTaskTrigger";
import TaskStatusChart from "./TaskStatusChart";

import TaskListSkeleton from "./skeletons/TaskListSkeleton";
import ChartSkeleton from "./skeletons/ChartSkeleton";
import { useTasks } from "@/services/useTasks";
import ToolbarSkeleton from "./skeletons/ToolBarSkeleton";
import TaskLoadError from "./TaskLoadError";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Dashboard = () => {
    const { tasks, isError, isLoading, mutate } = useTasks();
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';

    // Memoize done and pending counts to avoid recalculations on each render
    const done = useMemo(() => tasks.filter((t: any) => t.completed).length, [tasks]);
    const pending = useMemo(() => tasks.filter((t: any) => !t.completed).length, [tasks]);

    // Memoize retry handler to avoid unnecessary re-renders of TaskLoadError
    const handleRetry = useCallback(() => {
        mutate();
    }, [mutate]);

    if (isError) {
        return (
            <div className={`flex-1 p-6 md:p-8 ${isDark ? ' bg-[var(--bg-color-body-dark)]' : 'bg-[var(--bg-color-body-light)]'} overflow-auto flex items-center justify-center h-screen`}>
                <TaskLoadError onRetry={handleRetry} />
            </div>
        );
    }

    return (
        <div className={`flex-1 ${isDark ? ' bg-[var(--bg-color-body-dark)]' : 'bg-[var(--bg-color-body-light)]'} p-6 md:p-8 overflow-auto`}>
            <header className="flex flex-row max-md:mt-8 max-sm:-mt-2 max-sm:flex-col-reverse max-sm:items-start items-center justify-between gap-4">
                <div>
                    <h2 className={`text-xl max-[1280px]:text-lg font-semibold ${isDark ? "text-zinc-100" : "text-zinc-800"}  `}>Dashboard</h2>
                    <p className={`text-sm max-[1280px]:text-[0.8rem] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                        Hi, welcome to your task management dashboard
                    </p>
                </div>
                <div className="flex items-center gap-6 max-sm:w-full max-sm:justify-end">
                    <ThemeToggle />
                    <BsBell className={`text-xl max-[1280px]:text-lg ${isDark ? "text-zinc-100" : "text-zinc-600"} cursor-pointer`} />
                    <Image
                        src="/user.svg"
                        width={40}
                        height={40}
                        alt="User Avatar"
                        className="rounded-full border border-zinc-300 dark:border-zinc-700 max-[1280px]:w-[2.5rem]"
                        priority
                    />
                </div>
            </header>

            <div className="mt-8">
                {isLoading ? (
                    <ChartSkeleton />
                ) : (
                    <TaskStatusChart data={{ done, pending }} />
                )}
            </div>

            <div className="mt-8">
                {isLoading ? (
                    <ToolbarSkeleton />
                ) : (
                    <div className="flex items-center w-full justify-between">
                        <SearchBar />
                        <AddTaskTrigger />
                        <FilterControls />
                    </div>
                )}
            </div>

            <div className="mt-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TaskListSkeleton />
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-400 dark:border-zinc-600 rounded-md text-zinc-600 dark:text-zinc-400">
                        <p className="mb-6 text-lg">Add new task</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TaskList />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
