import React, { useEffect, useState } from 'react';
import { Feed } from 'semantic-ui-react';
import TweetLine from './TweetLine';
import { Tweet } from '@models/tweet';
import FeedContainer from './FeedContainer';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { resetNewRetweet } from '@store/slices/notificationsSlice';

const FeedComponent = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const { newTweet } = useSelector((state: RootState) => state.notifications);
    const dispatch = useDispatch();



    useEffect(() => {
        const fetchTweets = async () => {
            const tweets = await tweetService.getAllTweets();
            dispatch(resetNewRetweet());
            setTweets(tweets);
        }
        fetchTweets();
    }
    , [newTweet]);

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
