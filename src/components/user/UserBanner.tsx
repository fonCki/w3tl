import React from 'react';
import { DEFAULT_BACKGROUND_IMAGE } from '@constants/constants';
import { UserDetails } from '@models/userDetails';

interface UserBannerProps {
    userDetails: UserDetails;

}

const UserBanner: React.FC<UserBannerProps> = ({ userDetails }) => {
    return (
        <img
            className="w-full h-64 object-cover object-center border-r-8"
            src={userDetails.background || DEFAULT_BACKGROUND_IMAGE}
            alt={`${userDetails.username}'s background`}
        />
    );
}

export default UserBanner;