import React, { useEffect } from 'react';
import { Card, Image, Icon, CardContent, CardDescription } from 'semantic-ui-react';
import { UserFull } from '@models/user/userFull';
import { formatDistanceToNow } from 'date-fns';
import { DEFAULT_BACKGROUND_IMAGE, getDefaultAvatarImage } from '@constants/constants'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import SpecialContent from '@components/feed/SpecialContent';


interface UserCardProps {
    user: UserFull;
}

const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

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
                    {/*space blank*/}&nbsp;
                    {user.verified && <Icon name="check circle" color="blue" className="ml-2" />}
                </Card.Header>
                <Card.Meta className="text-gray-700 text-base">
                    <span>@{user.username}</span>
                </Card.Meta>
            {/*    <Card.Description className="w-full h-14 overflow-hidden">*/}
            {/*        <SpecialContent content={user.bio!} textStyle={'italic'} limitThreeLines={true} textSize={14}/>*/}
            {/*    </Card.Description>*/}
            {/*    <CardContent className="flex flex-col items-start flex-wrap ">*/}
            {/*        {user.location && (*/}

            {/*            <div className="flex items-center space-x-2 gap-2">*/}
            {/*                <span className="material-icons text-gray-400 text-base">location_on</span>*/}
            {/*                <p className="text-gray-500 text-sm">{user.location}</p>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*        {user.website && (*/}
            {/*            <div className="flex items-center space-y-2 gap-2 overflow-hidden">*/}
            {/*                <span className="material-icons text-blue-400 text-base">link</span>*/}
            {/*                <p className="text-blue-400 hover:underline text-sm">*/}
            {/*                    <a href={user.website} target="_blank"*/}
            {/*                       rel="noopener noreferrer">{user.website}</a>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </CardContent>*/}
            {/*</Card.Content>*/}
            {/*<Card.Content extra>*/}
            {/*    <div className="flex items-center space-x-2 gap-2">*/}
            {/*        <span className="material-icons text-gray-400 text-base">event</span>*/}
            {/*        <p className="text-gray-500 text-sm">Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: false })}</p>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center space-x-2 gap-2">*/}
            {/*        <span className="material-icons text-gray-400 text-base">group</span>*/}
            {/*        <p className="text-gray-500 text-sm">{formatNumber(user.followersCount)} Followers</p>*/}
            {/*    </div>*/}
            </Card.Content>
        </Card>
    );
};

export default UserSmallAdCard;
