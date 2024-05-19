import React, { useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { User } from '@models/user/user';
import { DEFAULT_BACKGROUND_IMAGE, LOCAL_DEFAULT_BANNER_IMAGE } from '@constants/constants'; // Assuming you have a local default image
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setBannerLoading } from '@store/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '@store/slices/authSlice';
import { RootState } from '@store/store';

/**
 * A component that represents a user banner.
 *
 * @component
 *
 * @param {object} props - The component props.
 * @param {object} props.user - The user object.
 * @param {boolean} props.isEditable - Determines if the user banner is editable.
 *
 * @returns {JSX.Element} The user banner component.
 */
const UserBanner: React.FC<{ user: User; isEditable: boolean }> = ({ user, isEditable }) => {
    const [bannerUrl, setBannerUrl] = useState(user.background || DEFAULT_BACKGROUND_IMAGE);
    const [isBannerLoaded, setIsBannerLoaded] = useState(false); // New state to track image loading
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userProfileService = ServiceFactory.getUserProfileService();
    const userService = ServiceFactory.getUserService();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);


    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            dispatch(setBannerLoading(true));
            const result = await userProfileService.updateProfileBanner(user.userId, file, token!);
            if (result.success && result.downloadURL) {
                setBannerUrl(result.downloadURL); // Update state with the new URL
                //fetch the last version of the user from the DB
                const fetchedUser = await userService.getUserById(user.userId);
                dispatch(setCurrentUser({ ...fetchedUser!, background: result.downloadURL })); // Update the user in the global state
                dispatch(setBannerLoading(false));
            } else {
                dispatch(setBannerLoading(false));
            }
        }
    };

    return (
        <div onClick={isEditable ? handleEditClick : undefined} className={`relative ${isEditable ? 'cursor-pointer' : ''}`}>
            {!isBannerLoaded && (
                // Display the local default image while the actual banner is loading
                <img
                    className="w-full h-64 object-cover object-center"
                    src={LOCAL_DEFAULT_BANNER_IMAGE}
                    alt="Default background"
                />
            )}
            <img
                className={`w-full h-64 object-cover object-center ${isBannerLoaded ? 'block' : 'hidden'}`}
                src={bannerUrl}
                alt={`${user.username}'s background`}
                onLoad={() => setIsBannerLoaded(true)} // Set isBannerLoaded to true once the image has loaded
            />
            {isEditable && (
                <div className="absolute inset-0 flex items-start justify-end p-4 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Icon name="pencil" size="big" className="text-white" />
                </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
        </div>
    );
};

export default UserBanner;
