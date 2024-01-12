import React from 'react';
import { UserDetails as UserDetailsType } from '@models/userDetails';
import { Icon } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';

interface UserDetailsProps {
    userDetails: UserDetailsType;
    isEditable: boolean;
}

const UserInfoDetails: React.FC<UserDetailsProps> = ({ userDetails, isEditable }) => {
    return (
        <div>
            <p className="text-gray-700 italic mt-4 mb-4">{userDetails.bio}</p>

            {/* Conditional rendering for location and website */}
            <div className="flex items-center flex-wrap gap-2 my-3 sm:gap-7">
                {userDetails.location && (
                    <div className="flex items-center space-x-2">
                        <span className="material-icons text-gray-400 text-base">location_on</span>
                        <p className="text-gray-500 text-sm">{userDetails.location}</p>
                    </div>
                )}
                {userDetails.website && (
                    <div className="flex items-center space-x-2">
                        <span className="material-icons text-blue-400 text-base">link</span>
                        <p className="text-blue-400 hover:underline text-sm">
                            <a href={userDetails.website} target="_blank"
                               rel="noopener noreferrer">{userDetails.website}</a>
                        </p>
                    </div>
                )}
            </div>

            {/* Conditional rendering for email and join date */}
            <div className="flex items-center flex-wrap gap-2 my-3 sm:gap-7">
                {userDetails.email && (
                    <div className="flex items-center space-x-2">
                        <span className="material-icons text-gray-400 text-base">email</span>
                        <p className="text-gray-500 text-sm">{userDetails.email}</p>
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <span className="material-icons text-gray-400 text-base">event</span>
                    <p className="text-gray-500 text-sm">Joined {formatDistanceToNow(new Date(userDetails.createdAt), { addSuffix: true })}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfoDetails;
