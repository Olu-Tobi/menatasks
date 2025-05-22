import { AppDispatch } from '..';
import axios from 'axios';
import { setTasks, removeTask, updateTask, addTask } from '../slices/taskSlice';

// GET all tasks
export const fetchTasks = () => async (dispatch: AppDispatch) => {
    const res = await axios.get('/api/tasks');
    dispatch(setTasks(res.data));
};

// Create new task (simulate by manually adding it)
export const createTask = (task: { title: string }) => async (dispatch: AppDispatch) => {
    const res = await axios.post('/api/tasks', {
        ...task,
        completed: false,
    });
    dispatch(addTask(res.data));
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
