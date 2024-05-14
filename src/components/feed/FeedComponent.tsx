import React, { useEffect, useState } from 'react';
import { Feed } from 'semantic-ui-react';
import TweetLine from './TweetLine';
import { Tweet } from '@models/tweet';
import FeedContainer from './FeedContainer';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { resetNewTweet } from '@store/slices/notificationsSlice';
import TweetLinePlaceHolder from '@components/feed/TweetLinePlaceHolder';

const FeedComponent = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const { newTweet } = useSelector((state: RootState) => state.notifications);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Track loading state



    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const tweets = await tweetService.getAllTweets();
                dispatch(resetNewTweet());
                setTweets(tweets);
            } catch (error) {
                console.error('Error fetching tweets:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTweets();
    }, [newTweet]);


    return (
        <>
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, index) =>
                    <TweetLinePlaceHolder key={index} />)}
            </div>

            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
            <Feed>
                {tweets.map((tweet) => (
                    <React.Fragment key={tweet.postId}>
                        <FeedContainer>
                            <TweetLine tweet={tweet} />
                        </FeedContainer>
                    </React.Fragment>
                ))}
            </Feed>
            </div>
        </>
    );


};

export default FeedComponent;
