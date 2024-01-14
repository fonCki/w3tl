import React, { useState, useEffect } from 'react';
import { tweetService } from '@services/tweetService';
import FeedContainer from '@components/feed/FeedContainer';
import { validateImageUrl, validateVideoUrl } from '@utils/mediaValidator';
import { Tweet as OriginalTweet } from '@models/tweet';
import Thumbnail from '@components/tools/image/Thumbnail';

interface ExtendedTweet extends OriginalTweet {
    isValidImage?: boolean;
    isValidVideo?: boolean;
}

interface MediaTabProps {
    userId: number;
}

const MediaTab: React.FC<MediaTabProps> = ({ userId }) => {
    const [mediaTweets, setMediaTweets] = useState<ExtendedTweet[]>([]);

    useEffect(() => {
        const fetchAndValidateMediaTweets = async () => {
            try {
                const tweets = await tweetService.getTweetsWithMedia();
                const userMediaTweets = tweets.filter(tweet => tweet.user.id === userId && (tweet.image || tweet.video));

                const validatedTweets = await Promise.all(userMediaTweets.map(async tweet => {
                    const isValidImage = tweet.image ? await validateImageUrl(tweet.image) : false;
                    const isValidVideo = tweet.video ? await validateVideoUrl(tweet.video) : false;
                    return { ...tweet, isValidImage, isValidVideo };
                }));

                setMediaTweets(validatedTweets.filter(tweet => tweet.isValidImage || tweet.isValidVideo));
            } catch (error) {
                console.error(error);
            }
        };

        fetchAndValidateMediaTweets();
    }, [userId]);

    return (
        <FeedContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
                {mediaTweets.map((tweet) => (
                    <div key={tweet.id}>
                        {tweet.isValidImage && tweet.image && (
                            <Thumbnail tweet={tweet} />
                        )}
                        {/*TODO*/}
                        {/*add video*/}
                    </div>
                ))}
            </div>
        </FeedContainer>
    );
};

export default MediaTab;
