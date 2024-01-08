import React, { useState } from 'react';
import { Feed, Image } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';
import Media from '@components/feed/Media';
import TweetMeta from './TweetMeta';
import TweetDropdown from './TweetDropdown';
import TweetSummary from './TweetSummary';
import SpecialContent from '@components/feed/SpecialContent';

interface TweetLineProps {
    tweet: Tweet;
}

const TweetLine: React.FC<TweetLineProps> = ({ tweet }) => {
    // ... state and functions ...
    return (
        <Feed.Event className="max-w-xl mx-auto hover:bg-gray-200 rounded-lg">
            <Feed.Label className="mr-2">
                <Image src={tweet.user.avatar} avatar className="min-w-14 text-9xl" />
            </Feed.Label>
            <Feed.Content>
                <div className="flex justify-between">
                    <TweetSummary tweet={tweet} />
                    <TweetDropdown />
                </div>
                <Feed.Extra className="text-lg w-full">
                    <SpecialContent content={tweet.content} /> {/* Pass the actual users data */}
                </Feed.Extra>
                {tweet.image && <Media imageUrl={tweet.image} />}
                {tweet.video && <Media videoUrl={tweet.video} />}
                <TweetMeta
                    tweet={tweet}
                    onLike={handleLikeClick}
                    onRetweet={handleLikeClick}
                    onComment={handleLikeClick}
                />
            </Feed.Content>
        </Feed.Event>
    );
};


//create handle click to console log
const handleLikeClick = () => {
    console.log('Like');
}

export default TweetLine;
