import React, { useEffect, useState } from 'react';
import { Button, Dimmer, Form, Input, Loader, Message, Modal } from 'semantic-ui-react';
import { User } from '@models/user/user';
import useUsernameCheck from '@hooks/useUsernameCheck'; // Adjust this import path
import { ERROR_MESSAGES } from '@constants/errorMessages';
import {
    validateBio,
    validateLastname,
    validateLocation,
    validateName,
    validateUsername,
} from '@utils/validationUtils'; // Adjust this import path
import { ServiceFactory } from '@services/serviceFactory';
import { setCurrentUser } from '@store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux'; // Adjust this import path
import { useNavigate } from 'react-router-dom';
import { RootState } from '@store/store';

/**
 * Represents the props for the UpdateUserModal component.
 * @typedef {Object} UpdateUserModalProps
 * @property {boolean} isOpen - Indicates whether the modal is open or not.
 * @property {function} onClose - The function to be called when the modal is closed.
 * @property {User} user - The user object to be updated.
 * @property {function} onUpdateUser - The function to be called when the user is updated.
 */
interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    /**
     * Represents a User.
     * @typedef {Object} User
     * @property {string} id - The unique identifier for the User.
     * @property {string} name - The name of the User.
     * @property {number} age - The age of the User.
     * @property {string} email - The email address of the User.
     * @property {boolean} isActive - Indicates whether the User is active or not.
     * @property {Date} lastLogin - The date and time of the User's last login.
     * @property {Array.<string>} roles - The roles assigned to the User.
     */
    user: User;
    onUpdateUser: (updatedUser: User) => Promise<void>;
}

/**
 * A modal component for updating user profiles.
 * @component
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open or not.
 * @param {function} props.onClose - Function to be called when the modal is closed.
 * @param {Object} props.user - The user object to be updated.
 * @param {function} props.onUpdateUser - Function to be called when the user profile is updated.
 *
 * @returns {ReactElement} The UpdateUserModal component.
 */
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
    const token = useSelector((state: RootState) => state.auth.token);
    const userProfileService = ServiceFactory.getUserProfileService();
    const userServices = ServiceFactory.getUserService();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setIsOriginalUsername(username === user.username);
    }, [username, user.username]);

    const handleSubmit = async () => {
        const usernameError = validateUsername(username);
        const nameError = validateName(name);
        const lastnameError = validateLastname(lastname);
        const bioError = validateBio(bio!);
        const locationError = validateLocation(location!);
        if (usernameError || nameError || lastnameError || bioError || locationError) {
            setErrorMessage(usernameError || nameError || lastnameError || bioError || locationError);
            return;
        }

        if (!isUsernameValid && !isOriginalUsername) {
            setErrorMessage(ERROR_MESSAGES.usernameTaken);
            return;
        }
        setLoading(true); // Start loading
        try {
            const userUpdate: User | undefined = await userServices.getUserById(user.userId)
            if (!userUpdate) {
                throw new Error('User not found');
            }
            const updatedUser = { ...userUpdate, username, name, lastname, bio, location, website };
            console.log('Updating user:', updatedUser);
            const result = await userProfileService.updateProfile(updatedUser, token!);
            if (result.success) {
                dispatch(setCurrentUser(updatedUser!)); // Update the user in the global state
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
