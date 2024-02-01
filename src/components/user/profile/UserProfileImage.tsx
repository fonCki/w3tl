import React from 'react';
import { Image } from 'semantic-ui-react';
import { User } from '@models/user/user';
import { getDefaultAvatarImage } from '@constants/constants';
import Img from '@components/tools/image/Img';

interface UserProfileImageProps {
    user: User;
    isEditable: boolean;
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({ user, isEditable }) => {
    if (user.avatar === undefined || user.avatar === null || user.avatar === '' || user.avatar === 'unknown-avatar') {
        user.avatar = getDefaultAvatarImage(user.username);
    }
    return (
        <div className={`relative ${isEditable ? 'cursor-pointer' : ''} border-4 border-white rounded-full overflow-hidden h-32 w-32 sm:h-48 sm:w-48`}>
        <Img userDetails={user} size="large" />
        </div>
    );
};

export default UserProfileImage;
