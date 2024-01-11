import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '@components/user/User';
import TweetLine from '@components/feed/TweetLine';
import FeedContainer from '@components/feed/FeedContainer';
import { userService } from '@services/userService';
import { tweetService } from '@services/tweetService';
import { UserDetails } from '@models/userDetails';
import { Tweet } from '@models/tweet';

const UserProfile = () => {
    const { username } = useParams<{ username: string }>();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        //go up to the top of the page
    }, []);

    useEffect(() => {
        const fetchUserDetailsAndTweets = async () => {
            if (username) {
                const user = await userService.getUserByUsername(username);
                if (user) {
                    const details = userService.getUserDetails(user.id);
                    if (details) {
                        setUserDetails({
                            ...details,
                            createdAt: new Date(details.createdAt) // Convert to Date if necessary
                        });
                    }
                    const userTweets = tweetService.getTweetsByUserId(user.id);

                    const tweetsWithUserDetails = userTweets.map(tweet => {
                        const userDetails = userService.getUserById(tweet.user);
                        if (userDetails) {
                            return {
                                ...tweet,
                                user: {
                                    ...userDetails,
                                    createdAt: new Date(userDetails.createdAt) // Ensure createdAt is a Date object
                                },
                                createdAt: new Date(tweet.createdAt) // Convert tweet's createdAt to Date
                            };
                        } else {
                            // Provide default values for User type
                            return {
                                ...tweet,
                                user: {
                                    id: tweet.user,
                                    username: 'Unknown',
                                    avatar: 'default-avatar.png',
                                    verified: false,
                                    createdAt: new Date() // Default date if userDetails not found
                                },
                                createdAt: new Date(tweet.createdAt)
                            };
                        }
                    });
                    setTweets(tweetsWithUserDetails);
                }
            }
        };

        fetchUserDetailsAndTweets();
    }, [username]);



    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <FeedContainer>
                <UserCard userDetails={userDetails} />
            </FeedContainer>
                {tweets.map(tweet => (
                    <FeedContainer key={tweet.id}>
                    <TweetLine key={tweet.id} tweet={tweet} />
                    </FeedContainer>
                ))}

        </div>
    );
};

export default UserProfile;
