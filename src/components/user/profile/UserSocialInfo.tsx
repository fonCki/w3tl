import React from 'react';
import { User } from '@models/user/user';
import formatNumber from '@utils/formatNumber';

interface UserSocialInfoProps {
    userDetails: User;
}

const UserSocialInfo: React.FC<UserSocialInfoProps> = ({ userDetails }) => {
    return (
        <div>
            <div className="flex items-center space-x-6">
                {userDetails.followersCount !== null && userDetails.followersCount !== undefined && (
                    <div className="flex items-center">
                        <p className="text-gray-600 font-bold text-lg">{formatNumber(userDetails.followersCount)}&nbsp;
                            <span className="text-gray-400 text-sm font-thin">Followers</span></p>
                    </div>
                )}
                {userDetails.followingCount !== null && userDetails.followingCount !== undefined && (
                    <div className="flex items-center">
                        <p className="text-gray-600 font-bold text-lg">{formatNumber(userDetails.followingCount)}&nbsp;
                            <span className="text-gray-400 text-sm font-thin ">Following</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSocialInfo;
