import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

interface ProfanityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSendAnyway: () => void;
    message: string;
}

const ProfanityModal: React.FC<ProfanityModalProps> = ({ isOpen, onClose, onSendAnyway, message }) => {
    return (
        <Modal open={isOpen} onClose={onClose} size="small">
            <Modal.Header>Profanity Detected</Modal.Header>
            <Modal.Content>
                <p>{message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClose} color="grey">Rewrite</Button>
                <Button onClick={onSendAnyway} color="blue">Send Anyway</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ProfanityModal;
