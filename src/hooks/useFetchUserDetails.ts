// useFetchUserDetails.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '@services/userService';
import { UserFull } from '@models/user/userFull';

const useFetchUserDetails = (username: string | undefined) => {
    const [userDetails, setUserDetails] = useState<UserFull | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/home');
            return;
        }

        async function fetchDetails() {
            try {
                const user = await userService.getUserByUsername(username!);
                if (!user) {
                    navigate('/home');
                    return;
                }

                const details = await userService.getUserDetails(user.id);
                if (!details) {
                    navigate('/home');
                    return;
                }

                setUserDetails(details);
            } catch (error) {
                console.error(error);
                navigate('/home');
            }
        }

        fetchDetails();
    }, [username, navigate]);

    return userDetails;
};

export default useFetchUserDetails;
