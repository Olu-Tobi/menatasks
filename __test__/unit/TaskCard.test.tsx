import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '@/components/TaskCard';
import { Provider } from 'react-redux';

import { configureMockStore } from '@jedmao/redux-mock-store'
import * as thunkImport from 'redux-thunk';

const thunk = thunkImport.thunk || thunkImport;


//const thunk = require('redux-thunk').default;

// Mock EditTaskModal correctly with React required inside factory
jest.mock('@/components/EditTaskModal', () => {
    const React = require('react');
    return () => React.createElement('div', null, 'Edit Modal');
});

// Mock ConfirmDeleteModal correctly with React required inside factory
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

const taskThunks = require('@/store/thunks/taskThunks');
jest.mock('@/store/thunks/taskThunks', () => ({
    updateTaskFunc: jest.fn(() => ({ type: 'UPDATE_TASK' })),
    deleteTaskFunc: jest.fn(() => ({ type: 'DELETE_TASK' })),
}));

const mockStore = configureMockStore([thunk]);

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

function renderWithStore(task: Task, theme: 'dark' | 'light' = 'light') {
    const store = mockStore({
        ui: { theme },
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
