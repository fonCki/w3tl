// context/AuthContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setAuthentication, setLoading } from '@store/slices/authSlice';
import { ServiceFactory } from '@services/serviceFactory';

interface AuthContextType {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    login: async () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const authService = ServiceFactory.getAuthService();

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            if (await authService.isAuthenticated()) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(setCurrentUser(userData));
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
            console.log('Logging', email, password);
            const result = await authService.authenticate(email, password);
            console.log('Result:', result);
            if (result.success) {
                dispatch(setCurrentUser(result.user!));
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

    const logout = () => {
        setLoading(true); // Start global loading
        authService.logout();
        dispatch(setCurrentUser(null));
        dispatch(setAuthentication(false));
        dispatch(setLoading(false));
    };

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
