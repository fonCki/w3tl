import React, { useState, useEffect } from 'react';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface FollowButtonProps {
    user: User;
}

const FollowButton: React.FC<FollowButtonProps> = ({ user }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const userRelationService = ServiceFactory.getUserRelationsService();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    useEffect(() => {
        const checkIfFollowing = async () => {
            if (currentUser) {
                const response = await userRelationService.amIFollowing(currentUser.id, user.id);
                if (!response.error) {
                    setIsFollowing(response.following);
                } else {
                    // Handle the error case
                    console.error(response.error);
                }
            }
        };

        checkIfFollowing();
    }, [currentUser, user.id, userRelationService]);

    const handleFollow = async () => {
        setIsFollowing(true);
        await userRelationService.followUser(currentUser!.id, user.id);
    };

    const handleUnfollow = async () => {
        setIsFollowing(false);
        await userRelationService.unfollowUser(currentUser!.id, user.id);
    };

    const buttonStyle = "bg-button-blue hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 w-18 sm:w-32 text-sm sm:text-base";

    return (
        <div>
            {!isFollowing ? (
                <button className={buttonStyle} onClick={handleFollow}>Follow</button>
            ) : (
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
