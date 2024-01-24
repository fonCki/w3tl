// AppRoutes.js or AppRoutes.tsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { routes } from '@constants/routesConfig';
import { setSearchQuery } from '@store/slices/searchSlice';
import { useDispatch } from 'react-redux';


const AppRoutes = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!location.pathname.startsWith('/search/')) {
            dispatch(setSearchQuery(''));
        }
    }, [location, dispatch]);

    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.component />} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
