import React, { useState, useEffect } from 'react';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setHasNewFollowing } from '@store/slices/notificationsSlice';

interface FollowButtonProps {
    user: User;
    blackAndWhite?: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ user, blackAndWhite = false }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const userRelationService = ServiceFactory.getUserRelationsService();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const dispatch = useDispatch();


    useEffect(() => {
        const checkIfFollowing = async () => {
            if (currentUser) {
                const response = await userRelationService.amIFollowing(currentUser.userId, user.userId);
                if (!response.error) {
                    setIsFollowing(response.following);
                } else {
                    // Handle the error case
                    console.error(response.error);
                }
            }
        };

        checkIfFollowing();
    }, [currentUser, user.userId,]);

    const handleFollow = async () => {
        setIsFollowing(true);
        await userRelationService.followUser(currentUser!.userId, user.userId);
        dispatch(setHasNewFollowing(true)); // Update the Redux state
    };

    const handleUnfollow = async () => {
        setIsFollowing(false);
        await userRelationService.unfollowUser(currentUser!.userId, user.userId);
        dispatch(setHasNewFollowing(true)); // Update the Redux state
    };

    const buttonStyle = "bg-button-blue hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 w-18 sm:w-32 text-sm sm:text-base";
    const blackAndWhiteStyle = "ui button inverted bg-blue";
    {/*<button className="ui button inverted bg-blue" style={{ borderRadius: '9999px' }*/}
    {/*}>Follow</button>*/}
    return (
        <div>
            {!isFollowing ? (
                <button className={`${blackAndWhite ? blackAndWhiteStyle : buttonStyle}`}
                        style={{ borderRadius: '9999px' }}
                        onClick={handleFollow}
                >Follow</button>
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
