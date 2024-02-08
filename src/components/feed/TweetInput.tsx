import React, { useEffect, useState } from 'react';
import { Divider, Label } from 'semantic-ui-react';
import Img from '@components/tools/image/Img';
import { MAX_TWEET_LENGTH } from '@constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import FirebaseTweetActionService from '@services/firebase/firebaseTweetActionService';
import { setNewTweet} from '@store/slices/notificationsSlice';


interface TweetInputProps {
    onTweetPost: (success: boolean, message?: string) => void;
}
const TweetInput: React.FC<TweetInputProps> = ({ onTweetPost }) => {
    const [postContent, setPostContent] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const tweetActionService = new FirebaseTweetActionService();
    const dispatch = useDispatch();

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = async () => {
        if (!currentUser) {
            console.error('No user logged in');
            return;
        }
        try {
            const result = await tweetActionService.postTweet(postContent, {
                // Add any additional data here, like images or videos
            });

            if (result.success) {
                console.log('Tweet posted successfully:', result.tweetId);
                dispatch(setNewTweet(true));
                onTweetPost(true, 'Tweet posted successfully');
            } else {
                console.error('Error posting tweet:', result.error);
                onTweetPost(false, result.error);
            }
        } catch (error) {
            console.error('Error posting tweet:', error);
            //TODO
            onTweetPost(false, "error");
        }

        setPostContent(''); // Clear the input after submit
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            // Here you might want to handle file upload or preview
        }
    };

    const hasReachedMaxCharacters = postContent.length >= MAX_TWEET_LENGTH;


    return (

        <div className="p-4">
            <div className="flex items-start  space-x-4 ">
                    <Img userDetails={currentUser} size="small" />
                <textarea
                    className="flex-1 border border-gray-300 rounded-lg p-2 resize-none"
                    placeholder="What is happening?"
                    value={postContent}
                    onChange={handlePostChange}
                    maxLength={MAX_TWEET_LENGTH}
                    style={{ fontSize: '18px', border: 'none', outline: 'none', height: '100px' }}
                ></textarea>
            </div>
            <Divider />
            {hasReachedMaxCharacters && (
                <div className="flex justify-center">
                <Label color="red">
                        You've reached the maximum character limit - less is more!
                    </Label>
                </div>
            )}
            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="material-icons text-gray-700 text-xl">image</span>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    <label htmlFor="video-upload" className="cursor-pointer">
                        <span className="material-icons text-gray-700 text-xl">videocam</span>
                        <input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    <span className="material-icons text-gray-700 text-xl">insert_emoticon</span>
                    <span className="material-icons text-gray-700 text-xl">place</span>
                </div>
                <button
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full disabled:opacity-50"
                    onClick={handlePostSubmit}
                    disabled={!postContent || postContent.length >= MAX_TWEET_LENGTH}
                >
                    Post
                </button>
            </div>
        </div>
    );
}
export default TweetInput;

