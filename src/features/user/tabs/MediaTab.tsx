import React, { useEffect, useState } from 'react';
import FeedContainer from '../../feed/components/FeedContainer';
import { validateImageUrl, validateVideoUrl } from '@utils/mediaValidator';
import { Tweet as OriginalTweet } from '@models/post/tweet';
import Thumbnail from '@components/tools/image/Thumbnail';
import { ServiceFactory } from '@services/serviceFactory';

/**
 * Represents an extended tweet with additional properties.
 * @interface
 * @extends OriginalTweet
 */
interface ExtendedTweet extends OriginalTweet {
    isValidImage?: boolean;
    isValidVideo?: boolean;
}

/**
 * Represents the properties for the MediaTab component.
 */
interface MediaTabProps {
    userId: string;
}

/**
 * React functional component for rendering a media tab.
 *
 * @component
 * @param {object} props - The props for the MediaTab component.
 * @param {string} props.userId - The ID of the user.
 * @returns {JSX.Element} The rendered MediaTab component.
 */
const MediaTab: React.FC<MediaTabProps> = ({ userId }) => {
    const [mediaTweets, setMediaTweets] = useState<ExtendedTweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();


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
                    <div key={tweet.postId}>
                        {tweet.isValidImage && tweet.mediaUrl && (
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
