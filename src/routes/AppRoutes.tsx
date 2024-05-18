// AppRoutes.tsx
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { routes } from '@constants/routesConfig';
import { setSearchQuery } from '@store/slices/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { RootState } from '@store/store';
import WelcomePage from '@features/auth/components/WelcomePage';
import Layout from '@components/layout/Layout';
import NotFound from '@pages/404';

/**
 * Class representing the application routes.
 * @constructor
 */
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
