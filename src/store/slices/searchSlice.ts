// /store/slices/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataItem } from '@models/dataItem';

/**
 * Represents the state of a search operation.
 *
 * @interface SearchState
 */
interface SearchState {
    query: string;
    results: DataItem[];
    showResults: boolean;
    selectedIndex: number;
    selectionHistory: DataItem[];
}

/**
 * Represents the initial state of a search application.
 *
 * @typedef {Object} SearchState
 * @property {string} query - The current search query.
 * @property {Array} results - The array containing the search results.
 * @property {boolean} showResults - Indicates whether to show search results or not.
 * @property {number} selectedIndex - The index of the selected search result.
 * @property {Array} selectionHistory - The array containing the history of selected search results.
 *
 * @example
 * const initialState = {
 *   query: '',
 *   results: [],
 *   showResults: true,
 *   selectedIndex: -1,
 *   selectionHistory: [],
 * };
 */
const initialState: SearchState = {
    query: '',
    results: [],
    showResults: true,
    selectedIndex: -1,
    selectionHistory: [],
};

/**
 * searchSlice - Redux slice for managing search state
 *
 * @typedef {Object} SearchSliceState
 * @property {string} query - The search query string
 * @property {DataItem[]} results - The search results
 * @property {boolean} showResults - Flag indicating whether to show the search results or not
 * @property {number} selectedIndex - Index of the currently selected item in the search results
 * @property {DataItem[]} selectionHistory - Array of previously selected items in the search results
 *
 * @typedef {import('@reduxjs/toolkit').PayloadAction} PayloadAction
 * @typedef {Object} DataItem - Example data item structure
 *
 * @function setSearchQuery
 * @param {SearchSliceState} state - The current state of the search slice
 * @param {PayloadAction<string>} action - The search query payload action
 * @returns {void}
 *
 * @function setSearchResults
 * @param {SearchSliceState} state - The current state of the search slice
 * @param {PayloadAction<DataItem[]>} action - The search results payload action
 * @returns {void}
 *
 * @function setShowResults
 * @param {SearchSliceState} state - The current state of the search slice
 * @param {PayloadAction<boolean>} action - The show results payload action
 * @returns {void}
 *
 * @function setSelectedIndex
 * @param {SearchSliceState} state - The current state of the search slice
 * @param {PayloadAction<number>} action - The selected index payload action
 * @returns {void}
 *
 * @function addToSelectionHistory
 * @param {SearchSliceState} state - The current state of the search slice
 * @param {PayloadAction<DataItem>} action - The selected data item payload action
 * @returns {void}
 *
 * @type {import('@reduxjs/toolkit').Slice<SearchSliceState>}
 * @name searchSlice
 */
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
