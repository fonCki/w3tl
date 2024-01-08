import React from 'react';
import { Feed, Divider } from 'semantic-ui-react';
import TweetLine from './TweetLine';
import tweetsMock from '@data/tweetsMock.json';
import usersMock from '@data/usersMock.json';
import { User } from '@models/user';
import { Tweet } from '@models/tweet';

const FeedComponent = () => {
    // Function to find user details based on user ID
    const getUserDetails = (userId: number): User | undefined => {
        return usersMock.find(user => user.id === userId);
    };

    return (
        <div className="flex justify-center pt-2.5 pb-2.5">
            <Feed style={{ width: '100%', maxWidth: '600px' }}>
                {tweetsMock.map((tweetData, index) => {
                    // Find user details for each tweet
                    const userDetails = getUserDetails(tweetData.user);
                    // Convert createdAt string to Date object
                    const createdAtDate = new Date(tweetData.createdAt);

                    // Create a new Tweet object with the user details and correct date format
                    const tweetWithUser: Tweet = {
                        ...tweetData,
                        user: userDetails || { id: tweetData.user, username: '', avatar: '', verified: false},
                        createdAt: createdAtDate,
                        image: tweetData.image || undefined,
                        video: tweetData.video || undefined
                    };

                    return (
                        <React.Fragment key={tweetWithUser.id}>
                            <TweetLine tweet={tweetWithUser} />
                            {index < tweetsMock.length - 1 && <Divider />}
                        </React.Fragment>
                    );
                })}
            </Feed>
        </div>
    );
};

export default FeedComponent;
