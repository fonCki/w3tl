import React, { useState } from 'react';

const FollowButton = () => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
        setIsFollowing(true);
        // Additional logic to follow the user
    };

    const handleUnfollow = () => {
        setIsFollowing(false);
        // Additional logic to unfollow the user
    };

    // Define a fixed width for the buttons
    const buttonStyle = "bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 w-18 sm:w-32 text-sm sm:text-base";

    return (
        <div>
            {!isFollowing && (
                <button
                    color="blue"
                    className={`${buttonStyle} bg-primary hover:bg-primary-dark`}
                    onClick={handleFollow}>
                    Follow
                </button>
            )}
            {isFollowing && (
                <button
                    className={`${buttonStyle} bg-secondary hover:bg-red-400`}
                    onClick={handleUnfollow}
                    onMouseEnter={(e) => e.currentTarget.textContent = 'Unfollow'}
                    onMouseLeave={(e) => e.currentTarget.textContent = 'Following'}>
                    Following
                </button>
            )}
        </div>
    );
};

export default FollowButton;
