import React, { useState, useEffect } from 'react';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import ReplyLine from '@components/feed/reply/ReplyLine';
import { Tweet } from '@models/tweet';
import { Reply } from '@models/reply';
import { Divider } from 'semantic-ui-react';
import FeedSpacer from '@components/feed/FeedSpacer';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch } from 'react-redux';

interface RepliesTabProps {
    userId: string;
}

const RepliesTab: React.FC<RepliesTabProps> = ({ userId }) => {
    const [replies, setReplies] = useState<Reply[]>([]);
    const [parentTweets, setParentTweets] = useState<Map<string, Tweet>>(new Map());
    const [groupedReplies, setGroupedReplies] = useState<Map<string, Reply[]>>(new Map());
    const tweetService = ServiceFactory.getTweetService();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchReplies = async () => {
            dispatch(setDbLoading(true));
            try {
                const replies = await tweetService.getTweetsByUserId(userId);
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
        const tempGroupedReplies: Map<string, Reply[]> = new Map();
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
                        <FeedContainer key={reply.id} decoration={false}>
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
