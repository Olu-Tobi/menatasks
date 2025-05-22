import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskCard from '@/components/TaskCard';

import { uiReducer } from '@/store/slices/uiSlice';
import { taskReducer } from '@/store/slices/taskSlice';

// Mock modals
jest.mock('@/components/EditTaskModal', () => {
    const React = require('react');
    return () => React.createElement('div', null, 'Edit Modal');
});

jest.mock('@/components/ConfirmDeleteModal', () => {
    const React = require('react');
    return ({ isOpen, onClose, onConfirm }: any) =>
        isOpen
            ? React.createElement(
                'div',
                null,
                'Confirm Delete ',
                React.createElement('button', { onClick: onConfirm }, 'Yes')
            )
            : null;
});

// Mock thunks
const taskThunks = require('@/store/thunks/taskThunks');
jest.mock('@/store/thunks/taskThunks', () => ({
    updateTaskFunc: jest.fn(() => ({ type: 'UPDATE_TASK' })),
    deleteTaskFunc: jest.fn(() => ({ type: 'DELETE_TASK' })),
}));

// Sample task
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const task: Task = {
    id: 1,
    title: 'Test Task',
    completed: false,
};

// Render helper with full preloaded state
function renderWithStore(task: Task, theme: 'light' | 'dark' = 'light') {
    const store = configureStore({
        reducer: {
            ui: uiReducer,
            task: taskReducer,
        },
        preloadedState: {
            ui: {
                theme,
                filter: 'all' as 'all',

                searchQuery: '',
            },
            task: {
                tasks: [task],
                loading: false,
                error: null,
                filter: 'all' as 'all',

                search: '',
            },
        },
    });

    return render(
        <Provider store={store}>
            <TaskCard task={task} />
        </Provider>
    );
}

describe('TaskCard', () => {
    test('renders task title and status', () => {
        renderWithStore(task);
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    test('dispatches updateTaskFunc on checkbox toggle', () => {
        renderWithStore(task);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(taskThunks.updateTaskFunc).toHaveBeenCalledWith(1, { completed: true });
    });

    test('shows edit modal on edit button click', () => {
        renderWithStore(task);
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);
        expect(screen.getByText('Edit Modal')).toBeInTheDocument();
    });

    test('opens delete modal and confirms deletion', () => {
        renderWithStore(task);
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);
        const confirmButton = screen.getByText('Yes');
        fireEvent.click(confirmButton);
        expect(taskThunks.deleteTaskFunc).toHaveBeenCalledWith(1);
    });
});
