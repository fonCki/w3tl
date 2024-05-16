import React, { useState } from 'react';
import { Divider, Label } from 'semantic-ui-react';
import Img from '@components/tools/image/Img';
import { MAX_TWEET_LENGTH } from '@constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import FirebaseTweetActionService from '@services/firebase/firebaseTweetActionService';
import { setNewTweet } from '@store/slices/notificationsSlice';
import naclUtil from 'tweetnacl-util';
import nacl from 'tweetnacl';
import ProfanityModal from '@components/ProfanityModal'; // Import ProfanityModal
import { getRandomProfanityMessage } from '@utils/randomMessage'; // Import the utility function
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
    const privateKey = useSelector((state: RootState) => state.auth.privateKey); // Get private key from state
    const tweetActionService = new FirebaseTweetActionService();
    const mlService = ServiceFactory.getMLService(); // Get the ML service instance
    const [isLoading, setIsLoading] = useState(false);
    const [isProfanityModalOpen, setIsProfanityModalOpen] = useState(false); // State for modal
    const [profanityMessage, setProfanityMessage] = useState(''); // State for modal message
    const [isHashtagModalOpen, setIsHashtagModalOpen] = useState(false); // State for hashtag modal
    const [suggestedHashtag, setSuggestedHashtag] = useState(''); // State for suggested hashtag
    const [resolveHashtagPromise, setResolveHashtagPromise] = useState<(() => void) | null>(null); // State for hashtag promise resolver
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
                const uploadResult = await tweetActionService.uploadMedia(file);
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

    const handlePostSubmit = async (ignoreProfanity = false, ignoreHashtag = false) => {
        if (!currentUser) {
            console.error('No user logged in');
            return;
        }
        try {
            if (!ignoreProfanity) {
                const profanityCheck = await mlService.checkProfanity(postContent);
                if (profanityCheck.result) {
                    setProfanityMessage(getRandomProfanityMessage()); // Set a random profanity message
                    setIsProfanityModalOpen(true);
                    await new Promise<void>((resolve) => {
                        const handleSendAnyway = () => {
                            setIsProfanityModalOpen(false);
                            resolve();
                        };

                        <ProfanityModal
                            isOpen={isProfanityModalOpen}
                            onClose={() => setIsProfanityModalOpen(false)}
                            onSendAnyway={handleSendAnyway}
                            message={profanityMessage}
                        />;
                    });
                }
            }

            // if (!ignoreHashtag && !containsHashtag(postContent)) {
            //     const hashtagResult = await mlService.getHashTags(postContent);
            //     setSuggestedHashtag(hashtagResult);
            //     setIsHashtagModalOpen(true);
            //
            //     await new Promise<void>((resolve) => {
            //         setResolveHashtagPromise(() => resolve);
            //     });
            // }
            //
            //     setIsLoading(true);

            const baseTweet = {
                content: postContent,
                userId: currentUser.userId,
                createdAt: new Date().toISOString(),
                likes: 0,
                retweets: 0,
                comments: 0,
                signature: '',
            };

            try {
                if (privateKey) {
                    const messageUint8 = naclUtil.decodeUTF8(postContent);
                    const keyUint8 = naclUtil.decodeBase64(privateKey);
                    const signatureUint8 = nacl.sign.detached(messageUint8, keyUint8);
                    const signature = naclUtil.encodeBase64(signatureUint8);
                    baseTweet.signature = signature;
                }
            } catch (error) {
                console.error('Error signing tweet:', error);
            }

            // Only add mediaUrl and mediaType to the tweet if mediaUrl is not null or empty
            const newTweet = {
                ...baseTweet,
                ...(mediaUrl && { mediaUrl, mediaType }), // This adds mediaUrl and mediaType only if mediaUrl is truthy
            };

            const result = await tweetActionService.postTweet(newTweet);

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
        <>
            <div className="p-4">
                <div className="flex items-start space-x-4">
                    <Img userDetails={currentUser} size="small" onLoaded={() => {
                    }} />
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
                        onClick={() => handlePostSubmit()}
                        disabled={!postContent || postContent.length >= MAX_TWEET_LENGTH || isLoading}
                    >
                        {isLoading ? (
                            <div className="flex space-x-1">
                                <div className="h-2 w-2 bg-white rounded-full dot-flashing-1"></div>
                                <div className="h-2 w-2 bg-white rounded-full dot-flashing-2"></div>
                                <div className="h-2 w-2 bg-white rounded-full dot-flashing-3"></div>
                            </div>
                        ) : (
                            <span className="h-4 flex items-center">Post</span>
                        )}
                    </button>
                </div>
            </div>

            <ProfanityModal
                isOpen={isProfanityModalOpen}
                onClose={() => setIsProfanityModalOpen(false)}
                onSendAnyway={() => {
                    setIsProfanityModalOpen(false);
                    handlePostSubmit(true);
                }}
                message={profanityMessage}
            />

        </>
    );

};
export default TweetInput;
