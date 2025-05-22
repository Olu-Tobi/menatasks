'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/store/slices/uiSlice';

export default function ThemeHydrator() {
    const dispatch = useDispatch();


    useEffect(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        const theme = saved || (prefersLight ? 'light' : 'dark');
        dispatch(setTheme(theme));


        dispatch(setTheme(theme));

    }, []);



    return null;
}
