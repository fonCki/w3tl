import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';
import { tweetService } from '@services/tweetService'; // import your tweet service

interface TweetMetaProps {
    tweet: Tweet;
    onLike: () => void;
    onRetweet: () => void;
    onComment: () => void;
    onHighlight: () => void;
}

const TweetMeta: React.FC<TweetMetaProps> = ({ tweet, onLike, onRetweet, onComment, onHighlight }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);
    const [isCommented, setIsCommented] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLiked(await tweetService.isTweetLikedByMe(tweet.id));
            setIsRetweeted(await tweetService.isTweetRetweetedByMe(tweet.id));
            setIsCommented(await tweetService.isTweetCommentedByMe(tweet.id));
            setIsHighlighted(await tweetService.isTweetHighlightedByMe(tweet.id));
        }

        fetchData();
    }, [tweet.id]);


    return (
        <div className="flex justify-around items-center w-full mt-4">
            <div onClick={onLike}>
                <Icon link name="heart" color={isLiked ? 'red' : undefined} />
                {tweet.likes}
            </div>
            <div onClick={onRetweet}>
                <Icon link name="retweet" color={isRetweeted ? 'green' : undefined} />
                {tweet.retweets}
            </div>
            <div onClick={onComment}>
                <Icon link name="comment" color={isCommented ? 'orange' : undefined} />
                {tweet.comments}
            </div>
            <div onClick={onHighlight}>
                <Icon link name="bookmark" color={isHighlighted ? 'yellow' : undefined} />
            </div>
            <Icon link name="share" />
        </div>
    );
};

export default TweetMeta;
