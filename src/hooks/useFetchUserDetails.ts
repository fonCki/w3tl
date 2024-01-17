// useFetchUserDetails.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '@services/userService';
import { UserFull } from '@models/user/userFull';
import { useNavigationActions} from '@hooks/useNavigationActions';

const useFetchUserDetails = (username: string | undefined) => {
    const [userDetails, setUserDetails] = useState<UserFull | null>(null);
    const navigate = useNavigate();
    const { userNotFound } = useNavigationActions();

    useEffect(() => {
        if (!username) {
            userNotFound();
            return;
        }

        async function fetchDetails() {
            try {
                const user = await userService.getUserByUsername(username!);
                if (!user) {
                    userNotFound();
                    return;
                }

                const details = await userService.getUserDetails(user.id);
                if (!details) {
                    userNotFound();
                    return;
                }

                setUserDetails(details);
            } catch (error) {
                console.error(error);
                userNotFound();
            }
        }

        fetchDetails();
    }, [username, navigate]);

    return userDetails;
};

export default useFetchUserDetails;
