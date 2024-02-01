import React from 'react';
import { DEFAULT_BACKGROUND_IMAGE } from '@constants/constants';
import { User } from '@models/user/user';

interface UserBannerProps {
    user: User;

}

const UserBanner: React.FC<UserBannerProps> = ({ user }) => {
    return (
        <img
            className="w-full h-64 object-cover object-center border-r-8"
            src={user.background || DEFAULT_BACKGROUND_IMAGE}
            alt={`${user.username}'s background`}
        />
    );
}

export default UserBanner;