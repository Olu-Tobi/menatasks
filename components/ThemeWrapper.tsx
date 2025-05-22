'use client'

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const theme = useSelector((state: RootState) => state.ui.theme);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const root = document.documentElement;
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }

        }
    }, [theme]);

    return <div className="h-screen">{children}</div>;
}
