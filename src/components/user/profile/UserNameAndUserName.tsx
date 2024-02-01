import React from 'react';
import { Icon } from 'semantic-ui-react';
import { User as UserDetailsType } from '@models/user/user';


interface UserDetailsProps {
    user: UserDetailsType;
    isEditable: boolean;
}

const UserNameAndUserName: React.FC<UserDetailsProps> = ({ user, isEditable }) => {
    return (
        <div>
            <div className="mt-2 mb-2">
                <span className="font-bold mr-2 text-xl sm:text-3xl">{user.name + ' ' + user.lastname}</span>
                {user.verified && <Icon name="check circle" color="blue" />}<br></br>
                <span className="text-gray-500 text-base sm:text-lg">@{user.username}</span>
            </div>
        </div>
    );
};

export default UserNameAndUserName;