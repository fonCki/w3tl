import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

/**
 * Represents the props for the ProtectedRoute component.
 */
interface ProtectedRouteProps {
    children?: ReactNode;
}

/**
 * A protected route component that allows only authenticated users to access its children.
 *
 * @component
 * @param {Object} props - The properties for the ProtectedRoute component.
 * @param {React.ReactNode} props.children - The child components to be rendered when the user is authenticated.
 * @returns {React.ReactNode} - The rendered component.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    if (!isLoading && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};


export default ProtectedRoute;
