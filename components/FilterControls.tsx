'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setFilter } from '@/store/slices/uiSlice';
import { MdFilterList } from 'react-icons/md';

const filters = ['all', 'completed', 'pending'] as const;

export default function FilterControls() {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state: RootState) => state.ui.filter);
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => setShowFilters((prev) => !prev);

    return (
        <div className="relative inline-block text-left text-black">
            {/* Toggle Button */}
            <div
                onClick={toggleFilters}
                className={`flex items-center  ${isDark ? "text-white" : "text-black"} transition cursor-pointer`}
            >
                <MdFilterList className='text-[1.5rem]' />

            </div>

            {/* Filter Options */}
            {showFilters && (
                <div className="absolute mt-2 right-0 w-36 bg-white border border-[#6956E5] rounded-md shadow-lg z-10">
                    {filters.map((filter) => (
                        <button

                            key={filter}
                            onClick={() => {
                                dispatch(setFilter(filter));
                                setShowFilters(false); // Close menu on selection
                            }}
                            className={`block w-full text-left px-4 py-2  text-sm rounded-md capitalize hover:bg-gray-100 ${currentFilter === filter ? 'bg-gray-100 font-medium' : ''
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
