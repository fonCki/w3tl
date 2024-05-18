import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserCard from '../features/user/components/User';
import FeedContainer from '../features/feed/components/FeedContainer';
import UserProfileSelection from '../features/user/tabs/UserProfileSelection';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store'; // Adjust import path

/**
 * Represents a user profile.
 *
 * A UserProfile component which displays the user's profile details fetched from the server.
 *
 * @returns {jsx} - JSX component with user's profile information
 */
const UserProfile = () => {
    const { username } = useParams<{ username?: string }>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const userService = ServiceFactory.getUserService();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    useEffect(() => {
        async function fetchUserDetails() {
            dispatch(setDbLoading(true));
            if (!username) {
                console.error('No username provided');
                dispatch(setDbLoading(false));
                navigate('/404');
                return;
            }

            try {
                const fetchedUser = await userService.getUserByUsername(username);
                if (!fetchedUser) {
                    console.error('User not found');
                    navigate('/404');
                } else {
                    console.log('User found:', fetchedUser);
                    setUser(fetchedUser);
                }
            } catch (error) {
                console.error(error);
                navigate('/404');
            } finally {
                dispatch(setDbLoading(false));
            }
        }

        fetchUserDetails();
    }, [username, currentUser]);

    if (!user) {
        return null; // Or a loading spinner
    }

    const isViewingOwnProfile = (currentUser && user.userId === currentUser.userId) || undefined;


    return (
        <div>
            <FeedContainer>
                <UserCard user={user} isEditable={isViewingOwnProfile} />
            </FeedContainer>
            <UserProfileSelection userId={user.userId} />
        </div>
    );
};

export default UserProfile;
