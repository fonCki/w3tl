import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
interface HighlightTabProps {
    userId: string;
}

const HighlightsTab: React.FC<HighlightTabProps> = ({ userId }) => {
    const [high, setHigh] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();

    useEffect(() => {
        const fetchHighs = async () => {
            try {
                const high = await tweetService.getAllTweetsThatUserHighlights(userId);
                if (high) {
                    setHigh(high);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchHighs();
    }, [userId]);

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
