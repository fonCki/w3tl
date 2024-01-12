import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '@components/user/profile/User';
import FeedContainer from '@components/feed/FeedContainer';
import { userService } from '@services/userService';
import { UserDetails } from '@models/userDetails';
import UserProfileSelection from '@components/user/feed/UserProfileSelection';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { username } = useParams<{ username?: string }>();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchUserDetails() {
            try {
                if (username) {
                    const user = await userService.getUserByUsername(username);
                    if (user) {
                        const userDetails = await userService.getUserDetails(user.id);
                        if (userDetails) {
                            setUserDetails(userDetails);
                        } else {
                            // Handle the case where userDetails is undefined
                            navigate('/home');
                        }
                    } else {
                        // Handle the case where the user with the given username is not found
                        navigate('/home');
                    }
                } else {
                    // Handle the case where `username` is undefined
                    navigate('/home');
                }
            } catch (error) {
                // Handle any errors that occur during the fetch
                console.error(error);
                navigate('/home');
            }
        }

        fetchUserDetails();
    }, [username, navigate]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <FeedContainer>
                <UserCard userDetails={userDetails} />
            </FeedContainer>
            <UserProfileSelection userId={userDetails.id} />
        </div>
    );
};

export default UserProfile;
