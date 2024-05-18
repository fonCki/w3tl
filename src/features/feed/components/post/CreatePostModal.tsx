import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import { MAX_TWEET_LENGTH } from '@constants/constants';
import { toggleCreatePostModal } from '@store/slices/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import TweetInput from './TweetInput';

/**
 * CreatePostModal is a React component that represents a modal for creating a post.
 *
 * @returns {JSX.Element} The JSX element that represents the CreatePostModal.
 */
const CreatePostModal = () => {
    const [postContent, setPostContent] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: RootState) => state.menu.isCreatePostModalOpen);
    // ... other states and functions

    // Replace setModalOpen with dispatch(toggleCreatePostModal)
    const closeModal = () => {
        dispatch(toggleCreatePostModal());
    };

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = () => {
        console.log('Post content:', postContent);
        // Handle the post submission logic here
        setPostContent(''); // Clear the input after submit
        closeModal();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            // Handle file upload or preview here
        }
    };

    const hasReachedMaxCharacters = postContent.length >= MAX_TWEET_LENGTH;

    const handleTweetPostResult = (success: boolean, message?: string) => {
        if (success) {
            closeModal();
        }
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            closeIcon
            centered={false}
            width="small"
            size={'tiny'}
            style={{ borderRadius:'30px', height: 'auto', top: 'auto', left: 'auto', bottom: 'auto', right: 'auto' }}
        >
            <div className=" m-4" style={{ borderRadius: '30px' }}>
                <TweetInput onTweetPost={handleTweetPostResult} />
            </div>



        </Modal>

    );
};

export default CreatePostModal;
