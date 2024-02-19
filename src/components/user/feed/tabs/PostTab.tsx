import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch } from 'react-redux';
import TweetLinePlaceHolder from '@components/feed/TweetLinePlaceHolder';

interface PostsTabProps {
    userId: string;
}


const PostsTab: React.FC<PostsTabProps> = ({ userId }) => {
    const [posts, setPosts] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await tweetService.getTweetsByUserId(userId);
                console.log('Posts:', posts);
                if (posts) {
                    setPosts(posts);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [userId]);

    return (
        <>
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, index) =>
                    <TweetLinePlaceHolder key={index} />)}
            </div>
            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
                {posts.map((post) => (
                    <FeedContainer key={post.postId}>
                        <TweetLine tweet={post} />
                    </FeedContainer>
                ))}
            </div>
        </>
    );
};

export default PostsTab;
