// AppRoutes.tsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { routes } from '@constants/routesConfig';
import { setSearchQuery } from '@store/slices/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { RootState } from '@store/store';
import Login from '@components/pages/Login';
import NotFound from '@components/404';
import Layout from '../Layout';
import WelcomePage from '@components/pages/WelcomePage'; // Assuming you have this file in the same directory

const AppRoutes = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


    useEffect(() => {
        if (!location.pathname.startsWith('/search/')) {
            dispatch(setSearchQuery(''));
        }
    }, [location, dispatch]);

    return (
        <Routes>
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/" replace /> : <WelcomePage />
            } />
            <Route path="/welcome" element={
                isAuthenticated ? <Navigate to="/" replace /> : <WelcomePage />
            } />
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={
                    route.protected ?
                        <Layout><ProtectedRoute><route.component /></ProtectedRoute></Layout> :
                        <route.component />
                } />
            ))}
            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
    );
};

export default AppRoutes;
