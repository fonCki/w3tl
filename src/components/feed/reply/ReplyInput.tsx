import React, { useEffect, useState } from 'react';
import { Divider, Label } from 'semantic-ui-react';
import Img from '@components/Tools/Image/Img';
import { MAX_COMMENT_LENGTH } from '@constants/constants';
import { useCurrentUser } from '@hooks/useCurrentUser';

const TweetInputFeedHeader: React.FC = () => {
    const [postContent, setPostContent] = useState('');
    const currentUser = useCurrentUser();

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = () => {
        console.log('Post content:', postContent);
        // Here you would typically handle the post submission to your backend or state management
        setPostContent(''); // Clear the input after submit
    };



    const hasReachedMaxCharacters = postContent.length >= MAX_COMMENT_LENGTH;


    return (
        <div className="p-4">
            <div className="flex items-center align-middle space-x-4 ">
                <div className="w-16 h-16">
                    {currentUser && <Img userDetails={currentUser} size="large" />}
                </div>
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
}
export default TweetInputFeedHeader;

