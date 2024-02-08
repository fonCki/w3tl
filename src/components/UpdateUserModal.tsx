import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Message, Dimmer, Loader } from 'semantic-ui-react';
import { User } from '@models/user/user';
import useUsernameCheck from '@hooks/useUsernameCheck'; // Adjust this import path
import { ERROR_MESSAGES } from '@constants/errorMessages';
import {
    validateLastname,
    validateName,
    validateUsername,
} from '@utils/validationUtils'; // Adjust this import path
import { ServiceFactory } from '@services/serviceFactory';
import { setCurrentUser } from '@store/slices/authSlice';
import { useDispatch } from 'react-redux'; // Adjust this import path
import { useNavigate } from 'react-router-dom';

interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onUpdateUser: (updatedUser: User) => Promise<void>;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [lastname, setLastname] = useState(user.lastname);
    const [bio, setBio] = useState(user.bio);
    const [location, setLocation] = useState(user.location);
    const [website, setWebsite] = useState(user.website);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading indicator
    const { setUsernameAndCheck, isUsernameValid, isCheckingUsername } = useUsernameCheck();
    const [isOriginalUsername, setIsOriginalUsername] = useState(true);
    const userProfileService = ServiceFactory.getUserProfileService();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setIsOriginalUsername(username === user.username);
    }, [username, user.username]);

    const handleSubmit = async () => {
        const usernameError = validateUsername(username);
        const nameError = validateName(name);
        const lastnameError = validateLastname(lastname);
        if (usernameError || nameError || lastnameError) {
            setErrorMessage(usernameError || nameError || lastnameError);
            return;
        }

        if (!isUsernameValid && !isOriginalUsername) {
            setErrorMessage(ERROR_MESSAGES.usernameTaken);
            return;
        }
        setLoading(true); // Start loading
        try {
            const updatedUser = { ...user, username, name, lastname, bio, location, website };
            console.log('Updating user:', updatedUser);
            const result = await userProfileService.updateProfile(updatedUser);
            if (result.success) {
                dispatch(setCurrentUser(updatedUser)); // Update the user in the global state
                navigate(`/user/${updatedUser.username}`);
                onClose(); // Close the modal after successful update
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            setErrorMessage('Failed to update the user: ' + error);
        }
        setLoading(false); // Stop loading
    };

    const handleCancel = () => {
        //reset the form to the original values
        setUsername(user.username);
        setName(user.name);
        setLastname(user.lastname);
        setBio(user.bio);
        setLocation(user.location);
        setWebsite(user.website);
        setErrorMessage('');
        
        onClose(); // Close the modal without updating
    };

    return (
        <Modal open={isOpen} onClose={onClose} size="large" className="max-w-xl">
            <Modal.Header>Update Profile</Modal.Header>
            <Modal.Content>
                {loading ? (
                    <Dimmer active inverted>
                        <Loader>Updating profile...</Loader>
                    </Dimmer>
                ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Field error={!isUsernameValid && !isOriginalUsername}>
                        <label>Username</label>
                        <Input
                            label="@"
                            labelPosition="left"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                const newUsername = e.target.value.toLowerCase();
                                setUsername(newUsername);
                                if (newUsername !== user.username) {
                                    setUsernameAndCheck(newUsername);
                                }
                            }}
                            icon={isCheckingUsername ? 'spinner' : (isUsernameValid || isOriginalUsername) ? 'check' : 'times'}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Name</label>
                        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Lastname</label>
                        <Input placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Bio</label>
                        <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)}
                                  style={{ resize: 'none', height: '20px' }} />
                    </Form.Field>
                    <Form.Field>
                        <label>Location</label>
                        <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Website</label>
                        <Input placeholder="Website" type="url" value={website}
                               onChange={(e) => setWebsite(e.target.value)} />
                    </Form.Field>
                    {errorMessage && <Message negative>{errorMessage}</Message>}
                    <div className="flex justify-end space-x-4">
                        <Button type="button" onClick={handleCancel} color="grey">Cancel</Button>
                        <Button type="submit" color="blue">Update</Button>
                    </div>
                </Form>
                    )}
            </Modal.Content>
        </Modal>
    );
};

export default UpdateUserModal;
