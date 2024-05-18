import React, { useEffect, useState } from 'react';
import FeedContainer from '../../feed/components/FeedContainer';
import TweetLine from '../../feed/components/post/TweetLine';
import { Tweet } from '@models/post/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch } from 'react-redux';
import TweetLinePlaceHolder from '../../feed/components/post/TweetLinePlaceHolder';

/**
 * Represents the properties for the LikesTab component.
 *
 * @interface LikesTabProps
 */
interface LikesTabProps {
    userId: string;
}


/**
 * Represents a React functional component for displaying a tab of liked tweets for a specific user.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.userId - The ID of the user whose liked tweets are displayed.
 * @returns {React.Element} The rendered component.
 */
const LikedTab: React.FC<LikesTabProps> = ({ userId }) => {
    const [likes, setLikes] = useState<Tweet[]>([]);
    const tweetService = ServiceFactory.getTweetService();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Track loading state


    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likes = await tweetService.getAllTweetsThatUserLikes(userId);
                if (likes) {
                    setLikes(likes);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLikes();
    }, [userId]);

    return (
        <>
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, index) =>
                    <TweetLinePlaceHolder key={index} />)}
            </div>
            <div>
                {likes.map((post) => (
                    <FeedContainer key={post.postId}>
                        <TweetLine tweet={post} />
                    </FeedContainer>
                ))}
            </div>
        </>
    );
};

export default LikedTab;
