import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import { User } from '@models/user/user';
import { getDefaultAvatarImage, LOCAL_DEFAULT_AVATAR_IMAGE } from '@constants/constants';

/**
 * Represents the properties for an image component.
 *
 * @interface ImgProps
 */
interface ImgProps {
    userDetails: User | null;
    size?: 'micro' | 'tiny' | 'small' | 'medium' | 'large' | 'huge';
    onLoaded: () => void;
}

/**
 * React functional component that renders an image with optional loading state and size classes.
 *
 * @component
 * @param {Object} userDetails - Object containing user details such as avatar and username.
 * @param {string} size - Optional size of the image. Defaults to "tiny".
 * @param {function} onLoaded - Optional callback function to be called when the image is loaded.
 * @returns {ReactElement} The rendered image component.
 */
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
        // Check if onLoaded is a function before calling it
        if (typeof onLoaded === 'function') {
            onLoaded();
        }
    };

    return (
        <div className={`relative rounded-full overflow-hidden ${sizeClasses}`}>
            {isLoading && (
                <Image
                    src={LOCAL_DEFAULT_AVATAR_IMAGE}
                    alt="Loading..."
                    className="absolute w-full h-full object-cover rounded-full"
                    style={isLoading ? {display: 'inline'} : {display: 'none'} }
                />
            )}
            <Image
                src={avatarSrc}
                alt={altText}
                className={`absolute w-full h-full object-cover rounded-full`}
                style={isLoading ? {display: 'none'} : {display: 'inline'} }
                onLoad={handleImageLoaded}
            />
        </div>
    );
};

export default Img;
