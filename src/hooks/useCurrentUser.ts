// hooks/useCurrentUser.ts
import { useState, useEffect } from 'react';
import { userService } from '@services/userService';
import { UserDetails } from '@models/userDetails';

export const useCurrentUser = (): UserDetails | undefined => {
    const [currentUser, setCurrentUser] = useState<UserDetails | undefined>(undefined);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await userService.getFullCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    return currentUser;
};
