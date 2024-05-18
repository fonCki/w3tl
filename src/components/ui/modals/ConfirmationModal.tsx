import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

/**
 * Represents the properties for the ConfirmationModal component.
 */
interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    headerText: string;
    closeButtonText: string;
    confirmButtonText: string;
}

/**
 * React functional component for displaying a confirmation modal.
 *
 * @component
 * @param {Object} props - The props for the ConfirmationModal component.
 * @param {boolean} props.isOpen - Whether the modal is open or not.
 * @param {function} props.onClose - Callback function to be called when the modal is closed.
 * @param {function} props.onConfirm - Callback function to be called when the confirm button is clicked.
 * @param {string} props.message - The message to be displayed in the modal.
 * @param {string} props.headerText - Text for the modal header.
 * @param {string} props.closeButtonText - Text for the close button.
 * @param {string} props.confirmButtonText - Text for the confirm button.
 * @returns {JSX.Element} The rendered ConfirmationModal component.
 *
 * @example
 *
 * // Example usage of ConfirmationModal:
 * <ConfirmationModal
 *   isOpen={true}
 *   onClose={handleModalClose}
 *   onConfirm={handleConfirmAction}
 *   message="Are you sure you want to proceed?"
 *   headerText="Confirmation Required"
 *   closeButtonText="Cancel"
 *   confirmButtonText="Accept"
 * />
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 onConfirm,
                                                                 message,
                                                                 headerText,
                                                                 closeButtonText = 'Cancel',
                                                                 confirmButtonText = 'Confirm',
                                                             }) => {
    return (
        <Modal open={isOpen} onClose={onClose} size="small">
            <Modal.Header>{headerText}</Modal.Header>
            <Modal.Content>
                <p>{message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClose} color="grey">{closeButtonText}</Button>
                <Button onClick={onConfirm} color="blue">{confirmButtonText}</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ConfirmationModal;
