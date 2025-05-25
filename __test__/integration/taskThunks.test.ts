import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from '@/store/slices/taskSlice';
import axios from 'axios';
import { fetchTasks, createTask } from '@/store/thunks/taskThunks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Move setupStore here, outside of describe
const setupStore = () =>
    configureStore({
        reducer: {
            task: taskReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // thunk included by default
    });

describe('Task thunks integration', () => {
    it('fetches tasks and updates the store', async () => {
        const store = setupStore();

        mockedAxios.get.mockResolvedValueOnce({
            data: Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                title: `Task ${i + 1}`,
                completed: false,
            })),
        });

        await store.dispatch<any>(fetchTasks());

        const state = store.getState().task;
        expect(state.tasks).toHaveLength(10);
        expect(state.tasks[0].title).toBe('Task 1');
    });

    it('creates a new task and adds it to the top of the store', async () => {
        const store = setupStore();

        mockedAxios.post.mockResolvedValueOnce({
            data: { id: 101, title: 'New Task', completed: false },
        });

        await store.dispatch<any>(createTask({ title: 'New Task' }));

        const state = store.getState().task;
        expect(state.tasks[0].title).toBe('New Task');
        expect(state.tasks[0].id).toBe(201);
    });
});
