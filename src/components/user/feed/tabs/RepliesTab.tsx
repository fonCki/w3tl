import React, { useState, useEffect } from 'react';
import { tweetService } from '@services/tweetService';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import ReplyLine from '@components/feed/reply/ReplyLine';
import { Tweet } from '@models/tweet';
import { Reply } from '@models/reply';
import { Divider } from 'semantic-ui-react';
import FeedSpacer from '@components/feed/FeedSpacer';

interface RepliesTabProps {
    userId: number;
}

const RepliesTab: React.FC<RepliesTabProps> = ({ userId }) => {
    const [replies, setReplies] = useState<Reply[]>([]);
    const [parentTweets, setParentTweets] = useState<Map<number, Tweet>>(new Map());
    const [groupedReplies, setGroupedReplies] = useState<Map<number, Reply[]>>(new Map());

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const replies = await tweetService.getAllReplyByUserId(userId);
                if (replies) {
                    setReplies(replies);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchReplies();
    }, [userId]);

    useEffect(() => {
        // Group replies by parent tweet ID
        const tempGroupedReplies: Map<number, Reply[]> = new Map();
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
            const parentTweets: Map<number, Tweet> = new Map();
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