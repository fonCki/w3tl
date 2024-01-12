import React, { useState, useEffect } from 'react';
import { tweetService } from '@services/tweetService';
import { userService } from '@services/userService';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { defaultUser } from '@models/defaults';
interface PostsTabProps {
    userId: number;
}


const PostsTab: React.FC<PostsTabProps> = ({ userId }) => {
    const [posts, setPosts] = useState<Tweet[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
              try {
                    const user = await userService.getUserById(userId);
                    if (user) {
                        const posts = await tweetService.getTweetsByUserId(user.id);
                        if (posts) {
                            setPosts(posts);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchPosts();
        }
    , [userId]);

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
