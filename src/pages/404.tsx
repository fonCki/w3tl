import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@components/ui/icons/logo-header'; // Adjust the import path as necessary

/**
 * PageNotFound component represents a 404 error page.
 * It provides a user-friendly message and a link to return to the home page.
 *
 * @returns {ReactElement} The rendered page component.
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Logo size="big" />
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mt-6">Page Not Found</h1>
            <p className="text-md text-gray-600 mt-2">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>

            <button
                onClick={() => navigate('/home')}
                className="mt-6 bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Go to Home Page
            </button>
        </div>
    );
};

export default NotFound;
