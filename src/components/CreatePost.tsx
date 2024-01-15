import React, { useState } from 'react';
import { Modal, Button, TextArea, Divider, Label } from 'semantic-ui-react';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { MAX_TWEET_LENGTH } from '@constants/constants';
import { toggleCreatePostModal } from '@store/slices/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';

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
        >
            <Modal.Header>Create a New Post</Modal.Header>
            <Modal.Content>
                <TextArea
                    placeholder="What's happening?"
                    value={postContent}
                    onChange={handlePostChange}
                    style={{ minHeight: 100 }}
                />
                {hasReachedMaxCharacters && (
                    <Label color="red">
                        You've reached the maximum character limit!
                    </Label>
                )}
                <Divider />
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={() => closeModal()}>
                    Cancel
                </Button>
                <Button
                    positive
                    onClick={handlePostSubmit}
                    disabled={!postContent || postContent.length >= MAX_TWEET_LENGTH}
                >
                    Post
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default CreatePost;
