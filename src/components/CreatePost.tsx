import React, { useState } from 'react';
import { Modal, Button, TextArea, Divider, Label } from 'semantic-ui-react';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { MAX_TWEET_LENGTH } from '@constants/constants';
import { toggleCreatePostModal } from '@store/slices/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import TweetInput from '@components/feed/TweetInput';
import ReusableCard from '@components/board/ReusableCard';
import FeedContainer from '@components/feed/FeedContainer';

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const currentUser = useCurrentUser();

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

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            width="small"
            size={'tiny'}

        >
            <div className="relative rounded-full px-6 pt-6  dsfg  flex flex-col justify-center items-center bg-transparent">
                <button onClick={closeModal} className="absolute top-0 left-0 m-2" style={{ color: 'gray' }}>
                    X
                </button>
                {/* Your existing TweetInput content */}

            <FeedContainer >
            <TweetInput />
            </FeedContainer>
            </div>

        </Modal>

    );
};

export default CreatePost;
