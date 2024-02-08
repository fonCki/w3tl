import React from 'react';
import { Image } from 'semantic-ui-react';
import { User } from '@models/user/user';
import { getDefaultAvatarImage } from '@constants/constants';

interface ImgProps {
    userDetails: User | null;
    size?: 'micro' | 'tiny' | 'small' | 'medium' | 'large' | 'huge'; // Size options
}

const Img: React.FC<ImgProps> = ({ userDetails, size = "tiny" }) => {
    const avatarSrc = userDetails?.avatar || getDefaultAvatarImage(userDetails?.username || 'default');
    const altText = userDetails ? `${userDetails.username}'s avatar` : 'Default user avatar';

    // Define CSS classes based on the 'size' prop to control the div size
    const sizeClasses = {
        micro: 'w-10 h-10', // 40x40 pixels
        tiny: 'w-14 h-14', // 48x48 pixels
        small: 'w-16 h-16', // 64x64 pixels
        medium: 'w-24 h-24', // 96x96 pixels
        large: 'w-32 h-32', // 128x128 pixels
        huge: 'w-48 h-48', // 192x192 pixels
    }[size];

    // Using Tailwind CSS for styling
    return (
        <div className={`relative rounded-full overflow-hidden ${sizeClasses}`}>
            <Image
                src={avatarSrc}
                alt={altText}
                className="absolute w-full h-full object-cover rounded-full"
            />
        </div>
    );
};

export default Img;
