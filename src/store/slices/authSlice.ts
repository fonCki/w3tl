// slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user/user'; // Adjust the import path as necessary

interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
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
    },
});

export const { setCurrentUser, setAuthentication } = authSlice.actions;
export default authSlice.reducer;
