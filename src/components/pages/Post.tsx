import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FeedContainer from '@components/feed/FeedContainer';
import TweetLine from '@components/feed/TweetLine';
import ReplyLine from '@components/feed/reply/ReplyLine';
import { tweetService } from '@services/tweetService';
import { Tweet } from '@models/tweet';
import { Reply } from '@models/reply';
import { defaultTweet } from '@models/defaults';
import ReplyInput from '@components/feed/reply/ReplyInput';

const Post: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [tweet, setTweet] = useState<Tweet>(defaultTweet);
    const [replies, setReplies] = useState<Reply[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Validate and parse id to an integer
        if (!id || !/^\d+$/.test(id)) {
            //TODO navigate to 404 page
            console.error("Invalid or missing id");
            return;
        }
        const parsedId = parseInt(id, 10);

        // Fetch the tweet by ID
        const fetchTweet = async () => {
            try {
                const fetchedTweet = await tweetService.getTweetById(parsedId);
                if (fetchedTweet) {
                    setTweet(fetchedTweet);
                }
            } catch (error) {
                console.error('Error fetching tweet:', error);
            }
        };

        // Fetch replies for the tweet
        const fetchReplies = async () => {
            try {
                const fetchedReplies = await tweetService.getAllReplysByTweetId(parsedId);
                setReplies(fetchedReplies);
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };

        fetchTweet();
        fetchReplies();
    }, [id]); // Dependency on id

    return (
        <div>
            <FeedContainer>
                <TweetLine tweet={tweet} />
            </FeedContainer>
            <FeedContainer>
                <ReplyInput />
            </FeedContainer>

            {replies.map(reply => (
                <FeedContainer key={reply.id}>
                    <ReplyLine reply={reply} />
                </FeedContainer>
            ))}
        </div>
    );
};

export default Post;
