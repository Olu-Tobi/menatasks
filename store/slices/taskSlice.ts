
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadTasksFromStorage, saveTasksToStorage } from '@/utils/localStorage';

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

interface TaskState {
    tasks: Task[];
    filter: 'all' | 'completed' | 'pending';
    search: string;
}

// Load from localStorage if available
const localTasks = loadTasksFromStorage();

const initialState: TaskState = {
    tasks: localTasks || [],
    filter: 'all',
    search: '',
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
            saveTasksToStorage(state.tasks);
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.unshift(action.payload);
            saveTasksToStorage(state.tasks);
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                saveTasksToStorage(state.tasks);
            }
        },
        removeTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            saveTasksToStorage(state.tasks);
        },
        setFilter(state, action: PayloadAction<TaskState['filter']>) {
            state.filter = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
    },
});

export const {
    setTasks,
    addTask,
    updateTask,
    removeTask,
    setFilter,
    setSearch,
} = taskSlice.actions;

export const taskReducer = taskSlice.reducer;
