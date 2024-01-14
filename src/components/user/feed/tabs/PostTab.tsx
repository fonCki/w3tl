import React, { useState, useEffect } from 'react';
import { tweetService } from '@services/tweetService';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
interface PostsTabProps {
    userId: number;
}


const PostsTab: React.FC<PostsTabProps> = ({ userId }) => {
    const [posts, setPosts] = useState<Tweet[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await tweetService.getTweetsByUserId(userId);
                if (posts) {
                    setPosts(posts);
                }
            } catch (error) {
                console.error(error);
            }
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
