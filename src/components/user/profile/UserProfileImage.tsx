import React from 'react';
import { Image } from 'semantic-ui-react';
import { User } from '@models/user/user';
import { getDefaultAvatarImage } from '@constants/constants';
import Img from '@components/tools/image/Img';

interface UserProfileImageProps {
    userDetails: User;
    isEditable: boolean;
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({ userDetails, isEditable }) => {
    if (userDetails.avatar === undefined || userDetails.avatar === null || userDetails.avatar === '' || userDetails.avatar === 'unknown-avatar') {
        userDetails.avatar = getDefaultAvatarImage(userDetails.username);
    }
    return (
        <div className={`relative ${isEditable ? 'cursor-pointer' : ''} border-4 border-white rounded-full overflow-hidden h-32 w-32 sm:h-48 sm:w-48`}>
        <Img userDetails={userDetails} size="large" />
        </div>
    );
};

export default UserProfileImage;
