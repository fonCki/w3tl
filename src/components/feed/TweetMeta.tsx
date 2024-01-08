import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';

interface TweetMetaProps {
    tweet: Tweet;
    onLike: () => void;
    onRetweet: () => void;
    onComment: () => void;
}

const TweetMeta: React.FC<TweetMetaProps> = ({ tweet, onLike, onRetweet, onComment }) => {
    return (
        <div className="flex justify-around items-center w-full mt-4">
            <div onClick={onLike}>
                <Icon link name="like" color={true? 'red' : undefined} />
                {tweet.likes}
            </div>
            <div onClick={onRetweet}>
                <Icon link name="retweet" color={true ? 'green' : undefined} />
                {tweet.retweets}
            </div>
            <div onClick={onComment}>
                <Icon link name="comment" color={true ? 'orange' : undefined} />
                {tweet.comments}
            </div>
            <Icon link name="bookmark" />
            <Icon link name="share" />
        </div>
    );
};

export default TweetMeta;
