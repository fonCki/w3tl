import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import ReplyLine from '@components/feed/reply/ReplyLine';
import { Tweet } from '@models/tweet';
import { Reply } from '@models/reply';
import { defaultTweet } from '@models/defaults';
import ReplyInput from '@components/feed/reply/ReplyInput';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch } from 'react-redux';

const Post: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [tweet, setTweet] = useState<Tweet>(defaultTweet);
    const [replies, setReplies] = useState<Reply[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Fetch the tweet by ID
        const fetchTweet = async () => {
            dispatch(setDbLoading(true));
            try {
                const fetchedTweet = await tweetService.getTweetById(id!);
                if (fetchedTweet) {
                    console.log('Fetched tweet:', fetchedTweet);
                    setTweet(fetchedTweet);
                }
            } catch (error) {
                console.error('Error fetching tweet:', error);
            }
            dispatch(setDbLoading(false));
        };

        // Fetch replies for the tweet
        const fetchReplies = async () => {
            dispatch(setDbLoading(true));
            try {
                const fetchedReplies = await tweetService.getAllRepliesByTweetId(id!);
                setReplies(fetchedReplies);
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };
        fetchTweet();
        fetchReplies();
        dispatch(setDbLoading(false));
    }, [id]); // Dependency on id

    return (
        <div>
            <FeedContainer>
                <TweetLine tweet={tweet} />
            </FeedContainer>
            <FeedContainer>
                <ReplyInput />
            </FeedContainer>
            {replies.map(reply => (
                <FeedContainer key={reply.id}>
                    <ReplyLine reply={reply} />
                </FeedContainer>
            ))}
        </div>
    );
};

export default Post;
