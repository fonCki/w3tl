import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

/**
 * Represents the properties for the HashtagModal component.
 */
interface HashtagModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAppendHashtag: () => void;
    onContinueWithoutAppending: () => void; // New handler for continuing without appending the hashtag
    suggestedHashtag: string;
}

/**
 * React function component for a modal to add a suggested hashtag to a tweet.
 *
 * @param {object} props - The component props
 * @param {boolean} props.isOpen - Flag indicating if the modal is open
 * @param {function} props.onClose - Function to handle closing the modal
 * @param {function} props.onAppendHashtag - Function to handle appending the hashtag to the tweet
 * @param {function} props.onContinueWithoutAppending*/
const HashtagModal: React.FC<HashtagModalProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       onAppendHashtag,
                                                       onContinueWithoutAppending,
                                                       suggestedHashtag,
                                                   }) => {
    return (
        <Modal open={isOpen} onClose={onClose} size="small">
            <Modal.Header>Suggested Hashtag</Modal.Header>
            <Modal.Content>
                <p>Would you like to add the suggested hashtag to your tweet?</p>
                <p><strong>{suggestedHashtag}</strong></p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onContinueWithoutAppending} color="grey">Cancel</Button>
                <Button onClick={onAppendHashtag} color="blue">Append Hashtag</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default HashtagModal;
