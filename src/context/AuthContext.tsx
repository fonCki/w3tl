// context/AuthContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    clearState,
    setAuthentication,
    setCurrentUser,
    setLoading,
    setPrivateKey,
    setUserToken,
} from '@store/slices/authSlice';
import { ServiceFactory } from '@services/serviceFactory';

/**
 * Interface representing the authentication context.
 *
 * @interface
 */
interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loginWithProvider: (provider: string) => Promise<void>;
}

/**
 * Represents the authentication context for the application.
 * @typedef {Object} AuthContext
 * @property {Function} login - A function to authenticate the user.
 * @property {Function} logout - A function to log out the user.
 * @property {Function} loginWithProvider - A function to authenticate the user using a provider.
 */
const AuthContext = createContext<AuthContextType>({
    login: async () => {},
    logout: () => {},
    loginWithProvider: async () => {
    },
});

/**
 * The AuthProvider component is responsible for handling authentication and managing user state.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be wrapped by the AuthProvider
 * @returns {React.ReactElement} - The JSX element representing the AuthProvider
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const authService = ServiceFactory.getAuthService();

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            const result = await authService.getCurrentUser();
            if (result.success && result.user) {
                const token = await authService.getToken();
                dispatch(setCurrentUser(result.user));
                dispatch(setAuthentication(true));
                dispatch(setUserToken(token));
                dispatch(setPrivateKey(result.privateKey || null));
            }
            dispatch(setLoading(false));
        };

        checkAuth();
    }, [dispatch]);

    const login = async (email: string, password: string) => {
        dispatch(setLoading(true)); // Start global loading
        try {
            const result = await authService.authenticate(email, password);
            if (result.success) {
                dispatch(setCurrentUser(result.user!));
                dispatch(setUserToken(result.token!));
                dispatch(setAuthentication(true));
                dispatch(setPrivateKey(result.privateKey || null));
            } else {
                throw new Error(result.error || 'Authentication failed');
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    const loginWithProvider = async (provider: string) => {
        dispatch(setLoading(true));
        try {
            const result = await authService.authenticateWithProvider(provider);
            // Update user state and authentication status as necessary
            if (result.success) {
                dispatch(setCurrentUser(result.user!));
                dispatch(setUserToken(result.token!));
                dispatch(setAuthentication(true));
                dispatch(setPrivateKey(result.privateKey || null));
            } else {
                throw new Error(result.error || 'Authentication failed');
            }
        } catch (error) {
            // Handle error
            console.error('Provider sign-in error:', error);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const logout = () => {
        dispatch(setLoading(true)); // Start global loading
        authService.logout();
        dispatch(setUserToken(null));
        dispatch(clearState());
        dispatch(setLoading(false));
    };

    return (
        <AuthContext.Provider value={{ login, logout, loginWithProvider }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * A hook that provides access to the authentication context.
 *
 * @returns {Object} The authentication context object.
 */
export const useAuth = () => useContext(AuthContext);
