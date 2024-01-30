import React from 'react';
import { Image } from 'semantic-ui-react';
import { User } from '@models/user/user'; // Adjust the import path as necessary
import { getDefaultAvatarImage } from '@constants/constants';

interface ImgProps {
    userDetails: User | null;
    size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive' | number;
}

const Img: React.FC<ImgProps> = ({ userDetails, size = "medium" }) => {
    let avatarSrc;
    let altText;

    if (userDetails) {
        // If avatar is not set, use the default avatar image
        avatarSrc = userDetails.avatar || getDefaultAvatarImage(userDetails.username);
        altText = `${userDetails.username}'s avatar`;
    } else {
        // If userDetails is null, use a generic default avatar image
        avatarSrc = getDefaultAvatarImage('default');
        altText = 'Default user avatar';
    }

    const isSizeNumeric = typeof size === 'number';

    return (
        <div className="avatar-container" style={{ width: isSizeNumeric ? size * 2.1 : undefined }}>
            <Image
                className="w-full h-full object-cover object-center"
                src={avatarSrc}
                alt={altText}
                avatar
                size={isSizeNumeric ? undefined : size}
                style={isSizeNumeric ? { fontSize: size } : undefined}
            />
        </div>
    );
}

export default Img;
