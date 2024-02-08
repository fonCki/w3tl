import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { resetNewHighlight } from '@store/slices/notificationsSlice';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
interface HighlightTabProps {
    userId: string;
}

const HighlightsTab: React.FC<HighlightTabProps> = ({ userId }) => {
    const [high, setHigh] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const { newHighlight } = useSelector((state: RootState) => state.notifications);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchHighs = async () => {
            dispatch(setDbLoading(true));
            console.log("fetching highs",newHighlight);
            try {
                const high = await tweetService.getAllTweetsThatUserHighlights(userId);
                if (high) {
                    dispatch(resetNewHighlight());
                    setHigh(high);
                }
            } catch (error) {
                console.error(error);
            }
            dispatch(setDbLoading(false));
        };
        fetchHighs();
    }, [newHighlight]);

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
