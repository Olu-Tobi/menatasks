'use client';

import useSWR from 'swr';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setTasks } from '@/store/slices/taskSlice';
import { useEffect } from 'react';
import { loadTasksFromStorage, saveTasksToStorage } from '@/utils/localStorage';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useTasks() {
    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector((state: RootState) => state.task.tasks);

    const { data, error, mutate, isLoading } = useSWR('/api/tasks', fetcher);

    useEffect(() => {
        if (data) {
            const localTasks = loadTasksFromStorage() || [];

            // Find max ID from API
            const maxApiId = Math.max(...data.map((t: any) => t.id), 0);

            // Filter out only local-created tasks
            const onlyLocal = localTasks.filter((t: any) => t.id > maxApiId);

            // Merge local-created tasks + API tasks
            const combined = [...onlyLocal, ...data];

            // Save combined for later persistence
            saveTasksToStorage(combined);

            // Push to Redux
            dispatch(setTasks(combined));
        }
    }, [data, dispatch]);

    return {
        tasks,
        isLoading,
        isError: error,
        mutate,
    };
}
