import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import { validateImageUrl, validateVideoUrl } from '@utils/mediaValidator';
import { Tweet as OriginalTweet } from '@models/tweet';
import Thumbnail from '@components/tools/image/Thumbnail';
import { ServiceFactory } from '@services/serviceFactory';

interface ExtendedTweet extends OriginalTweet {
    isValidImage?: boolean;
    isValidVideo?: boolean;
}

interface MediaTabProps {
    username: string;
}

const MediaTab: React.FC<MediaTabProps> = ({ username }) => {
    const [mediaTweets, setMediaTweets] = useState<ExtendedTweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();


    useEffect(() => {
        const fetchAndValidateMediaTweets = async () => {
            try {
                const tweets = await tweetService.getTweetsWithMedia();
                const userMediaTweets = tweets.filter(tweet => tweet.user.id === username && (tweet.image || tweet.video));

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
    }, [username]);

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
