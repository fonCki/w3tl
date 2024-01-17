import React from 'react';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { FaUser } from 'react-icons/fa'; // Import an icon

interface FeedTitleProps {
    title?: string;
    showUser?: boolean;
}

const FeedTitle: React.FC<FeedTitleProps> = ({ title, showUser = true }) => {
    const currentUser = useCurrentUser();

    return (
        <div className="flex items-center justify-start align-middle p-1 m-1 pb-6">
            <p className="text-3xl font-bold text-gray-600">
                {title}
                {showUser && (
                    <>
                        <span className="text-gray-500 mx-2">·</span>
                        <FaUser className="inline text-xl text-gray-500 mr-1" /> {/* User icon */}
                        <span className="italic text-gray-500 text-xl">@{currentUser.username}</span>
                    </>
                )}
            </p>
        </div>
    );
}

export default FeedTitle;
