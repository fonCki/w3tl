import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Input, Message } from 'semantic-ui-react';
import { ServiceFactory } from '@services/serviceFactory';
import 'semantic-ui-css/semantic.min.css';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignUpSuccess: (username: string, password: string) => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSignUpSuccess }) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

    const emailRegex = /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/;

    const [isNameValid, setIsNameValid] = useState(true);
    const [isLastnameValid, setIsLastnameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const userService = ServiceFactory.getUserService();
    const authService = ServiceFactory.getAuthService();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (username) {
                setIsCheckingUsername(true);
                const exists = await userService.userExists(username);
                if (exists) {
                    setErrorMessage('Username is already taken.');
                    setIsUsernameValid(!exists);
                    setIsCheckingUsername(false);
                } else {
                    setIsUsernameValid(true);
                    setIsCheckingUsername(false);
                    setErrorMessage('')
                }
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [username]);

    const handleSignUp = async () => {
        // check required fields
        if (name === '') {
            setIsNameValid(false);
            setErrorMessage('Name is required.');
            return;
        }
        if (lastname === '') {
            setIsLastnameValid(false);
            setErrorMessage('Last name is required.');
            return;
        }
        if (email === '' || !emailRegex.test(email)) {
            setIsEmailValid(false);
            setErrorMessage('Email is not valid.');
            return;
        }
        if (password === '') {
            setIsPasswordValid(false);
            setErrorMessage('Password is required.');
            return;
        }
        // Clear previous errors
        setErrorMessage('');
        const result = await authService.createUser(username, name, lastname, email, password);
        if (result.success) {
            onSignUpSuccess(email, password);
            onClose(); // Close the modal on successful signup
        } else {
            setErrorMessage(result.error || 'Signup failed');
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} className="max-w-xl" closeIcon={true}>
            <Modal.Header>Sign Up</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e) => {e.preventDefault(); handleSignUp();}}>
                    <Form.Field>
                        <Input
                            label="@"
                            labelPosition="left"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            icon={(isCheckingUsername ? 'spinner' : isUsernameValid ? 'check' : 'times')}
                            iconColor={isUsernameValid ? 'green' : 'red'}
                        />
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Field error={!isNameValid}>
                            <Input
                                icon='address card'
                                iconPosition='left'
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {setName(e.target.value); setIsNameValid(true);}}
                                onBlur={() => setIsNameValid(name !== '')}
                            />
                        </Form.Field>
                        <Form.Field error={!isLastnameValid}>
                            <Input
                                icon='address card'
                                iconPosition='left'
                                placeholder="Lastname"
                                value={lastname}
                                onChange={(e) => {setLastname(e.target.value); setIsLastnameValid(true);}}
                                onBlur={() => setIsLastnameValid(lastname !== '')}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field error={!isEmailValid}>
                        <Input
                            icon='mail'
                            iconPosition='left'
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value); setIsEmailValid(true);}}
                            onBlur={() => setIsEmailValid(emailRegex.test(email))}
                        />
                    </Form.Field>
                    <Form.Field error={!isPasswordValid}>
                        <Input
                            icon='lock'
                            iconPosition='left'
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); setIsPasswordValid(true);}}
                            onBlur={() => setIsPasswordValid(password !== '')}
                        />
                    </Form.Field>
                    {errorMessage && <Message negative>{errorMessage}</Message>}
                    <Button fluid color='blue' type='submit' disabled={isCheckingUsername}>Sign Up</Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default SignUpModal;