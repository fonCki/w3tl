import { User } from '@models/user/user';
import UserBanner from './UserBanner';
import UserProfileImage from './UserProfileImage';
import UserActions from './UserActions';
import UserInfoDetails from './UserInfoDetails';
import UserSocialInfo from './UserSocialInfo';
import UserNameAndUserName from './UserNameAndUserName';

/**
 * Represents the properties of a user card component.
 *
 * @typedef {Object} UserCardProps
 * @property {User} user - The user object to display in the card.
 * @property {boolean} [isEditable=false] - Specifies whether the user card is editable or not. Default is false.
 */
interface UserCardProps {
    user: User;
    isEditable?: boolean;
}

/**
 * UserCard component renders a user card with various user details.
 *
 * @component
 * @example
 * // Usage:
 * // Render an editable user card:
 * <UserCard user={userData} isEditable={true} />
 *
 * // Render a non-editable user card:
 * <UserCard user={userData} isEditable={false} />
 *
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing user details.
 * @param {boolean} [props.isEditable=false] - Whether the user card is editable or not.
 *
 * @returns {JSX.Element} The rendered component.
 */
const UserCard: React.FC<UserCardProps> = ({ user, isEditable = false }) => {
    return (
        <div className="relative p-2">
            <UserBanner user={user} isEditable={isEditable} />
            <div className="border border-t-0 border-2 border-gray-200 rounded-sm ">
            <div className="absolute top-52 left-6 sm:top-40">
                <UserProfileImage user={user} isEditable={isEditable} />
            </div>
            <div className="h-20  flex pr-4  sm:gap-3">
                <UserActions user={user} isEditable={isEditable} />
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
