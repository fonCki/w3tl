import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { resetNewHighlight } from '@store/slices/notificationsSlice';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import TweetLinePlaceHolder from '@components/feed/TweetLinePlaceHolder';

interface HighlightTabProps {
    userId: string;
}

const HighlightsTab: React.FC<HighlightTabProps> = ({ userId }) => {
    const [high, setHigh] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const { newHighlight } = useSelector((state: RootState) => state.notifications);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchHighs = async () => {
            console.log('fetching highs', newHighlight);
            try {
                const high = await tweetService.getAllTweetsThatUserHighlights(userId);
                if (high) {
                    dispatch(resetNewHighlight());
                    setHigh(high);
                }
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchHighs();
    }, [newHighlight]);

    return (
        <>
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, index) =>
                    <TweetLinePlaceHolder key={index} />)}
            </div>
            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
                {high.map((post) => (
                    <FeedContainer key={post.postId}>
                        <TweetLine tweet={post} />
                    </FeedContainer>
                ))}
            </div>
        </>
    );
};

export default HighlightsTab;
