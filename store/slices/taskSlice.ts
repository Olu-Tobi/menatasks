import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: TaskState = {
    tasks: [],
    filter: 'all',
    search: '',
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
        },
        setFilter(state, action: PayloadAction<TaskState['filter']>) {
            state.filter = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.unshift(action.payload); // Add to top of list
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        removeTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
    },
});

export const { setTasks, setFilter, setSearch, addTask, updateTask, removeTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
