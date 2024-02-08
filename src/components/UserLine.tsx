import React from 'react';
import { User } from '@models/user/user'; // Adjust the import path
import { Card, Icon } from 'semantic-ui-react';
import Img from '@components/tools/image/Img';
import { useNavigate } from 'react-router-dom';
import FollowButton from '@components/buttons/FollowButton';

interface UserLineProps {
    user: User;
}

const UserLine: React.FC<UserLineProps> = ({ user }) => {
    const navigate = useNavigate();

    return (
        <Card fluid >
            <div className="bg-white rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition duration-300 flex justify-between items-center p-4">
            <div className="" onClick={() => navigate(`/user/${user.username}`)}>
                <div className="flex items-center space-x-4">

                        <Img userDetails={user} />

                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-xl">{user.name}</span>
                            <span className="hidden sm:inline text-xl">{user.lastname}</span>
                            {user.verified && <Icon name="check circle" color="blue" />}
                        </div>
                        <span className="inline text-gray-500">@{user.username}</span>
                    </div>
                </div>
            </div>
                <FollowButton  user={user} />

            </div>
        </Card>
    );
};

export default UserLine;
