
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { LOGIN_ROUTE } from '@constants/routesConfig';

interface ProtectedRouteProps {
    children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    if (!isLoading && !isAuthenticated) {
        //TODO
        console.log('isAuthenticated', isAuthenticated);
        console.log('isLoading', isLoading);
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};


export default ProtectedRoute;
