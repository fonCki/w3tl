import React from 'react';
import { Image } from 'semantic-ui-react';
import { UserDetails } from '@models/userDetails';
import { getDefaultAvatarImage } from '@constants/constants';

interface UserProfileImageProps {
    userDetails: UserDetails;
    isEditable: boolean;
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({ userDetails, isEditable }) => {
    return (
        <div className={`relative ${isEditable ? 'cursor-pointer' : ''} border-4 border-white rounded-full overflow-hidden h-32 w-32 sm:h-48 sm:w-48`}>
            <Image
                className="w-full h-full object-cover object-center"
                src={userDetails.avatar || getDefaultAvatarImage(userDetails.username)}
                alt={`${userDetails.username}'s avatar`}
                avatar
                size="large"
            />
            {/* Add edit icon or functionality here if isEditable */}
        </div>
    );
};

export default UserProfileImage;
