'use client';

import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { deleteTaskFunc, updateTaskFunc } from '@/store/thunks/taskThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { motion } from 'framer-motion'; // ✅ Add this

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

export default function TaskCard({ task, index = 0 }: { task: Task; index?: number }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';

    const handleToggle = () => {
        dispatch(updateTaskFunc(task.id, { completed: !task.completed }));
    };

    const handleDelete = () => {
        dispatch(deleteTaskFunc(task.id));
    };

    return (
        <>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    type: 'spring',
                    stiffness: 60,
                    damping: 15,
                }}
                className={`${isDark ? "bg-zinc-700 text-white border-[#6956E5]" : "bg-white text-black border-[#6956E550]"} p-4 rounded-lg border  space-y-3 h-[9rem] max-[1280px]:h-[8.5rem] flex flex-col justify-between`}
            >
                <div className="flex items-start justify-between gap-10">
                    <h3 className="text-md max-[1280px]:text-sm break-words line-clamp-3">{task.title}</h3>
                    <label className="inline-flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={handleToggle}
                            className={`appearance-none cursor-pointer h-5 w-5 border ${isDark ? "border-[#6956E5] checked:border-[#6956E5]" : "border-[#6956E540] checked:border-[#6956E540]"} rounded-sm 
                                checked:border 
                                checked:bg-transparent checked:bg-none 
                                flex items-center justify-center
                                relative before:content-['✓'] before:absolute before:inset-0 
                                before:flex before:items-center before:justify-center 
                                before:text-[#6956E5] before:text-sm before:opacity-0 
                                checked:before:opacity-100 transition-all duration-200`}
                        />
                        <span className={`text-[0.8rem] ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                            {task.completed ? 'Done' : 'Pending'}
                        </span>
                    </label>
                </div>

                <div className="flex gap-2">
                    <button
                        aria-label="Edit task"
                        onClick={() => setIsModalOpen(true)}
                        className="flex cursor-pointer items-center p-1 hover:bg-yellow-600 text-white  rounded transition"
                    >
                        <MdOutlineModeEdit className="text-yellow-500 hover:text-white text-[1.3rem] max-[1280px]:text-[1.1rem]" />
                    </button>
                    <button
                        aria-label="Delete task"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center cursor-pointer p-1 hover:bg-red-600 text-white  rounded transition"
                    >
                        <MdDeleteOutline className="text-red-500 hover:text-white text-[1.3rem] max-[1280px]:text-[1.1rem]" />
                    </button>
                </div>
            </motion.div>

            <EditTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={task}
            />

            <ConfirmDeleteModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}
