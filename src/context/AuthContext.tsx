// context/AuthContext.tsx
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setAuthentication } from '@store/slices/authSlice'; // Adjust the import path as necessary
import { RootState } from '@store/store';
import { ServiceFactory } from '@services/serviceFactory'; // Adjust the import path as necessary

interface AuthContextType {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    login: async () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const authService = ServiceFactory.getAuthService();


    useEffect(() => {
        // Check if the user is already authenticated on app load
        const checkAuth = async () => {
            if (await authService.isAuthenticated()) {
                console.log('User already authenticated');
                const userData = await authService.getCurrentUser();
                console.log('User data:', userData);
                if (userData) {
                    dispatch(setCurrentUser(userData));
                    dispatch(setAuthentication(true));
                }
            }
        };

        checkAuth();
    }, [dispatch]);
    const login = async (username: string, password: string) => {
        try {
            const result = await authService.authenticate(username, password);
            console.log('result', result)
            if (result.success) {
                console.log('Login success:', result.user);
                dispatch(setCurrentUser(result.user!)); // Assuming result.user is of type User
                dispatch(setAuthentication(true));
            } else {
                console.error('Login error:', result.error);
            }
        } catch (error) {
            console.error('Error in login:', error);
        }
    };


    const logout = () => {
        authService.logout();
        dispatch(setCurrentUser(null));
        dispatch(setAuthentication(false));
    };

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
