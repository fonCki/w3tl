import { useEffect } from 'react';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import { useNavigationActions } from '@hooks/useNavigationActions';

const Profile = () => {
    const currentUser = useCurrentUser(); // Using the hook
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

    // Return null or a loader as the navigation will redirect
    return null; // Or return a loader component if needed
};

export default Profile;
