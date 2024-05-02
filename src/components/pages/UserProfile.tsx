import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserCard from '@components/user/profile/User';
import FeedContainer from '@components/feed/FeedContainer';
import UserProfileSelection from '@components/user/feed/UserProfileSelection';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store'; // Adjust import path


const UserProfile = () => {
    const { username } = useParams<{ username?: string }>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const userService = ServiceFactory.getUserService();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const token = useSelector((state: RootState) => state.auth.token);


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
                const fetchedUser = await userService.getUserByUsername(username, token!);
                if (!fetchedUser) {
                    const fetchedUser = await userService.getUserByUsername(currentUser!.username, token!);
                    if (!fetchedUser) {
                        console.error('User not found');
                        navigate('/404');
                    } else {
                        console.log('User found:', fetchedUser);
                        setUser(fetchedUser);
                    }
                    console.error('User not found');
                    navigate('/404');
                } else {
                    console.log('User found:', fetchedUser);
                    setUser(fetchedUser);
                }
            } catch (error) {
                try {
                    const fetchedUser = await userService.getUserByUsername(currentUser!.username, token!);
                    if (!fetchedUser) {
                        console.error('User not found');
                        navigate('/404');
                    } else {
                        console.log('User found:', fetchedUser);
                        setUser(fetchedUser);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    navigate('/404');
                }
            } finally {
                dispatch(setDbLoading(false));
            }
        }

        fetchUserDetails();
    }, [currentUser]);

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
