'use client';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/uiSlice';
import { RootState } from '../store';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
            className={`relative cursor-pointer w-14 h-8 max-[1280px]:w-13 max-[1280px]:h-7 rounded-full flex items-center px-1 transition-colors duration-300 
        ${isDark ? 'bg-gray-500' : 'bg-yellow-300'}`}
        >
            {/* Toggle knob */}
            <div
                className={`w-6 h-6 max-[1280px]:w-5 max-[1280px]:h-5 rounded-full bg-white shadow-md flex items-center justify-center text-sm text-yellow-500 transition-all duration-300 transform
          ${isDark ? 'translate-x-6 text-gray-700' : 'translate-x-0 text-yellow-500'}`}
            >
                {isDark ? <FaMoon size={12} /> : <FaSun size={12} />}
            </div>
        </button>
    );
}



