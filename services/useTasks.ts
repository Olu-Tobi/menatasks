import useSWR from 'swr';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setTasks } from '@/store/slices/taskSlice';
import { useEffect } from 'react';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useTasks() {
    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector((state: RootState) => state.task.tasks);

    const { data, error, mutate, isLoading } = useSWR('/api/tasks', fetcher);

    // When data changes, sync it to Redux store
    useEffect(() => {
        if (data) {
            dispatch(setTasks(data));
        }
    }, [data, dispatch]);

    return {
        tasks,
        isLoading,
        isError: error,
        mutate,
    };
}
