import React, { useState, useEffect } from 'react';
import { tweetService } from '@services/tweetService';
import { userService } from '@services/userService';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { defaultUser } from '@models/defaults';
interface LikesTabProps {
    userId: number;
}


const LikedTab: React.FC<LikesTabProps> = ({ userId }) => {
    const [likes, setLikes] = useState<Tweet[]>([]);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const user = await userService.getUserById(userId);
                if (user) {
                    const likes = await tweetService.getAllTweetsThatUserLikes(user.id);
                    console.log(likes);
                    if (likes) {
                        setLikes(likes);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchLikes(); // Move this line here to call the function
    }, [userId]);

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
