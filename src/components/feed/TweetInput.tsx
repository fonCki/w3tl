import React, { useState } from 'react';
import { Divider, Label } from 'semantic-ui-react';
import Img from '@components/tools/image/Img';
import { MAX_TWEET_LENGTH } from '@constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setNewTweet } from '@store/slices/notificationsSlice';
import { ServiceFactory } from '@services/serviceFactory';


interface TweetInputProps {
    onTweetPost: (success: boolean, message?: string) => void;
}

const TweetInput: React.FC<TweetInputProps> = ({ onTweetPost }) => {
    const [postContent, setPostContent] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<string | null>(null); // 'image' or 'video'
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const token = useSelector((state: RootState) => state.auth.token);

    const userService = ServiceFactory.getTweetActionService();

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileType = file.type.split('/')[0]; // 'image' or 'video'
            setSelectedFile(file);

            setIsLoading(true);

            try {
                const uploadResult = await userService.uploadMedia(file, token!);
                if (uploadResult.success) {
                    setMediaUrl(uploadResult.downloadURL!);
                    setMediaType(fileType);
                } else {
                    onTweetPost(false, 'Error uploading media');
                }
            } catch (error) {
                onTweetPost(false, 'Error uploading media');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handlePostSubmit = async () => {
        if (!currentUser) {
            console.error('No user logged in');
            return;
        }

        setIsLoading(true);

        try {
            const baseTweet = {
                content: postContent,
                userId: currentUser.userId,
                createdAt: new Date().toISOString(),
                likes: 0,
                retweets: 0,
                comments: 0,
            };

            // Only add mediaUrl and mediaType to the tweet if mediaUrl is not null or empty
            const newTweet = {
                ...baseTweet,
                ...(mediaUrl && { mediaUrl, mediaType }), // This adds mediaUrl and mediaType only if mediaUrl is truthy
            };


            const result = await userService.postTweet(newTweet, token!);

            if (result.success) {
                dispatch(setNewTweet(true));
                onTweetPost(true, 'Tweet posted successfully');
                setMediaUrl(null); // Reset media URL and type after successful post
                setMediaType(null);
            } else {
                onTweetPost(false, result.error || 'Error posting tweet');
            }
        } catch (error) {
            onTweetPost(false, 'Error posting tweet');
        } finally {
            setIsLoading(false);
            setPostContent('');
            setSelectedFile(null);
        }
    };

    const hasReachedMaxCharacters = postContent.length >= MAX_TWEET_LENGTH;


    return (

        <div className="p-4">
            <div className="flex items-start  space-x-4 ">
                    <Img userDetails={currentUser} size="small" onLoaded={() => {}} />
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
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 flex items-center justify-center h-10"
                    onClick={handlePostSubmit}
                    disabled={!postContent || postContent.length >= MAX_TWEET_LENGTH || isLoading}
                >
                    {isLoading ? (
                        <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-white rounded-full dot-flashing-1"></div>
                            <div className="h-2 w-2 bg-white rounded-full dot-flashing-2"></div>
                            <div className="h-2 w-2 bg-white rounded-full dot-flashing-3"></div>
                        </div>
                    ) : (
                        <span className="h-4 flex items-center">Post</span> // Ensure the text occupies a similar vertical space as the dots
                    )}
                </button>


            </div>
        </div>
    );
}
export default TweetInput;
