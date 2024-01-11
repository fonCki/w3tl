import React from 'react';
import FollowButton from '@components/buttons/FollowButton';
import { HeaderButton } from '@components/buttons/HeaderButton';

const UserActions: React.FC = () => {
    return (
        <div className="flex justify-end items-center gap-1 w-full">
            <HeaderButton iconName={'setting'} onClick={() => console.log('Settings clicked')} />
            <FollowButton />
        </div>
    );
};

export default UserActions;
