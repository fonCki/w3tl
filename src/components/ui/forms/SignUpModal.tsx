import React, { useState } from 'react';
import { Button, Dimmer, Form, Input, Loader, Message, Modal } from 'semantic-ui-react';
import { ServiceFactory } from '@services/serviceFactory';
import { ERROR_MESSAGES } from '@constants/errorMessages';
import useUsernameCheck from '@hooks/useUsernameCheck';
import {
    validateEmail,
    validateLastname,
    validateName,
    validatePassword,
    validateUsername,
} from '@utils/validationUtils';

/**
 * Represents the properties of the SignUpModal component.
 */
interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignUpSuccess: (email:string, password:string) => void;
}

/**
 * Sign Up modal component.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Flag indicating if the modal is open.
 * @param {function} props.onClose - Function to close the modal.
 * @param {function} props.onSignUpSuccess - Function to call after successful sign up.
 * @returns {React.FC} - Sign Up modal component.
 */
const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSignUpSuccess, }) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [isLastnameValid, setIsLastnameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [loading, setLoading] = useState(false); // New state for loading indicator
    const { setUsernameAndCheck, isUsernameValid, isCheckingUsername } = useUsernameCheck();


    const emailRegex = /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const authService = ServiceFactory.getAuthService();

    const handleUsernameChange = (newUsername:string) => {
        setErrorMessage(``)
        setUsername(newUsername.toLowerCase());  // Update local state
        setUsernameAndCheck(newUsername.toLowerCase()); // Update hook state
    };

    const handleSignUp = async () => {
        // Validation checks
        const usernameError = validateUsername(username);
        const nameError = validateName(name);
        const lastnameError = validateLastname(lastname);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (usernameError || nameError || lastnameError || emailError || passwordError) {
            setErrorMessage(usernameError || nameError || lastnameError || emailError || passwordError);
            return;
        }

        if (!isUsernameValid) {
            setErrorMessage(ERROR_MESSAGES.usernameTaken);
            return;
        }

        setErrorMessage('');
        setLoading(true); // Start loading
        try {
            const result = await authService.createUser(username, name, lastname, email, password);
            if (result.success) {
                onSignUpSuccess(email, password);
                onClose();
            } else {
                setErrorMessage(result.error || 'Signup failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred during signup.');
        } finally {
            setLoading(false); // Stop loading regardless of the outcome
        }
    };


    return (
        <Modal open={isOpen} onClose={onClose} className="max-w-xl" closeIcon={true}>
            <Modal.Header>Sign Up</Modal.Header>
            <Modal.Content>
                {loading ? (
                <Dimmer active inverted>
                    <Loader>Creating account...</Loader>
                </Dimmer>
                ) : (
                <Form onSubmit={(e) => {e.preventDefault(); handleSignUp();}}>
                    <Form.Field error={!isUsernameValid}>
                        <Input
                            label="@"
                            labelPosition="left"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            icon={{
                                name: isCheckingUsername ? 'spinner' : isUsernameValid ? 'check' : 'times',
                                style: { color: isUsernameValid ? 'green' : 'red' }
                            }}
                        />
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Field error={!isNameValid}>
                            <Input
                                icon='address card'
                                iconPosition='left'
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => setIsNameValid(name.trim().length > 0)}
                            />
                        </Form.Field>
                        <Form.Field error={!isLastnameValid}>
                            <Input
                                icon='address card'
                                iconPosition='left'
                                placeholder="Lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                onBlur={() => setIsLastnameValid(lastname.trim().length > 0)}
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setIsPasswordValid(password.length >= 6)}
                        />
                    </Form.Field>
                    {errorMessage && <Message negative>{errorMessage}</Message>}
                    <Button fluid color='blue' type='submit' disabled={isCheckingUsername !}>Sign Up</Button>
                </Form>
                    )}
            </Modal.Content>
        </Modal>
    );
};

export default SignUpModal;
