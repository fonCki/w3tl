import React from 'react';
import { Image } from 'semantic-ui-react';
import { getDefaultAvatarImage } from '@constants/constants';

// Extending the component's props to include size
interface ImgProps {
    userDetails: {
        username: string;
        avatar?: string;
    };
    size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';
}

const Img: React.FC<ImgProps> = ({ userDetails, size = "medium" }) => {
    let avatarSrc = userDetails.avatar;

    if (!avatarSrc || avatarSrc === 'unknown-avatar') {
        avatarSrc = getDefaultAvatarImage(userDetails.username);
    }

    return (
        <Image
            className="w-full h-full object-cover object-center"
            src={avatarSrc}
            alt={`${userDetails.username}'s avatar`}
            avatar
            size={size}
        />
    );
}

export default Img;
