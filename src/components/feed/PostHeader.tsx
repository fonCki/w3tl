import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';
import { Tweet } from '@models/tweet';
import { TweetOrReply } from '@models/tweetOrReply';

interface TweetSummaryProps {
    tweetOrReply: TweetOrReply;
}

const PostHeader: React.FC<TweetSummaryProps> = ({ tweetOrReply }) => {
    return (
        <Feed.Summary>
            <span className="font-bold mr-2 text-xl">{tweetOrReply.user.name + ' ' + tweetOrReply.user.lastname}</span>
            {tweetOrReply.user.verified && <Icon name="check circle" className="text-blue ml-1" />}
            <span className="text-gray-500">@{tweetOrReply.user.username}</span>
            <span className="text-gray-500 ml-2">·</span>
            <span className="text-gray-500 ml-2">
                {formatDistanceToNow(tweetOrReply.createdAt, { addSuffix: true })}
            </span>
        </Feed.Summary>
    );
};

export default PostHeader;
