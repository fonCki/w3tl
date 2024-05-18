import React, { useEffect, useState } from 'react';
import FeedContainer from '@features/feed/components/FeedContainer';
import TweetLine from '@features/feed/components/post/TweetLine';
import { Tweet } from '@models/post/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch } from 'react-redux';
import TweetLinePlaceHolder from '@features/feed/components/post/TweetLinePlaceHolder';

/**
 * Represents the props for the PostsTab component.
 *
 * @interface PostsTabProps
 */
interface PostsTabProps {
    userId: string;
}

/**
 * Represents a tab for displaying user posts.
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.userId - The ID of the user whose posts will be displayed.
 * @returns {JSX.Element} - The rendered component.
 */
const PostsTab: React.FC<PostsTabProps> = ({ userId }) => {
    const [posts, setPosts] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await tweetService.getTweetsByUserId(userId);
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
