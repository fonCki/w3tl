import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigationActions } from '@hooks/useNavigationActions';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

/**
 * Represents a Profile component.
 *
 * @returns {null} Returns null or a loader component if needed.
 */
const Profile = () => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const navigate = useNavigate();
    const { userNotFound, navigateToUser } = useNavigationActions();

    useEffect(() => {
        if (currentUser && currentUser.username) {
            navigateToUser(currentUser.username);
        } else {
            // Handle the case where currentUser or currentUser.username is not available
            userNotFound();
        }
    }, [currentUser, navigate]);

    return null; // Or return a loader component if needed
};

export default Profile;
