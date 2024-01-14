import React from 'react';
import { Image } from 'semantic-ui-react';
import { getDefaultAvatarImage } from '@constants/constants';

interface ImgProps {
    userDetails: {
        username: string;
        avatar?: string;
    };
    size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive' | number;
}

const Img: React.FC<ImgProps> = ({ userDetails, size = "medium" }) => {
    let avatarSrc = userDetails.avatar;

    if (!avatarSrc || avatarSrc === 'unknown-avatar') {
        avatarSrc = getDefaultAvatarImage(userDetails.username);
    }

    const isSizeNumeric = typeof size === 'number';

    return (

        <div className="avatar-container"  style={{ width: isSizeNumeric ? size*2.1 : undefined }}>
            <Image
                className="w-full h-full object-cover object-center"
                src={avatarSrc}
                alt={`${userDetails.username}'s avatar`}
                avatar
                size={isSizeNumeric ? undefined : size}
                style={isSizeNumeric ? { fontSize: size } : undefined}
            />
        </div>
    );
}

export default Img;
