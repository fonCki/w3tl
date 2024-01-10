import React, { ReactNode } from 'react';

interface FeedContainerProps {
    children: ReactNode;
}

const FeedContainer: React.FC<FeedContainerProps> = ({ children }) => {
    return (
        <div className="bg-white rounded-lg shadow w-full max-w-screen-xl mx-auto mb-4">
            {children}
        </div>
    );
};

export default FeedContainer;
