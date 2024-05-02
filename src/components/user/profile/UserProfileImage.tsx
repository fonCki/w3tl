import React, { useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { User } from '@models/user/user';
import { getDefaultAvatarImage } from '@constants/constants';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setUserLoading } from '@store/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '@store/slices/authSlice';
import { RootState } from '@store/store';


const UserProfileImage: React.FC<{ user: User; isEditable: boolean }> = ({ user, isEditable }) => {
    const [avatarUrl, setAvatarUrl] = useState(user.avatar || getDefaultAvatarImage(user.username));
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userProfileService = ServiceFactory.getUserProfileService();
    const userService = ServiceFactory.getUserService();
    const dispatch = useDispatch();
    const handleEditClick = () => {
        fileInputRef.current?.click();
    };
    const token = useSelector((state: RootState) => state.auth.token);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            dispatch(setUserLoading(true));
            const result = await userProfileService.updateProfilePicture(user.userId, file, token!);
            if (result.success && result.downloadURL) {
                console.log('Profile picture updated successfully.');
                const fetchedUser = await userService.getUserById(user.userId, token!);
                dispatch(setCurrentUser({ ...fetchedUser!, avatar: result.downloadURL })); // Update the avatar URL in the Redux store
                setAvatarUrl(result.downloadURL); // Update the avatar URL in the component's state
                dispatch(setUserLoading(false));
            } else {
                console.error('Error updating profile picture:', result.error);
                dispatch(setUserLoading(false));
            }
        }
    };

    return (
        <div onClick={isEditable ? handleEditClick : undefined} className={`relative border-4 border-white rounded-full overflow-hidden h-32 w-32 sm:h-48 sm:w-48 ${isEditable ? 'cursor-pointer' : ''}`}>
            {/*//TODO change to use Img component*/}
            {/*<Img userDetails={user} size="none" />*/}
            <img src={avatarUrl} alt="User profile" className="w-full h-full object-cover"  />
            {isEditable && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Icon name="pencil" size="big" className="text-white" />
                </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
        </div>
    );
};

export default UserProfileImage;
