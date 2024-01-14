import React from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '@components/user/profile/User';
import FeedContainer from '@components/feed/FeedContainer';
import UserProfileSelection from '@components/user/feed/UserProfileSelection';
import useFetchUserDetails from '@hooks/useFetchUserDetails';

const UserProfile = () => {
    const { username } = useParams<{ username?: string }>();
    const userDetails = useFetchUserDetails(username);

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
