// context/AuthContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthentication, setCurrentUser, setLoading, setUserToken } from '@store/slices/authSlice';
import { ServiceFactory } from '@services/serviceFactory';

interface AuthContextType {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    loginWithProvider: (provider: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    login: async () => {},
    logout: () => {},
    loginWithProvider: async (string) => {
    },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const authService = ServiceFactory.getAuthService();

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            if (await authService.isAuthenticated()) {
                //get the token and user data
                const userData = await authService.getCurrentUser();
                const token = await authService.getToken();
                if (userData) {
                    dispatch(setCurrentUser(userData));
                    dispatch(setUserToken(token));
                    dispatch(setAuthentication(true));
                }
            }
            dispatch(setLoading(false));
        };

        checkAuth();
    }, [dispatch, setLoading]);

    const login = async (email: string, password: string) => {
        dispatch(setLoading(true)); // Start global loading
        try {
            const result = await authService.authenticate(email, password);
            console.log('Result:', result);
            if (result.success) {
                dispatch(setCurrentUser(result.user!));
                dispatch(setUserToken(result.token!));
                dispatch(setAuthentication(true));
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
            dispatch(setCurrentUser(result.user!));
            dispatch(setUserToken(result.token!));
            dispatch(setAuthentication(true));
        } catch (error) {
            // Handle error
            console.error('Google sign-in error:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const logout = () => {
        setLoading(true); // Start global loading
        authService.logout();
        dispatch(setCurrentUser(null));
        dispatch(setUserToken(null));
        dispatch(setAuthentication(false));
        dispatch(setLoading(false));
    };

    return (
        <AuthContext.Provider value={{ login, logout, loginWithProvider }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


