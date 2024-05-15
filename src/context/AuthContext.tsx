// context/AuthContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearState, setAuthentication, setCurrentUser, setLoading, setPrivateKey } from '@store/slices/authSlice';
import { ServiceFactory } from '@services/serviceFactory';

interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loginWithProvider: (provider: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    login: async () => {},
    logout: () => {},
    loginWithProvider: async () => {
    },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const authService = ServiceFactory.getAuthService();

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            const result = await authService.getCurrentUser();
            if (result.success && result.user) {
                dispatch(setCurrentUser(result.user));
                dispatch(setAuthentication(true));
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
            console.log('Result:', result);
            if (result.success) {
                dispatch(setCurrentUser(result.user!));
                dispatch(setAuthentication(true));
                dispatch(setPrivateKey(result.privateKey || null));
            } else {
                throw new Error(result.error || 'Authentication failed');
            }
        } catch (error) {
            throw error; // Re-throw the error to be handled in the component
        } finally {
            dispatch(setLoading(false));
        }
    };

    const loginWithProvider = async (provider: string) => {
        dispatch(setLoading(true));
        try {
            const result = await authService.authenticateWithProvider(provider);
            console.log(provider, 'sign-in result:', result);
            // Update user state and authentication status as necessary
            if (result.success) {
                dispatch(setCurrentUser(result.user!));
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
        dispatch(clearState());
        dispatch(setLoading(false));
    };

    return (
        <AuthContext.Provider value={{ login, logout, loginWithProvider }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
