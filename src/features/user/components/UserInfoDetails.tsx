import React from 'react';
import { User as UserDetailsType } from '@models/user/user';
import { Icon } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';
import SpecialContent from '../../feed/components/SpecialContent';
import { Tag } from 'primereact/tag';

/**
 * Represents the properties for the UserDetails component.
 *
 * @typedef {Object} UserDetailsProps
 * @property {UserDetailsType} user - The details of the user.
 * @property {boolean} isEditable - Indicates whether the user details are editable.
 */
interface UserDetailsProps {
    user: UserDetailsType;
    isEditable: boolean;
}

/**
 * UserInfoDetails component displays user information details.
 *
 * @param {object} user - The user object containing user details.
 * @param {boolean} isEditable - Indicates whether the user details are editable.
 *
 * @returns {React.Element} - The rendered user information details.
 */
const UserInfoDetails: React.FC<UserDetailsProps> = ({ user, isEditable }) => {
    return (
        <div>
            <div className="my-4">
                <SpecialContent content={user.bio!} textStyle={'italic'} />
            </div>

            {/* Conditional rendering for location and website */}
            <div className="flex items-center flex-wrap gap-2 my-3 sm:gap-7">
                {user.location && (
                    <div className="flex items-center space-x-2">
                        <span className="material-icons text-gray-400 text-base">location_on</span>
                        <p className="text-gray-500 text-sm">{user.location}</p>
                    </div>
                )}
                {user.website && (
                    <div className="flex items-center space-x-2">
                        <span className="material-icons text-blue-400 text-base">link</span>
                        <p className="text-blue-400 hover:underline text-sm">
                            <a href={user.website} target="_blank"
                               rel="noopener noreferrer">{user.website}</a>
                        </p>
                    </div>
                )}
            </div>

            {/* Conditional rendering for email and join date */}
            <div className="flex items-center flex-wrap gap-2 my-3 sm:gap-7">
                {user.email && (
                    <div className="flex items-center space-x-2">
                        <span className="material-icons text-gray-400 text-base">email</span>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <span className="material-icons text-gray-400 text-base">event</span>
                    <p className="text-gray-500 text-sm">Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfoDetails;
