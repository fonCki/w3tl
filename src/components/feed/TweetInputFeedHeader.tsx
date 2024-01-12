import React, { useEffect, useState } from 'react';
import { Divider, Label } from 'semantic-ui-react';
import Img from '@components/Tools/Image/Img';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { MAX_TWEET_LENGTH } from '@constants/constants';

const TweetInputFeedHeader: React.FC = () => {
    const [postContent, setPostContent] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const currentUser = useCurrentUser();



    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = () => {
        console.log('Post content:', postContent);
        // Here you would typically handle the post submission to your backend or state management
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

                <div className="w-16 h-16">
                    {currentUser && <Img userDetails={currentUser} size="large" />}
                </div>
                <textarea
                    className="flex-1 border border-gray-300 rounded-lg p-2 resize-none"
                    placeholder="What is happening?"
                    value={postContent}
                    onChange={handlePostChange}
                    maxLength={MAX_TWEET_LENGTH}
                    style={{ fontSize: '18px', border: 'none', outline: 'none', height: '80px' }}
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
export default TweetInputFeedHeader;

