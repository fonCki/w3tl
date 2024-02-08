import React, { useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { User } from '@models/user/user';
import { DEFAULT_BACKGROUND_IMAGE } from '@constants/constants';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setBannerLoading } from '@store/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '@store/slices/authSlice';
import { RootState } from '@store/store';

const UserBanner: React.FC<{ user: User; isEditable: boolean }> = ({ user, isEditable }) => {
    const [bannerUrl, setBannerUrl] = useState(user.background || DEFAULT_BACKGROUND_IMAGE);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userProfileService = ServiceFactory.getUserProfileService();
    const userService = ServiceFactory.getUserService();
    const dispatch = useDispatch();

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            dispatch(setBannerLoading(true));
            const result = await userProfileService.updateProfileBanner(user.id, file);
            if (result.success && result.downloadURL) { // Now properly typed and checked
                console.log('Banner updated successfully.');
                setBannerUrl(result.downloadURL); // Update state with the new URL
                //fetch the last version of the user from the DB
                const fetchedUser = await userService.getUserById(user.id);
                dispatch(setCurrentUser({ ...fetchedUser!, background: result.downloadURL })); // Update the user in the global state
                dispatch(setBannerLoading(false));
            } else {
                console.error('Error updating banner:', result.error);
                dispatch(setBannerLoading(false));
            }
        }
    };

    return (
        <div onClick={isEditable ? handleEditClick : undefined} className={`relative ${isEditable ? 'cursor-pointer' : ''}`}>
            <img
                className="w-full h-64 object-cover object-center"
                src={bannerUrl}
                alt={`${user.username}'s background`}
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
