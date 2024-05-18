import React from 'react';
import FollowButton from '@components/ui/buttons/FollowButton';
import { HeaderButton } from '@components/ui/buttons/HeaderButton';
import { User } from '@models/user/user';
import EditButton from '@components/ui/buttons/EditButton';

/**
 * Represents the properties required to render user actions.
 *
 * @interface UserActionsProps
 */
interface UserActionsProps {
    isEditable: boolean;
    user: User;
}

/**
 * UserActions is a function component that renders a set of action buttons for a user.
 *
 * @component
 *
 * @param {object} props - The props object containing user and isEditable properties.
 * @param {object} props.user - The user object.
 * @param {boolean} props.isEditable - Flag indicating if the user is editable.
 *
 * @returns {ReactElement} The rendered component.
 */
const UserActions: React.FC<UserActionsProps> = ({ user, isEditable }) => {
    return (
        <div className="flex justify-end items-center gap-1 w-full">
            <HeaderButton iconName={'setting'} onClick={() => console.log('Settings clicked')} />
            {isEditable ? <EditButton user={user} /> : <FollowButton user={user} />}
        </div>
    );
};

export default UserActions;
