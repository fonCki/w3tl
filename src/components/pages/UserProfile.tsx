import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserCard from '@components/user/profile/User';
import FeedContainer from '@components/feed/FeedContainer';
import UserProfileSelection from '@components/user/feed/UserProfileSelection';
import useFetchUserDetails from '@hooks/useFetchUserDetails';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Loader } from 'semantic-ui-react';
import { routes } from '@constants/routesConfig';


const UserProfile = () => {
    const { username } = useParams<{ username?: string }>();
    const userDetails = useFetchUserDetails(username);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('userDetails', userDetails)
    }, []);

    if (isLoading) {
        return <Loader active inline="centered" />;
    }

    if (!userDetails) {
        navigate("/404");
        return null;
    }

    return (
        <div>
            <FeedContainer>
                <UserCard userDetails={userDetails} />
            </FeedContainer>
            <UserProfileSelection username={userDetails.id} />
        </div>
    );
};

export default UserProfile;
