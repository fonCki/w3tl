import React from 'react';
import FollowButton from '@components/buttons/FollowButton';
import { HeaderButton } from '@components/buttons/HeaderButton';
import { User } from '@models/user/user';
import EditButton from '@components/buttons/EditButton';
interface UserActionsProps {
    isEditable: boolean;
    user: User;
}



const UserActions: React.FC<UserActionsProps> = ({ user, isEditable }) => {
    return (
        <div className="flex justify-end items-center gap-1 w-full">
            <HeaderButton iconName={'setting'} onClick={() => console.log('Settings clicked')} />
            {isEditable ? <EditButton user={user} /> : <FollowButton  user={user}/>}
        </div>
    );
};

export default UserActions;
