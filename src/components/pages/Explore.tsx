//Create explore default template
// Path: src/components/pages/Explore.tsx
import React from 'react';
import { useNavigationActions } from '@hooks/useNavigationActions';

const Explore = () => {
    const { navigateToHome } = useNavigationActions();

    return (
        <div>
            <h1>Explore</h1>
            <button onClick={navigateToHome}>Go to Home</button>
        </div>
    );
};

export default Explore;