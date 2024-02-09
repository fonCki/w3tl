import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch } from 'react-redux';
interface PostsTabProps {
    userId: string;
}


const PostsTab: React.FC<PostsTabProps> = ({ userId }) => {
    const [posts, setPosts] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(setDbLoading(true));
            try {
                const posts = await tweetService.getTweetsByUserId(userId)
                if (posts) {
                    setPosts(posts);
                }
            } catch (error) {
                console.error(error);
            }
            dispatch(setDbLoading(false));
        };
        fetchPosts();
    }, [userId]);

    return (
        <div>
            {posts.map((post) => (
                <FeedContainer key={post.id}>
                    <TweetLine tweet={post} />
                </FeedContainer>
            ))}
        </div>
    );
};

export default PostsTab;
