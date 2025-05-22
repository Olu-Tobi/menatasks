'use client';

import { useTasks } from '@/services/useTasks';
import TaskCard from './TaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function TaskList() {
    const { tasks } = useTasks();
    const filter = useSelector((state: RootState) => state.ui.filter);
    const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);


    const filteredTasks = tasks.filter((task: any) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; // 'all'
    })
        .filter((task: any) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <>
            {filteredTasks.map((task: any, i) => (
                <TaskCard key={task.id} task={task} index={i} />
            ))}
        </>
    );
}
