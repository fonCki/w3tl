import React, { useState } from 'react';
import { Image, Placeholder } from 'semantic-ui-react';
import { User } from '@models/user/user';
import { getDefaultAvatarImage } from '@constants/constants';

interface ImgProps {
    userDetails: User | null;
    size?: 'micro' | 'tiny' | 'small' | 'medium' | 'large' | 'huge';
    onLoaded: () => void;
}

const Img: React.FC<ImgProps> = ({ userDetails, size = "tiny", onLoaded }) => {
    const [isLoading, setIsLoading] = useState(true); // Track image loading state
    const avatarSrc = userDetails?.avatar || getDefaultAvatarImage(userDetails?.username || 'default');
    const altText = userDetails ? `${userDetails.username}'s avatar` : 'Default user avatar';

    // Define CSS classes based on the 'size' prop
    const sizeClasses = {
        micro: 'w-10 h-10', // Example size, adjust accordingly
        tiny: 'w-14 h-14',
        small: 'w-16 h-16',
        medium: 'w-24 h-24',
        large: 'w-32 h-32',
        huge: 'w-48 h-48',
    }[size];

    const handleImageLoaded = () => {
        setIsLoading(false);
        onLoaded();
    }

    return (
        <div className={`relative rounded-full overflow-hidden ${sizeClasses}`}>
            {isLoading && (
                <Placeholder className={`absolute inset-0 rounded-full ${sizeClasses}`}>
                    <Placeholder.Image />
                </Placeholder>
            )}
            <Image
                src={avatarSrc}
                alt={altText}
                className={`absolute w-full h-full object-cover rounded-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleImageLoaded}
            />
        </div>
    );
};

export default Img;
