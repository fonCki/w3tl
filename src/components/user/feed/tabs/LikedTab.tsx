import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
interface LikesTabProps {
    username: string;
}


const LikedTab: React.FC<LikesTabProps> = ({ username }) => {
    const [likes, setLikes] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likes = await tweetService.getAllTweetsThatUserLikes(username);
                if (likes) {
                    setLikes(likes);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchLikes(); // Move this line here to call the function
    }, [username]);

    return (
        <div>
            {likes.map((post) => (
                <FeedContainer key={post.id}>
                    <TweetLine tweet={post} />
                </FeedContainer>
            ))}
        </div>
    );
};

export default LikedTab;
