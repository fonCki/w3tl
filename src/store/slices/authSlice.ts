import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user/user'; // Adjust the import path as necessary

/**
 * Represents the authentication state of the application.
 * @interface
 */
interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    privateKey: string | null; // Add privateKey field
    token: string | null;
}

/**
 * Initial state for AuthState.
 *
 * @typedef {Object} AuthState
 * @property {string|null} currentUser - The current user. Null if no user is logged in.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated or not.
 * @property {boolean} isLoading - Indicates whether the authentication process is in progress or not.
 * @property {string|null} privateKey - The private key of the user. Null if no user is logged in.
 * @property {string|null} token - The authentication token. Null if no user is logged in.
 */
const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: true,
    privateKey: null,
    token: null,
};

/**
 * Slice for handling authentication related actions and state
 *
 * @typedef {import('@reduxjs/toolkit').EntityState} EntityState - The state object for this slice
 * @typedef {import('@reduxjs/toolkit').PayloadAction} PayloadAction - The action object for this slice
 * @typedef {import('./User')} User - The user object for this slice
 *
 * @property {EntityState} initialState - The initial state for this slice
 * @property {function(Object, EntityState): void} setCurrentUser - Redux reducer to set the current user and authentication status
 * @property {function(Object, PayloadAction<boolean>): void} setAuthentication - Redux reducer to set the authentication status
 * @property {function(Object, PayloadAction<boolean>): void} setLoading - Redux reducer to set the loading status
 * @property {function(Object, PayloadAction<string | null>): void} setPrivateKey - Redux reducer to set the private key
 * @property {function(Object, PayloadAction<string | null>): void} setUserToken - Redux reducer to set the user token
 * @property {function(Object): void} clearState - Redux reducer to clear the state on logout
 */
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
        setUserToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        clearState: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.privateKey = null; // Clear privateKey on logout
        },
    },
});

export const {
    setCurrentUser,
    setAuthentication,
    setLoading,
    setPrivateKey,
    clearState,
    setUserToken,
} = authSlice.actions;
export default authSlice.reducer;
