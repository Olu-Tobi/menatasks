'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery } from '@/store/slices/uiSlice';

export default function SearchBar() {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <input
            type="text"
            placeholder="Search for tasks here"
            value={searchQuery}
            onChange={handleChange}
            className={`w-[75%] max-[1024px]:w-[50%]  px-4 py-2 max-[1280px]:py-1.5 max-sm:py-2 rounded-lg border ${isDark ? "border-[#6956E5] bg-[#6956E540] placeholder:text-gray-300 focus:bg-[#6956E540] text-white" : "border-[#6956E540] bg-[#6956E510] placeholder:text-gray-400 focus:bg-white"}  focus:outline-none focus:ring-2 focus:ring-[#6956E5]  transition duration-200 text-sm max-[1280px]:text-[0.8rem]`}
        />
    );
}
