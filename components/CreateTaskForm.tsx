'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '@/store/thunks/taskThunks';

export default function CreateTaskForm({ onSuccess }: { onSuccess?: () => void }) {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        await dispatch<any>(createTask({ title }));
        setTitle('');
        onSuccess?.(); // Close modal if provided
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-2">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task"
                className="flex-1 px-3 py-2 border border-[#6956E540] bg-[#6956E510] 
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-[#6956E5] focus:bg-white transition duration-200 
                           text-sm rounded"
            />
            <button
                type="submit"
                className="bg-[#6956E5] text-white px-4 py-2 rounded hover:bg-[#5a47d6] transition"
            >
                Add
            </button>
        </form>
    );
}
