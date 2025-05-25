import { AppDispatch } from '..';
import axios from 'axios';
import { setTasks, removeTask, updateTask, addTask } from '../slices/taskSlice';
import { loadTasksFromStorage, saveTasksToStorage } from '@/utils/localStorage';

// GET all tasks
export const fetchTasks = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get('/api/tasks');
        const apiTasks = res.data;

        // Load local tasks (previously added ones)
        const localTasks = loadTasksFromStorage() || [];

        // Find the max ID from API so we don’t conflict
        const maxApiId = Math.max(...apiTasks.map((t: any) => t.id), 0);

        // Filter local tasks that have IDs higher than API tasks (i.e., user-created)
        const onlyLocal = localTasks.filter((t: any) => t.id > maxApiId);

        // Merge both
        const combined = [...onlyLocal, ...apiTasks];


        // Save merged version back to localStorage and update Redux state
        saveTasksToStorage(combined);
        dispatch(setTasks(combined));
    } catch (err) {
        console.error('Error fetching tasks:', err);
    }
};


// Create new task (simulate by manually adding it)
export const createTask = (task: { title: string }) => async (dispatch: AppDispatch, getState: () => any) => {
    const res = await axios.post('/api/tasks', {
        ...task,
        completed: false,
    });

    // Use Redux state to find max ID
    const existingTasks = getState().task.tasks;
    const maxId = existingTasks.length ? Math.max(...existingTasks.map((t: any) => t.id)) : 200;

    const newTask = {
        ...res.data,
        id: maxId + 1,
    };

    dispatch(addTask(newTask));
};



export const updateTaskFunc =
    (id: number, updates: Partial<{ title: string; completed: boolean }>) =>
        async (dispatch: AppDispatch, getState: () => any) => {
            const res = await axios.patch(`/api/tasks/${id}`, updates);

            const currentTask = getState().task.tasks.find((t: any) => t.id === id);

            const fullUpdatedTask = {
                id,
                title: updates.title ?? currentTask.title,
                completed: updates.completed ?? currentTask.completed,
            };

            dispatch(updateTask(fullUpdatedTask));
        };


// Delete task (simulate by removing from state)
export const deleteTaskFunc = (id: number) => async (dispatch: AppDispatch) => {
    await axios.delete(`/api/tasks/${id}`);
    dispatch(removeTask(id)); // Don't re-fetch
};
