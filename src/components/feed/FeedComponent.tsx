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
                const user = userService.getUserById(tweet.user);
                if (!user) {
                    // Return a default user object if user is not found
                    return {
                        ...tweet,
                        user: {
                            id: tweet.user,
                            username: '',
                            verified: false,
                            avatar: '',
                            email: '',
                            name: '',
                            lastname: '',
                            createdAt: new Date() // Default Date for createdAt
                        },
                        createdAt: new Date(tweet.createdAt) // Convert createdAt string to Date object
                    };
                }

                // Ensure the user object matches the User interface
                return {
                    ...tweet,
                    user: {
                        ...user,
                        createdAt: new Date(user.createdAt) // Convert createdAt string to Date object
                    },
                    createdAt: new Date(tweet.createdAt)
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
