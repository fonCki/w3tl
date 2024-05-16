import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

interface HashtagModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAppendHashtag: () => void;
    onContinueWithoutAppending: () => void; // New handler for continuing without appending the hashtag
    suggestedHashtag: string;
}

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
