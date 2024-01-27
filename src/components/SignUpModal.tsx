import React, { useState } from 'react';
import { Button, Form, Modal, Input } from 'semantic-ui-react';
import { ServiceFactory } from '@services/serviceFactory';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignUpSuccess?: (success: boolean) => void; // Callback for handling signup success
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSignUpSuccess }) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const authService = ServiceFactory.getAuthService();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setErrorMessage(''); // Clear previous errors
        const result = await authService.createUser(username, name, lastname, email, password);

        if (result.success) {
            onClose(); // Close the modal on successful signup
            if (onSignUpSuccess) {
                onSignUpSuccess(true); // Notify parent component about the success
            }
        } else {
            // Display the error message
            setErrorMessage(result.error || 'Signup failed');
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Modal.Header>Sign Up</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e) => {e.preventDefault(); handleSignUp();}}>
                    <Form.Field>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            placeholder="Lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Field>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <Button type='submit' positive>Sign Up</Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default SignUpModal;
