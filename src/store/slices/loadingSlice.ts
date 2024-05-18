import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents the loading state of a component.
 *
 * @interface LoadingState
 */
interface LoadingState {
    isLoading: boolean;
}

/**
 * Represents the initial state of LoadingState.
 *
 * @typedef {object} LoadingState
 * @property {boolean} isLoading - Indicates whether the state is currently loading or not.
 */
const initialState: LoadingState = {
    isLoading: false,
};

/**
 * A slice for managing loading state in the application.
 *
 * @typedef {Object} LoadingSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Function} reducers.setLoading - Reducer function to set the loading state.
 */
const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
