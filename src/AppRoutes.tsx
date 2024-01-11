// AppRoutes.js or AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@components/pages/Home'; // Adjust the path as necessary
import UserProfile from '@components/pages/UserProfile'; // Adjust the path as necessary
// Import other pages as needed

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user/:username" element={<UserProfile />} />
            {/* Add more routes here */}
            {/* Example: <Route path="/about" element={<About />} /> */}
        </Routes>
    );
};

export default AppRoutes;
