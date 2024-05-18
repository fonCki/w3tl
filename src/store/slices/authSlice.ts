import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user/user'; // Adjust the import path as necessary

/**
 * Represents the authentication state of the application.
 */
interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    privateKey: string | null; // Add privateKey field
}

/**
 * Holds the initial state for the Auth module.
 *
 * @typedef {Object} AuthState
 * @property {Object|null} currentUser - The currently logged in user. Default: null.
 * @property {boolean} isAuthenticated - Flag indicating if the user is authenticated. Default: false.
 * @property {boolean} isLoading - Flag indicating if the authentication process is loading. Default: true.
 * @property {Object|null} privateKey - The private key used for encryption. Default: null.
 */
const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: true,
    privateKey: null,
};

/**
 * Represents the auth slice of the Redux store.
 *
 * @typedef {Object} AuthSlice
 * @property {string} name - The name of the slice ('auth').
 * @property {Object} initialState - The initial state of the slice.
 * @property {User|null} initialState.currentUser - The currently logged in user or null if no user is logged in.
 * @property {boolean} initialState.isAuthenticated - Indicates whether a user is authenticated.
 * @property {boolean} initialState.isLoading - Indicates whether data is being loaded.
 * @property {string|null} initialState.privateKey - The private key associated with the user or null if no key is set.
 * @property {Object} reducers - The reducers of the slice.
 * @property {function} reducers.setCurrentUser - Sets the current user and updates the authentication status.
 * @property {function} reducers.setAuthentication - Sets the authentication status.
 * @property {function} reducers.setLoading - Sets the loading status.
 * @property {function} reducers.setPrivateKey - Sets the private key.
 * @property {function} reducers.clearState - Clears the state when the user logs out.
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
