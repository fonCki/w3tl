import React, { useState } from 'react';
import { User } from '@models/user/user'; // Adjust the import path
import { Card, Icon } from 'semantic-ui-react';
import Img from '@components/tools/image/Img';
import { useNavigate } from 'react-router-dom';
import FollowButton from '@components/ui/buttons/FollowButton';
import UserLinePlaceholder from '../placeholders/UserLinePlaceholder';
import { defaultUser } from '@models/defaults';
import TweetLinePlaceHolder from '../../feed/components/post/TweetLinePlaceHolder';

/**
 * Represents the properties for the UserLine component.
 */
interface UserLineProps {
    user: User;
}

/**
 * UserLine component
 * @param {Object} user - User object
 * @returns {ReactElement} - Rendered UserLine component
 */
const UserLine: React.FC<UserLineProps> = ({ user }) => {
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    const handlePostHeaderLoaded = () => {
        setIsLoading(false);
    };

    return (
        <>
            {/* Placeholder Content - Visible only when isLoading is true */}
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                <UserLinePlaceholder />
            </div>
            {/* Final Content - Visible only when isLoading is false */}
            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
                <Card fluid>
                    <div
                        className="bg-white rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition duration-300 flex justify-between items-center p-4">
                        <div className="" onClick={() => navigate(`/user/${user.username}`)}>
                            <div className="flex items-center space-x-4">
                                <Img userDetails={user} size="small" onLoaded={handlePostHeaderLoaded} />
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
                        <FollowButton user={user} />
                    </div>
                </Card>
            </div>
        </>
    );
};

export default UserLine;
