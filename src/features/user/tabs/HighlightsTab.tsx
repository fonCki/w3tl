import React, { useEffect, useState } from 'react';
import FeedContainer from '../../feed/components/FeedContainer';
import TweetLine from '../../feed/components/post/TweetLine';
import { Tweet } from '@models/post/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { resetNewHighlight } from '@store/slices/notificationsSlice';
import TweetLinePlaceHolder from '../../feed/components/post/TweetLinePlaceHolder';

/**
 * Represents the properties required for rendering a highlighted tab.
 * @interface
 */
interface HighlightTabProps {
    userId: string;
}

/**
 * Represents a tab that displays highlighted tweets for a specific user.
 *
 * @typedef {Object} HighlightTabProps
 * @property {string} userId - The ID of the user.
 */
const HighlightsTab: React.FC<HighlightTabProps> = ({ userId }) => {
    const [high, setHigh] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const { newHighlight } = useSelector((state: RootState) => state.notifications);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchHighs = async () => {
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
