import { UserDetails } from '@models/userDetails';
import UserBanner from '@components/user/UserBanner';
import UserProfileImage from '@components/user/UserProfileImage';
import UserActions from '@components/user/UserActions';
import UserInfoDetails from '@components/user/UserInfoDetails';
import UserSocialInfo from '@components/user/UserSocialInfo';
import UserNameAndUserName from '@components/user/UserNameAndUserName';

interface UserCardProps {
    userDetails: UserDetails;
    isEditable?: boolean;
};

const UserCard: React.FC<UserCardProps> = ({ userDetails, isEditable = false }) => {
    return (
        <div className="relative p-2">
            <UserBanner userDetails={userDetails} />
            <div className="absolute top-52 left-6 sm:top-40">
                <UserProfileImage userDetails={userDetails} isEditable={isEditable} />
            </div>
            <div className="h-20  flex pr-4  sm:gap-3">
                <UserActions />
            </div>
            <div className="pl-4 sm:p-4">
                <UserNameAndUserName userDetails={userDetails} isEditable={isEditable} />
                <UserInfoDetails userDetails={userDetails} isEditable={isEditable} />
                <UserSocialInfo userDetails={userDetails} />
            </div>
        </div>
    );
};

export default UserCard;
