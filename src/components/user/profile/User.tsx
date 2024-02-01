import { User } from '@models/user/user';
import UserBanner from '@components/user/profile/UserBanner';
import UserProfileImage from '@components/user/profile/UserProfileImage';
import UserActions from '@components/user/profile/UserActions';
import UserInfoDetails from '@components/user/profile/UserInfoDetails';
import UserSocialInfo from '@components/user/profile/UserSocialInfo';
import UserNameAndUserName from '@components/user/profile/UserNameAndUserName';

interface UserCardProps {
    user: User;
    isEditable?: boolean;
};

const UserCard: React.FC<UserCardProps> = ({ user, isEditable = false }) => {
    return (
        <div className="relative p-2">
            <UserBanner user={user} />
            <div className="border border-t-0 border-2 border-gray-200 rounded-sm ">
            <div className="absolute top-52 left-6 sm:top-40">
                <UserProfileImage user={user} isEditable={isEditable} />
            </div>
            <div className="h-20  flex pr-4  sm:gap-3">
                <UserActions />
            </div>
            <div className="pl-4 sm:p-4">
                <UserNameAndUserName user={user} isEditable={isEditable} />
                <UserInfoDetails user={user} isEditable={isEditable} />
                <UserSocialInfo user={user} />
            </div>
            </div>
        </div>
    );
};

export default UserCard;
