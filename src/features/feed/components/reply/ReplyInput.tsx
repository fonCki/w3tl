import React, { useState } from 'react';
import { Label } from 'semantic-ui-react';
import Img from '@components/tools/image/Img';
import { MAX_COMMENT_LENGTH } from '@constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { ServiceFactory } from '@services/serviceFactory';
import { setNewComment } from '@store/slices/notificationsSlice';

/**
 * Represents the props for ReplyInput component.
 */
interface ReplyInputProps {
    tweetId: string; // Correctly defining the interface for props
}

// Correct functional component declaration
/**
 * React functional component for displaying a reply input box.
 * @param {Object} props - The component props.
 * @param {string} props.tweetId - The ID of the tweet being replied to.
 * @returns {JSX.Element} - The JSX element representing the reply input box.
 */
const ReplyInput: React.FC<ReplyInputProps> = ({ tweetId }) => {
    const [postContent, setPostContent] = useState('');
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const token = useSelector((state: RootState) => state.auth.token);
    // Assuming TweetActionService.commentOnTweet is correctly implemented elsewhere
    const TweetActionService = ServiceFactory.getTweetActionService();
    const dispatch = useDispatch();

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = async () => {
        if (!currentUser) {
            console.error('No user logged in');
            return;
        }
        const replyData = {
            userId: currentUser.userId,
            parentTweetId: tweetId,
            content: postContent,
            likes: 0,
            createdAt: new Date().toISOString()// It's better to use Firestore's serverTimestamp for real apps
        };

        // Assuming TweetActionService.commentOnTweet method exists and returns a promise
        try {
            const result = await TweetActionService.commentOnTweet(replyData, token!);
            if (result.success) {
                console.log('Comment posted successfully:', result);
                setPostContent(''); // Clear the input after submit
                dispatch(setNewComment(true));

            } else {
                console.error('Error posting comment:', result.error);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }; // Fixed missing closing bracket

    const hasReachedMaxCharacters = postContent.length >= MAX_COMMENT_LENGTH;

    return (
        <div className="p-4">
            <div className="flex items-center align-middle space-x-4 ">
                {currentUser && <Img userDetails={currentUser} size="micro" onLoaded={() => {}} />}
                <textarea
                    className="flex-1 border border-gray-300 rounded-lg p-2 resize-none"
                    placeholder="Post your reply"
                    value={postContent}
                    onChange={handlePostChange}
                    maxLength={MAX_COMMENT_LENGTH}
                    style={{ fontSize: '18px', border: 'none', outline: 'none', height: 'max-content' }}
                ></textarea>
                <button
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full disabled:opacity-50"
                    onClick={handlePostSubmit}
                    disabled={!postContent || postContent.length >= MAX_COMMENT_LENGTH}
                >
                    Reply
                </button>
            </div>
            {hasReachedMaxCharacters && (
                <div className="flex justify-center">
                    <Label color="red">
                        You've reached the maximum character limit - less is more!
                    </Label>
                </div>
            )}
        </div>
    );
};

export default ReplyInput;
