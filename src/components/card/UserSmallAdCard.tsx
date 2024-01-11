import React, { useEffect } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { UserDetails } from '@models/userDetails';
import { formatDistanceToNow } from 'date-fns';
import { DEFAULT_BACKGROUND_IMAGE, getDefaultAvatarImage } from '@constants/constants'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';




interface UserCardProps {
    user: UserDetails;
}

const formatNumber = (num:number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

const UserSmallAdCard: React.FC<UserCardProps> = ({ user }) => {
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
                    {user.verified && <Icon name="check circle" color="blue" className="ml-2" />}
                </Card.Header>
                <Card.Meta className="text-gray-700 text-base">
                    <span>@{user.username}</span>
                </Card.Meta>
                <Card.Description className="text-gray-700 text-base">
                    {user.bio}
                </Card.Description>
                {user.location && (
                    <Card.Description className="text-gray-700 text-base mt-2">
                        <Icon name="map marker alternate" /> {user.location}
                    </Card.Description>
                )}
                {user.website && (
                    <Card.Description className="text-gray-700 text-base mt-2">
                        <Icon name="linkify" /> <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{user.website}</a>
                    </Card.Description>
                )}
            </Card.Content>
            <Card.Content extra className="px-6 py-4 bg-gray-100">
                <Card.Description className="text-gray-500 text-sm mt-2">
                    <Icon name="calendar alternate" /> Joined {formatDistanceToNow(user.createdAt, { addSuffix: true })}
                </Card.Description>
                <Card.Description className=" text-sm text-gray-50000 mt-2">
                    <Icon name="user" /> {formatNumber(user.followersCount)} Followers
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default UserSmallAdCard;
