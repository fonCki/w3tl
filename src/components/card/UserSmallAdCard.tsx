import React, { useEffect } from 'react';
import { Card, Image, Icon, CardContent, CardDescription } from 'semantic-ui-react';
import { UserFull } from '@models/user/userFull';
import { formatDistanceToNow } from 'date-fns';
import { DEFAULT_BACKGROUND_IMAGE, getDefaultAvatarImage } from '@constants/constants'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import SpecialContent from '@components/feed/SpecialContent';
import formatNumber  from '@utils/formatNumber';


interface UserSmallAdCardProps {
    user: UserFull;
    showLocation?: boolean;
    showWebsite?: boolean;
    showFollowers?: boolean;
    showJoined?: boolean;
}

const UserSmallAdCard: React.FC<UserSmallAdCardProps> = ({
     user,
     showLocation = true,
     showWebsite = true,
     showFollowers = true,
     showJoined = true, }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/user/${user.username}`);
    };

    return (
        <Card className="max-w-sm rounded overflow-hidden shadow-lg" onClick={handleCardClick}>
            <Image
                src={user.avatar || getDefaultAvatarImage(user.username)}
                wrapped ui={false}
                className="w-full"
                alt={`${user.username}'s avatar`}
            />
            <Card.Content className="px-6 py-4">
                <Card.Header className="font-bold text-xl mb-2">
                    {user.name}
                    {/*space blank*/}&nbsp;
                    {user.verified && <Icon name="check circle" color="blue" className="ml-2" />}
                </Card.Header>
                <Card.Meta className="text-gray-700 text-base">
                    <span>@{user.username}</span>
                </Card.Meta>
                <Card.Description className="w-full h-14 overflow-hidden">
                    <SpecialContent content={user.bio!} textStyle={'italic'} limitThreeLines={true} textSize={14} />
                </Card.Description>

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
                </CardContent>
            </Card.Content>
            {showJoined || showFollowers && (
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
            </Card.Content>)}
        </Card>
    );
};

export default UserSmallAdCard;
