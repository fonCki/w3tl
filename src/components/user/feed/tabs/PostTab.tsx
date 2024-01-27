import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
interface PostsTabProps {
    username: string;
}


const PostsTab: React.FC<PostsTabProps> = ({ username }) => {
    const [posts, setPosts] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await tweetService.getTweetsByUserNickname(username);
                if (posts) {
                    setPosts(posts);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, [username]);

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
