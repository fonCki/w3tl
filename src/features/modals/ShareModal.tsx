import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

/**
 * Interface representing the props for the ShareModal component.
 */
interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    tweetId: string;
}

/**
 * React component for a Share Modal
 *
 * @component
 * @param {object} props - The component props
 * @param {boolean} props.isOpen - Determines if the modal is open or not
 * @param {function} props.onClose - Callback function to close the modal
 * @param {string} props.tweetId - The ID of the tweet to share
 * @returns {JSX.Element} - The rendered ShareModal component
 */
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
