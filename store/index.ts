// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { uiReducer } from './slices/uiSlice';
import { taskReducer } from './slices/taskSlice';

const makeStore = () =>
    configureStore({
        reducer: {
            ui: uiReducer,
            task: taskReducer,
        },

        devTools: process.env.NODE_ENV !== 'production',
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
export const store = makeStore();
