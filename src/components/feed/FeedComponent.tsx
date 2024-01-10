import React, { useEffect, useState } from 'react';
import { Feed } from 'semantic-ui-react';
import TweetLine from './TweetLine';
import { tweetService } from '@services/tweetService';
import { userService } from '@services/userService';
import { Tweet } from '@models/tweet';
import FeedContainer from './FeedContainer';

const FeedComponent = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        const fetchTweets = () => {
            const fetchedTweets = tweetService.getAllTweets();
            const tweetsWithUserDetails = fetchedTweets.map(tweet => {
                const userDetails = userService.getUserDetails(tweet.user);
                return {
                    ...tweet,
                    user: userDetails || { id: tweet.user, username: '', avatar: '', verified: false },
                    createdAt: new Date(tweet.createdAt), // Convert createdAt string to Date object
                };
            });
            setTweets(tweetsWithUserDetails);
        };

        fetchTweets();
    }, []);

    return (
        <Feed>
            {tweets.map((tweet) => (
                <React.Fragment key={tweet.id}>
                    <FeedContainer>
                        <TweetLine tweet={tweet} />
                    </FeedContainer>
                </React.Fragment>
            ))}
        </Feed>
    );
};

export default FeedComponent;
