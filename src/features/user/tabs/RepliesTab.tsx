import React, { useEffect, useState } from 'react';
import FeedContainer from '@features/feed/components/FeedContainer';
import TweetLine from '@features/feed/components/post/TweetLine';
import ReplyLine from '@features/feed/components/reply/ReplyLine';
import { Tweet } from '@models/post/tweet';
import { Comment } from '@models/post/comment';
import FeedSpacer from '@features/feed/components/FeedSpacer';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch } from 'react-redux';

/**
 * Interface representing the props for the RepliesTab component.
 */
interface RepliesTabProps {
    userId: string;
}

/**
 * Represents a component that displays replies to a user's comments.
 *
 * @param {Object} props - The component props.
 * @param {string} props.userId - The ID of the user.
 * @returns {ReactElement} The rendered component.
 */
const RepliesTab: React.FC<RepliesTabProps> = ({ userId }) => {
    const [replies, setReplies] = useState<Comment[]>([]);
    const [parentTweets, setParentTweets] = useState<Map<string, Tweet>>(new Map());
    const [groupedReplies, setGroupedReplies] = useState<Map<string, Comment[]>>(new Map());
    const tweetService = ServiceFactory.getTweetService();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchReplies = async () => {
            dispatch(setDbLoading(true));
            try {
                const replies = await tweetService.getAllTweetsThatUserComments(userId);
                if (replies) {
                    setReplies(replies);
                }
            } catch (error) {
                console.error(error);
            }
            dispatch(setDbLoading(false));
        };

        fetchReplies();
    }, [userId]);

    useEffect(() => {
        // Group replies by parent tweet ID (string)
        const tempGroupedReplies: Map<string, Comment[]> = new Map();
        replies.forEach((reply) => {
            const parentId = reply.parentTweetId;
            if (parentId) {
                if (!tempGroupedReplies.has(parentId)) {
                    tempGroupedReplies.set(parentId, []);
                }
                tempGroupedReplies.get(parentId)?.push(reply);
            }
        });
        setGroupedReplies(tempGroupedReplies);

        // Fetch parent tweets
        const fetchParentTweets = async () => {
            dispatch(setDbLoading(true));
            const parentTweets: Map<string, Tweet> = new Map();
            for (const parentTweetId of Array.from(tempGroupedReplies.keys())) {
                try {
                    const parentTweet = await tweetService.getTweetById(parentTweetId);
                    if (parentTweet) {
                        parentTweets.set(parentTweetId, parentTweet);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            setParentTweets(parentTweets);
            dispatch(setDbLoading(false));
        };

        fetchParentTweets();
    }, [replies]);

    return (
        <div>
            {Array.from(parentTweets.keys()).map((parentTweetId) => (
                <div key={parentTweetId}>
                    <FeedContainer decoration={false}>
                        <TweetLine tweet={parentTweets.get(parentTweetId)!} />
                    </FeedContainer>
                    {groupedReplies.get(parentTweetId)?.map((reply) => (
                        <FeedContainer key={reply.postId} decoration={false}>
                            <ReplyLine reply={reply} />
                        </FeedContainer>
                    ))}
                    <FeedSpacer />
                </div>
            ))}
        </div>
    );
};

export default RepliesTab;
