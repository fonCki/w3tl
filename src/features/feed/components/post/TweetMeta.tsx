import React, { useEffect, useState } from 'react';
import { Tweet } from '@models/post/tweet';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import {
    resetNewComment,
    resetNewHighlight,
    resetNewLike,
    setNewHighlight,
    setNewLike,
} from '@store/slices/notificationsSlice';
import ShareModal from '../../../modals/ShareModal';

/**
 * Represents the metadata properties of a Tweet.
 *
 * @interface TweetMetaProps
 */
interface TweetMetaProps {
    tweet: Tweet;
}


/**
 * TweetMeta component displays the meta information of a tweet, including like status, retweet status,
 * comment status, highlight status, and actions to interact with the tweet.
 *
 * @component
 * @param {object} props - The props object containing the tweet information.
 * @param {object} props.tweet - The tweet object.
 * @returns {JSX.Element} - The rendered TweetMeta component.
 */
const TweetMeta: React.FC<TweetMetaProps> = ({ tweet }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);
    const [isCommented, setIsCommented] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const tweetService = ServiceFactory.getTweetService();
    const tweetActionService = ServiceFactory.getTweetActionService();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();
    const {newLike, newRetweet, newComment, newHighlight} = useSelector((state: RootState) => state.notifications);
    const [likes, setLikes] = useState(tweet.likes); // Manage likes with state
    const [comments, setComments] = useState(tweet.comments); // Manage comments with state
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        async function fetchData() {
            if (currentUser) {
                setIsLiked(await tweetService.isTweetLikedByUser(currentUser.userId!, tweet.postId));
                dispatch(resetNewLike());
                const likes = await tweetService.getTweetLikesCount(tweet.postId);
                setLikes(likes);
            }
        }
        fetchData();
    }, [newLike, tweet, currentUser]);

    useEffect(() => {
        async function fetchData() {
            if (currentUser) {
                setIsHighlighted(await tweetService.isTweetHighlightedByUser(currentUser.userId!, tweet.postId));
                dispatch(resetNewHighlight());
            }
        }
        fetchData();
    }, [newHighlight, tweet, currentUser]);


    useEffect(() => {
        async function fetchData() {
            if (currentUser) {
                setIsCommented(await tweetService.isTweetCommentedByUser(currentUser.userId!, tweet.postId));
                dispatch(resetNewComment());
                const comments = await tweetService.getHowManyCommentsByTweetId(tweet.postId);
                setComments(comments);
            }
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
            const result = await tweetActionService.likeTweet(currentUser!.userId!, tweet.postId, token!);
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
            const result = await tweetActionService.highlightTweet(currentUser!.userId!, tweet.postId, token!);
            // Check the result; if there's an error, revert the change
            if (!result.success) {
                setIsHighlighted(!optimisticIsHighlighted); // Revert highlight state on failure
            } else {
                dispatch(setNewHighlight(true)); // Optional: Consider how you manage global state here
            }
        } catch (error) {
            // If an error occurs, revert to the original state
            setIsHighlighted(!optimisticIsHighlighted);
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