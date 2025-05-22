'use client';

import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import CreateTaskForm from './CreateTaskForm';

export default function AddTaskTrigger() {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm((prev) => !prev);

    return (
        <div>
            {/* Add Task Button */}
            <button
                aria-label="Add task"
                onClick={toggleForm}
                className="flex cursor-pointer items-center space-x-2 bg-[#6956E5] text-white px-4  py-2  rounded hover:bg-[#5a47d6] transition max-[1280px]:text-sm"
            >
                <MdAdd className="text-xl max-[1280px]:text-lg" />
                <span>Add Task</span>
            </button>

            {/* Modal Popup */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex   items-center justify-center bg-black/50">
                    <div className="bg-white  max-sm:w-[90%] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        {/* Close Button */}
                        <button
                            onClick={toggleForm}
                            className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-900 "
                        >
                            <IoClose className="text-2xl" />
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-center text-zinc-800 ">
                            Create New Task
                        </h2>

                        <CreateTaskForm onSuccess={() => setShowForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
