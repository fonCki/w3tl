import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import {
    resetNewLike,
    resetNewHighlight,
    setNewHighlight,
    setNewLike,
    resetNewComment,
} from '@store/slices/notificationsSlice';
import { useScreenSize } from '@hooks/useScreenSize';
import ShareModal from '@components/ShareModal';

interface TweetMetaProps {
    tweet: Tweet;
}


const TweetMeta: React.FC<TweetMetaProps> = ({ tweet }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);
    const [isCommented, setIsCommented] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const tweetService = ServiceFactory.getTweetService();
    const tweetActionService = ServiceFactory.getTweetActionService();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const dispatch = useDispatch();
    const {newLike, newRetweet, newComment, newHighlight} = useSelector((state: RootState) => state.notifications);
    const [likes, setLikes] = useState(tweet.likes); // Manage likes with state
    const [comments, setComments] = useState(tweet.comments); // Manage comments with state
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        async function fetchData() {
            console.log(currentUser?.userId, tweet.postId);
            setIsLiked(await tweetService.isTweetLikedByUser(currentUser?.userId!, tweet.postId));
            console.log("liked", isLiked);
            dispatch(resetNewLike());
            const likes = await tweetService.getTweetLikesCount(tweet.postId);
            setLikes(likes);
            console.log("likes", tweet.postId, likes);
        }
        fetchData();
    }, [newLike, tweet]);

    useEffect(() => {
        async function fetchData() {
            setIsHighlighted(await tweetService.isTweetHighlightedByUser(currentUser?.userId!, tweet.postId));
            console.log("highlighted", isHighlighted);
            dispatch(resetNewHighlight());
        }
        fetchData();
    }, [newHighlight, tweet]);


    useEffect(() => {
        async function fetchData() {
            setIsCommented(await tweetService.isTweetCommentedByUser(currentUser?.userId!, tweet.postId));
            console.log("retweeted", isRetweeted);
            dispatch(resetNewComment());
            const comments = await tweetService.getHowManyCommentsByTweetId(tweet.postId);
            setComments(comments);
            console.log("comments", tweet.postId, comments);
        }
        fetchData();
    }, [newComment, tweet]);




    const onLike = async () => {
        setIsLiked(!isLiked)
        // Optimistically toggle the like state and update the likes count
        const optimisticIsLiked = !isLiked;
        const optimisticLikes = optimisticIsLiked ? likes + 1 : likes - 1;

        setIsLiked(optimisticIsLiked);
        setLikes(optimisticLikes);

        try {
            // Attempt to perform the like/unlike action
            const result = await tweetActionService.likeTweet(currentUser?.userId!, tweet.postId);
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
        setIsHighlighted(!isHighlighted)
        // Optimistically toggle the highlight state
        const optimisticIsHighlighted = !isHighlighted;
        setIsHighlighted(optimisticIsHighlighted);

        try {
            // Perform the highlight/unhighlight action
            const result = await tweetActionService.highlightTweet(currentUser?.userId!, tweet.postId);
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

    const buttonStyle = "flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all duration-150 ease-in-out cursor-pointer";

    // Function to choose the correct icon based on the active state
    const getIconStyle = (action: string, isActive: boolean) => {
        let iconName = '';
        let colorClass = 'text-gray-700'; // Default color

        switch (action) {
            case 'like':
                iconName = isActive ? 'favorite' : 'favorite_border';
                colorClass = isActive ? 'text-red-500' : 'text-gray-700'; // Red for active like
                break;
            case 'highlight':
                iconName = isActive ? 'bookmark' : 'bookmark_border';
                colorClass = isActive ? 'text-blue' : 'text-gray-700'; // Blue for active highlight
                break;
            case 'comment':
                iconName = isActive ? 'chat' : 'chat_bubble_outline';
                colorClass = isActive ? 'text-green-500' : 'text-gray-700'; // Green for active comment
                break;
            // Additional cases for other actions
        }

        return `material-icons ${colorClass}`;
    };

    return (
        <div className="flex justify-around items-center w-full mt-4 pb-2 ">
            <div className={buttonStyle} onClick={onLike}>

                <i className={getIconStyle('like', isLiked)}>{isLiked ? 'favorite' : 'favorite_border'}</i>
                <span className="text-sm">{likes}</span>
            </div>
            {/* Other actions */}

            <div className={buttonStyle}>
                <i className="material-icons text-gray-700">autorenew</i>
                <span className="text-sm">{tweet.retweets}</span>
            </div>
            <div className={buttonStyle}>
                <i className={getIconStyle('comment', isCommented)}>{isCommented ? 'chat' : 'chat_bubble_outline'}</i>
                <span className="text-sm">{comments}</span>
            </div>
            <div className="flex items-center">


                <div onClick={onHighlight} className={buttonStyle}>
                    <i className={getIconStyle('highlight', isHighlighted)}>{isHighlighted ? 'bookmark' : 'bookmark_border'}</i>
                </div>
                <div className={buttonStyle} onClick={handleOpenModal}>
                    <i className="material-icons text-gray-700">share</i>
                </div>
                <ShareModal isOpen={isModalOpen} onClose={handleCloseModal} tweetId={tweet.postId} />
            </div>
        </div>
    );
};


export default TweetMeta;