import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeedContainer from '../features/feed/components/FeedContainer';
import TweetLine from '../features/feed/components/post/TweetLine';
import ReplyLine from '../features/feed/components/reply/ReplyLine';
import { Tweet } from '@models/post/tweet';
import { Comment } from '@models/post/comment';
import { defaultTweet } from '@models/defaults';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import ReplyInput from '../features/feed/components/reply/ReplyInput';
import { RootState } from '@store/store';
import { resetNewComment } from '@store/slices/notificationsSlice';
import TweetLinePlaceHolder from '../features/feed/components/post/TweetLinePlaceHolder';

/**
 * Represents a React functional component for displaying a single post.
 * @function
 * @returns {React.ReactNode} - The rendered post component.
 */
const Post: React.FC = () => {
    const { postId } = useParams<{ postId?: string }>();
    const [tweet, setTweet] = useState<Tweet>(defaultTweet);
    const [replies, setReplies] = useState<Comment[]>([]);
    const { newComment } = useSelector((state: RootState) => state.notifications);
    const tweetService = ServiceFactory.getTweetService();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Fetch the tweet by ID
        const fetchTweet = async () => {
            setIsLoading(true);
            try {
                console.log('Fetching tweet:', postId);
                const fetchedTweet = await tweetService.getTweetById(postId!);
                if (fetchedTweet) {
                    console.log('Fetched tweet:', fetchedTweet);
                    setTweet(fetchedTweet);
                }
            } catch (error) {
                console.error('Error fetching tweet:', error);
            } finally {
                setIsLoading(false);
            }
        };

        // Fetch replies for the tweet
        const fetchReplies = async () => {
            setIsLoading(true);
            try {
                const fetchedReplies = await tweetService.getAllCommentsByTweetId(postId!);
                setReplies(fetchedReplies);
            } catch (error) {
                console.error('Error fetching replies:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTweet();
        fetchReplies();
    }, [postId]); // Dependency on id

    useEffect(() => {
        // Fetch replies for the tweet
        const fetchReplies = async () => {
            try {
                const fetchedReplies = await tweetService.getAllCommentsByTweetId(postId!);
                dispatch(resetNewComment());
                setReplies(fetchedReplies);
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };
        fetchReplies();

    }, [newComment]);

    return (
        <>
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, index) =>
                    <TweetLinePlaceHolder key={index} />)}
            </div>
            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
                <div>
                    <FeedContainer>
                        <TweetLine tweet={tweet!} />
                    </FeedContainer>
                    <FeedContainer>
                        <ReplyInput tweetId={postId!} />
                    </FeedContainer>
                    {replies.map(reply => (
                        <FeedContainer key={reply.postId} decoration={false}>
                            <ReplyLine reply={reply} />
                        </FeedContainer>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Post;
