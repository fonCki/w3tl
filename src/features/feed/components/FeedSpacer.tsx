import React, { ReactNode } from 'react';


/**
 * Represents a React functional component that serves as a feed spacer.
 *
 * @function FeedSpacer
 * @returns {React.ReactNode} - The rendered React node representing the feed spacer.
 */
const FeedSpacer: React.FC = () => {
    return (
        <div className="bg-transparent  h-5 w-full max-w-screen-xl  mx-auto">
        </div>
    );
};

export default FeedSpacer;
