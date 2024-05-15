import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user/user'; // Adjust the import path as necessary

interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    privateKey: string | null; // Add privateKey field
}

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: true,
    privateKey: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setAuthentication: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setPrivateKey: (state, action: PayloadAction<string | null>) => {
            state.privateKey = action.payload; // Add setPrivateKey action
        },
        clearState: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.privateKey = null; // Clear privateKey on logout
        },
    },
});

export const { setCurrentUser, setAuthentication, setLoading, setPrivateKey, clearState } = authSlice.actions;
export default authSlice.reducer;
