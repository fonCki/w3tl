import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';
import { Tweet } from '@models/tweet';
import { TweetOrReply } from '@models/tweetOrReply';
import { useNavigate } from 'react-router-dom';

interface TweetSummaryProps {
    tweetOrReply: TweetOrReply;
}

const PostHeader: React.FC<TweetSummaryProps> = ({ tweetOrReply }) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(`/user/${tweetOrReply.user.username}`)} className="cursor-pointer">
        <Feed.Summary>
            <span className="font-bold mr-2 text-xl">{tweetOrReply.user.name + ' ' + tweetOrReply.user.lastname}</span>
            {tweetOrReply.user.verified && <Icon name="check circle" className="text-blue ml-1" />}
            <span className="text-gray-500">@{tweetOrReply.user.username}</span>
            <span className="text-gray-500 ml-2">·</span>
            <span className="text-gray-500 ml-2">
                {formatDistanceToNow(tweetOrReply.createdAt, { addSuffix: true })}
            </span>
        </Feed.Summary>
        </div>
    );
};

export default PostHeader;
