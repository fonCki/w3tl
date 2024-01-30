// useFetchUserDetails.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@models/user/user';
import { useNavigationActions} from '@hooks/useNavigationActions';
import { ServiceFactory } from '@services/serviceFactory';

const useFetchUserDetails = (username: string | undefined) => {
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const navigate = useNavigate();
    const { userNotFound } = useNavigationActions();
    const userService = ServiceFactory.getUserService();


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
