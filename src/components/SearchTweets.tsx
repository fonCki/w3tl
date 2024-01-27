import React, { useState, useEffect } from 'react';
import FeedTitle from '@components/feed/FeedTitle';
import FeedContainer from '@components/feed/FeedContainer';

import { Tweet } from '@models/tweet';
import TweetLine from '@components/feed/TweetLine';
import { ServiceFactory } from '@services/serviceFactory'; // Assuming this is your Tweet model

interface SearchTweetsProps {
    query: string;
}

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
                <FeedContainer key={tweet.id}>
                    <TweetLine tweet={tweet} highlightQuery={query} />
                </FeedContainer>
            ))}
            </>
            }
        </div>
    );
};

export default SearchTweets;
