import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { resetNewLike, resetNewHighlight, setNewHighlight, setNewLike } from '@store/slices/notificationsSlice';

interface TweetMetaProps {
    tweet: Tweet;
}

const TweetMeta: React.FC<TweetMetaProps> = ({ tweet }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);
    const [isCommented, setIsCommented] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const tweetActionService = ServiceFactory.getTweetActionService();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const dispatch = useDispatch();
    const {newLike, newRetweet, newComment, newHighlight} = useSelector((state: RootState) => state.notifications);
    const [likes, setLikes] = useState(tweet.likes); // Manage likes with state



    useEffect(() => {
        async function fetchData() {
            setIsLiked(await tweetActionService.isTweetLikedByUser(currentUser?.id!, tweet.id));
            console.log("liked", isLiked);
            dispatch(resetNewLike());
            const likes = await tweetActionService.getTweetLikesCount(tweet.id);
            setLikes(likes);
            console.log("likes", tweet.id, likes);
        }
        fetchData();
    }, [newLike]);

    useEffect(() => {
        async function fetchData() {
            setIsHighlighted(await tweetActionService.isTweetHighlightedByUser(currentUser?.id!, tweet.id));
            console.log("highlighted", isHighlighted);
            dispatch(resetNewHighlight());
        }
        fetchData();
    }, [newHighlight]);



    const onLike = async () => {
        // Optimistically toggle the like state and update the likes count
        const optimisticIsLiked = !isLiked;
        const optimisticLikes = optimisticIsLiked ? likes + 1 : likes - 1;

        setIsLiked(optimisticIsLiked);
        setLikes(optimisticLikes);

        try {
            // Attempt to perform the like/unlike action
            const result = await tweetActionService.likeTweet(currentUser?.id!, tweet.id);
            // If the action fails or doesn't match the optimistic update, correct the UI
            if (!result.success) {
                setIsLiked(!optimisticIsLiked); // Revert isLiked state
                setLikes(likes); // Revert likes count
            } else {
                dispatch(setNewLike(true));
            }
        } catch (error) {
            // If there's an error, revert to the previous state
            setIsLiked(!optimisticIsLiked);
            setLikes(likes);
            console.error('Error performing like action:', error);
            // Handle error (show a message, log, etc.)
        }
    };


    const onRetweet = async () => {
        // await tweetActionService.retweet(currentUser?.id!, tweet.id);
    }

    const onComment = async () => {
        // await tweetActionService.commentOnTweet(currentUser?.id!, tweet.id);
    }

    const onHighlight = async () => {
        // Optimistically toggle the highlight state
        const optimisticIsHighlighted = !isHighlighted;
        setIsHighlighted(optimisticIsHighlighted);

        try {
            // Perform the highlight/unhighlight action
            const result = await tweetActionService.highlightTweet(currentUser?.id!, tweet.id);
            // Check the result; if there's an error, revert the change
            if (!result.success) {
                setIsHighlighted(!optimisticIsHighlighted); // Revert highlight state on failure
            } else {
                dispatch(setNewHighlight(true)); // Optional: Consider how you manage global state here
            }
        } catch (error) {
            // If an error occurs, revert to the original state
            setIsHighlighted(!optimisticIsHighlighted);
            console.error('Error performing highlight action:', error);
            // Handle error (show a message, log, etc.)
        }
    };


    return (
        <div className="flex justify-around items-center w-full mt-4">
            <div onClick={onLike}>
                <Icon link name="heart" color={isLiked ? 'red' : undefined} />
                {likes}
            </div>
            <div onClick={onRetweet}>
                <Icon link name="retweet" color={isRetweeted ? 'green' : undefined} />
                {tweet.retweets}
            </div>
            <div onClick={onComment}>
                <Icon link name="comment" color={isCommented ? 'orange' : undefined} />
                {tweet.comments}
            </div>
            <div onClick={onHighlight}>
                <Icon link name="bookmark" color={isHighlighted ? 'yellow' : undefined} />
            </div>
            <Icon link name="share" />
        </div>
    );
};

export default TweetMeta;
