import React, { useEffect, useState } from 'react';
import { Button, Dimmer, Form, Input, Loader, Message, Modal } from 'semantic-ui-react';
import { ServiceFactory } from '@services/serviceFactory';
import { validateEmail } from '@utils/validationUtils';

/**
 * Represents the props for the ForgotPasswordModal component.
 */
interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

/**
 * Represents a modal component for the "Forgot Password" functionality.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isOpen - Whether the modal is open or not.
 * @param {function} props.onClose - The function to be called when the modal is closed.
 * @param {string} props.email - The email address associated with the user.
 * @returns {JSX.Element} - The rendered component.
 */
const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, email }) => {
    const [enteredEmail, setEnteredEmail] = useState(email);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const authService = ServiceFactory.getAuthService();

    useEffect(() => {
        setEnteredEmail(email);
    }, [email]);

    const handleForgotPassword = async () => {
        const emailError = validateEmail(enteredEmail);
        if (emailError) {
            setErrorMessage(emailError);
            return;
        }
        setErrorMessage('');
        setLoading(true);
        try {
            await authService.sendPasswordResetEmail(enteredEmail);
            onClose();
            alert('Password reset email sent. Please check your inbox.');
        } catch (error) {
            setErrorMessage('Failed to send password reset email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} className="max-w-xl" closeIcon={true}>
            <Modal.Header>Forgot Password</Modal.Header>
            <Modal.Content>
                {loading ? (
                    <Dimmer active inverted>
                        <Loader>Sending...</Loader>
                    </Dimmer>
                ) : (
                    <Form onSubmit={(e) => {e.preventDefault(); handleForgotPassword();}}>
                        <Form.Field>
                            <Input
                                icon='mail'
                                iconPosition='left'
                                placeholder="Enter your email"
                                type="email"
                                value={enteredEmail}
                                onChange={(e) => setEnteredEmail(e.target.value)}
                            />
                        </Form.Field>
                        {errorMessage && <Message negative>{errorMessage}</Message>}
                        <Button fluid color='blue' type='submit'>Send Reset Email</Button>
                    </Form>
                )}
            </Modal.Content>
        </Modal>
    );
};

export default ForgotPasswordModal;
