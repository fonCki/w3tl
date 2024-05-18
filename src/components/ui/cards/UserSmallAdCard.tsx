import React, { useEffect, useState } from 'react';
import { Card, Image, Icon, CardContent, CardDescription } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';
import { DEFAULT_BACKGROUND_IMAGE, getDefaultAvatarImage } from '@constants/constants'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import SpecialContent from '../../../features/feed/components/SpecialContent';
import formatNumber from '@utils/formatNumber';
import { User } from '@models/user/user';
import FollowButton from '@components/ui/buttons/FollowButton';
import UserSmallAdCardPlaceholder from '../../../features/user/placeholders/UserSmallAdCardPlaceholder';


/**
 * Represents the properties of the UserSmallAdCard component.
 */
interface UserSmallAdCardProps {
    user: User;
    showLocation?: boolean;
    showWebsite?: boolean;
    showFollowers?: boolean;
    showJoined?: boolean;
}

/**
 * React functional component representing a small card displaying user information.
 *
 * @component
 * @param {Object} UserSmallAdCardProps - The props for the UserSmallAdCard component.
 * @param {User} UserSmallAdCardProps.user - The user object to display in the card.
 * @param {boolean} [UserSmallAdCardProps.showLocation=true] - Controls whether to display the user's location.
 * @param {boolean} [UserSmallAdCardProps.showWebsite=true] - Controls whether to display the user's website.
 * @param {boolean} [UserSmallAdCardProps.showFollowers=true] - Controls whether to display the user's follower count.
 * @param {boolean} [UserSmallAdCardProps.showJoined=true] - Controls whether to display the user's join date.
 *
 * @returns {JSX.Element} - The rendered UserSmallAdCard component.
 */
const UserSmallAdCard: React.FC<UserSmallAdCardProps> = ({
                                                             user,
                                                             showLocation = true,
                                                             showWebsite = true,
                                                             showFollowers = true,
                                                             showJoined = true,
                                                         }: {
    user: User;
    showLocation?: boolean;
    showWebsite?: boolean;
    showFollowers?: boolean;
    showJoined?: boolean;
}): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    const isUserFull = (user: User): user is User => {
        return 'followersCount' in user;
    };
    const handleCardClick = () => {
        navigate(`/user/${user.username}`);
    };

    const handlePostHeaderLoaded = () => {
        setIsLoading(false);
    };


    return (
        <>
            {/* Placeholder Content - Visible only when isLoading is true */}
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                <UserSmallAdCardPlaceholder />
            </div>
            {/* Final Content - Visible only when isLoading is false */}
            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
                <Card className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="relative w-full h-52 ">
                        <Image
                            src={user.avatar || getDefaultAvatarImage(user.username)}
                            className="w-full h-52 object-cover object-center"
                            alt={`${user.username}'s avatar`}
                            onClick={handleCardClick}
                            onLoad={handlePostHeaderLoaded}
                        />
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                            <FollowButton user={user} blackAndWhite={true} />
                        </div>
                    </div>
                    <Card.Content className="px-6 py-4 cursor-pointer" onClick={handleCardClick}>
                        <Card.Header className="font-bold text-xl mb-2">
                            {user.name}
                            {/*space blank*/}&nbsp;
                            {user.verified && <Icon name="check circle" color="blue" className="ml-2" />}
                        </Card.Header>
                        <Card.Meta className="text-gray-700 text-base">
                            <span>@{user.username}</span>
                        </Card.Meta>
                        {isUserFull(user) && (
                            <Card.Description className="w-full h-14 overflow-hidden">
                                <SpecialContent content={user.bio!} textStyle={'italic'} limitThreeLines={true}
                                                textSize={14} />
                            </Card.Description>)}

                        {isUserFull(user) && (
                            <CardContent className="flex flex-col items-start flex-wrap ">
                                {showLocation && user.location && (

                                    <div className="flex items-center space-x-2 gap-2">
                                        <span className="material-icons text-gray-400 text-base">location_on</span>
                                        <p className="text-gray-500 text-sm">{user.location}</p>
                                    </div>
                                )}
                                {showWebsite && user.website && (
                                    <div className="flex items-center space-y-2 gap-2 overflow-hidden">
                                        <span className="material-icons text-blue-400 text-base">link</span>
                                        <p className="text-blue-400 hover:underline text-sm">
                                            <a href={user.website} target="_blank"
                                               rel="noopener noreferrer">{user.website}</a>
                                        </p>
                                    </div>
                                )}
                            </CardContent>)}
                    </Card.Content>

                    {isUserFull(user) && (showJoined || showFollowers && (
                            <Card.Content extra>
                                {showJoined && (
                                    <div className="flex items-center space-x-2 gap-2">
                                        <span className="material-icons text-gray-400 text-base">event</span>
                                        <p className="text-gray-500 text-sm">Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: false })}</p>
                                    </div>
                                )}
                                {showFollowers && (
                                    <div className="flex items-center space-x-2 gap-2">
                                        <span className="material-icons text-gray-400 text-base">group</span>
                                        <p className="text-gray-500 text-sm">{formatNumber(user.followersCount)} Followers</p>
                                    </div>)}
                            </Card.Content>)
                    )}
                </Card>
            </div>
        </>
    );
};

export default UserSmallAdCard;
