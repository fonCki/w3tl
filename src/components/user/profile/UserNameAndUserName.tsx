import React from 'react';
import { Icon } from 'semantic-ui-react';
import { UserFull as UserDetailsType } from '@models/user/userFull';


interface UserDetailsProps {
    userDetails: UserDetailsType;
    isEditable: boolean;
}

const UserNameAndUserName: React.FC<UserDetailsProps> = ({ userDetails, isEditable }) => {
    return (
        <div>
            <div className="mt-2 mb-2">
                <span className="font-bold mr-2 text-xl sm:text-3xl">{userDetails.name + ' ' + userDetails.lastname}</span>
                {userDetails.verified && <Icon name="check circle" color="blue" />}<br></br>
                <span className="text-gray-500 text-base sm:text-lg">@{userDetails.username}</span>
            </div>
        </div>
    );
};

export default UserNameAndUserName;