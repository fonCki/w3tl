import React from 'react';
import { User } from '@models/user/user';
import formatNumber from '@utils/formatNumber';

interface UserSocialInfoProps {
    user: User;
}

const UserSocialInfo: React.FC<UserSocialInfoProps> = ({ user }) => {
    return (
        <div>
            <div className="flex items-center space-x-6">
                {user.followersCount !== null && user.followersCount !== undefined && (
                    <div className="flex items-center">
                        <p className="text-gray-600 font-bold text-lg">{formatNumber(user.followersCount)}&nbsp;
                            <span className="text-gray-400 text-sm font-thin">Followers</span></p>
                    </div>
                )}
                {user.followingCount !== null && user.followingCount !== undefined && (
                    <div className="flex items-center">
                        <p className="text-gray-600 font-bold text-lg">{formatNumber(user.followingCount)}&nbsp;
                            <span className="text-gray-400 text-sm font-thin ">Following</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSocialInfo;
