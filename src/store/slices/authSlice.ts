// slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user/user'; // Adjust the import path as necessary

interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
}

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: true, // Add a loading state
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setUserToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setAuthentication: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
            if (!action.payload) {
                state.currentUser = null;
                state.token = null;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

    },
});

export const { setCurrentUser, setAuthentication, setLoading, setUserToken } = authSlice.actions;
export default authSlice.reducer;
