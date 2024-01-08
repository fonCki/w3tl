import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';
import { Tweet } from '@models/tweet';

interface TweetSummaryProps {
    tweet: Tweet;
}

const TweetSummary: React.FC<TweetSummaryProps> = ({ tweet }) => {
    return (
        <Feed.Summary>
            <span className="font-bold mr-2 text-xl">{tweet.user.name + ' ' + tweet.user.lastname}</span>
            {tweet.user.verified && <Icon name="check circle" className="text-blue ml-1" />}
            <span className="text-gray-500">@{tweet.user.username}</span>
            <span className="text-gray-500 ml-2">·</span>
            <span className="text-gray-500 ml-2">
                {formatDistanceToNow(tweet.createdAt, { addSuffix: true })}
            </span>
        </Feed.Summary>
    );
};

export default TweetSummary;
