// AppRoutes.js or AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@constants/routesConfig';

const AppRoutes = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.component />} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
