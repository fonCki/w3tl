import React, { ReactNode } from 'react';

interface FeedContainerProps {
    children: ReactNode;
    decoration?: boolean;
}

const FeedContainer: React.FC<FeedContainerProps> = ({ children, decoration = true }) => {
    return (
        <div className={`bg-white  w-full max-w-screen-xl shadow rounded-t-lg mx-auto ${decoration ? 'mb-4 rounded-b-lg' : 'mb-1'}`}>
            {children}
        </div>
    );
};

export default FeedContainer;
