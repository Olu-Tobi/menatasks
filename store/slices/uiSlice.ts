import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    theme: 'light' | 'dark';
    filter: 'all' | 'completed' | 'pending';
    searchQuery: string;
}

const initialState: UIState = {
    theme: 'light',
    filter: 'all',
    searchQuery: '',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.theme);
            }
        },
        setTheme(state, action: PayloadAction<'light' | 'dark'>) {
            state.theme = action.payload;
        },
        setFilter(state, action: PayloadAction<'all' | 'completed' | 'pending'>) {
            state.filter = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { toggleTheme, setTheme, setFilter, setSearchQuery } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
