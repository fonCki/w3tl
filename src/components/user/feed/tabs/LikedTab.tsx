import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch } from 'react-redux';
import TweetLinePlaceHolder from '@components/feed/TweetLinePlaceHolder';

interface LikesTabProps {
    userId: string;
}


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

        fetchLikes(); // Move this line here to call the function
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
