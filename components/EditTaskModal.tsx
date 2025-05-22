'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskFunc } from '@/store/thunks/taskThunks';
import type { AppDispatch } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: { id: number; title: string } | null;
};

export default function EditTaskModal({ isOpen, onClose, task }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState(task?.title || '');

  if (!isOpen || !task) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    dispatch(updateTaskFunc(task.id, { title }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md max-sm:w-[90%] space-y-4">
        <h2 className="text-lg font-semibold text-zinc-800">Edit Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full border border-[#6956E540] bg-[#6956E510] placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-[#6956E5] focus:bg-white 
                    transition duration-200 text-sm px-3 py-2 rounded-md"
        />
        <div className="flex justify-end gap-2">
          <button
            aria-label="Cancel"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            aria-label="Save"
            onClick={handleSubmit}
            className="bg-[#6956E5] text-white px-4 py-2 text-sm rounded hover:bg-[#5946d9] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
