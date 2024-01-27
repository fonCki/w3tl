// slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserFull } from '@models/user/userFull'; // Adjust the import path as necessary

interface AuthState {
    currentUser: UserFull | null;
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
        setCurrentUser: (state, action: PayloadAction<UserFull | null>) => {
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
