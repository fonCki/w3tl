import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Input, Message, Dimmer, Loader } from 'semantic-ui-react';
import { ServiceFactory } from '@services/serviceFactory';
import { validateEmail } from '@utils/validationUtils';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

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
