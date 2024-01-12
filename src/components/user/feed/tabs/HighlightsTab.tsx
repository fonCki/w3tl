import React, { useState, useEffect } from 'react';
import { tweetService } from '@services/tweetService';
import { userService } from '@services/userService';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { defaultUser } from '@models/defaults';
interface HighlightTabProps {
    userId: number;
}

const HighlightsTab: React.FC<HighlightTabProps> = ({ userId }) => {
    const [high, setHigh] = useState<Tweet[]>([]);

    useEffect(() => {
        const fetchHighs = async () => {
            try {
                const user = await userService.getUserById(userId);
                if (user) {
                    const high = await tweetService.getAllTweetsThatUserHighlights(user.id)
                    if (high) {
                        setHigh(high);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
            fetchHighs();
        }
        , [userId]);
    return (
        <div>
            {high.map((post) => (
                <FeedContainer key={post.id}>
                    <TweetLine tweet={post} />
                </FeedContainer>
            ))}
        </div>
    );
};

export default HighlightsTab;
