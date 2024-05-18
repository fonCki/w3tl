import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { User } from '@models/user/user';
import { formatDistanceToNow } from 'date-fns';
import { BaseEntity } from '@models/post/base';

/**
 * Represents the properties of a TweetSummary component.
 */
interface TweetSummaryProps {
    tweetOrReply: BaseEntity; // Assuming TweetOrReply is correctly defined elsewhere
    user: User; // Assuming User is correctly defined elsewhere
}

/**
 * Component for rendering the header section of a post.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.tweetOrReply - The tweet or reply object.
 * @param {Object} props.user - The user object.
 *
 * @returns {ReactElement|null} The rendered component or null if user is not provided.
 */
const PostHeader: React.FC<TweetSummaryProps> = ({ tweetOrReply, user }) => {
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div onClick={() => navigate(`/user/${user.username}`)}
             className="cursor-pointer flex items-center overflow-hidden">
            <Feed.Summary className="flex items-center space-x-2 whitespace-nowrap overflow-hidden">
                <span className="font-bold text-xl truncate flex-shrink-0">{user.name}
                    <span className="hidden md:inline"> {user.lastname}</span>
                </span>
                {user.verified && <Icon name="check circle" className="text-blue flex-shrink-0" />}
                <span className="text-gray-500 truncate flex-shrink-0 hidden sm:inline ">@{user.username}</span>
                <span className="text-gray-500 flex-shrink-0">·</span>
                {/* This is the part that might be hidden if it does not fit */}
                <span className="text-gray-500 truncate flex-grow overflow-scroll">
                    {tweetOrReply && tweetOrReply.createdAt ? formatDistanceToNow(new Date(tweetOrReply.createdAt), { addSuffix: true }) : ''}
                </span>
            </Feed.Summary>
        </div>
    );
};

export default PostHeader;
