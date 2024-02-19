import React, { useState } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import TweetLine from '@components/feed/TweetLine';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    tweetId: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, tweetId }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const tweetLink = `${window.location.origin}/post/${tweetId}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(tweetLink);
            setCopySuccess('Link copied!');
            setTimeout(() => onClose(), 2000);
        } catch (err) {
            setCopySuccess('Failed to copy link.');
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            size="tiny"
        >
            <Modal.Header>Share This Post</Modal.Header>
            <Modal.Content>

                <p>{tweetLink}</p>
                {copySuccess && <p style={{ color: 'green' }}>{copySuccess}</p>}
            </Modal.Content>
            <Modal.Actions>
                <Button color="teal" onClick={handleCopyLink} style={{ borderRadius: '9999px' }}>
                    <Icon name="copy" /> Copy Link
                </Button>
                <Button color="red" onClick={onClose} style={{ borderRadius: '9999px' }}>
                    <Icon name="remove" /> Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ShareModal;
