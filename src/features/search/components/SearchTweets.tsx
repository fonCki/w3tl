import React, { useEffect, useState } from 'react';
import FeedTitle from '@features/feed/components/FeedTitle';
import FeedContainer from '@features/feed/components/FeedContainer';

import { Tweet } from '@models/post/tweet';
import TweetLine from '@features/feed/components/post/TweetLine';
import { ServiceFactory } from '@services/serviceFactory'; // Assuming this is your Tweet model

/**
 * Interface representing the props for searching tweets.
 *
 * @interface
 */
interface SearchTweetsProps {
    query: string;
}

/**
 * React functional component for searching tweets.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.query - The search query for tweets.
 *
 * @returns {ReactElement} The rendered component.
 */
const SearchTweets: React.FC<SearchTweetsProps> = ({ query }) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();


    useEffect(() => {
        const fetchTweets = async () => {
            const fetchedTweets = await tweetService.searchTweets(query);
            setTweets(fetchedTweets);
        };

        if (query) {
            fetchTweets();
        }
    }, [query]);

    return (
        <div>
            {tweets.length > 0 &&
            <><FeedTitle title="Tweets" showUser={false} />
            {tweets.map(tweet => (
                <FeedContainer key={tweet.postId}>
                    <TweetLine tweet={tweet} highlightQuery={query} />
                </FeedContainer>
            ))}
            </>
            }
        </div>
    );
};

export default SearchTweets;
