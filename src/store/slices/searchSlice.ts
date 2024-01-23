// /store/slices/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataItem } from '@models/dataItem';

interface SearchState {
    query: string;
    results: DataItem[];
    showResults: boolean;
    selectedIndex: number; // New state variable for selected index
    selectionHistory: DataItem[]; // New state variable for selection history
}

const initialState: SearchState = {
    query: '',
    results: [],
    showResults: true,
    selectedIndex: -1, // Initialize as -1 indicating no selection
    selectionHistory: [], // Initialize as an empty array
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<DataItem[]>) => {
            state.results = action.payload;
        },
        setShowResults: (state, action: PayloadAction<boolean>) => { // New reducer
            state.showResults = action.payload;
        },
        setSelectedIndex: (state, action: PayloadAction<number>) => {
            state.selectedIndex = action.payload;
        },
        addToSelectionHistory: (state, action: PayloadAction<DataItem>) => {
            state.selectionHistory.push(action.payload);
        },
    },
});

export const { setSearchQuery, setSearchResults, setShowResults, setSelectedIndex, addToSelectionHistory } = searchSlice.actions;

export default searchSlice.reducer;
