import { useState, useEffect } from 'react';
import { ServiceFactory } from '@services/serviceFactory';

const useUsernameCheck = () => {
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

    const userService = ServiceFactory.getUserService();

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (username.trim()) {
                setIsCheckingUsername(true);
                const exists = await userService.userExists(username);
                setIsUsernameValid(!exists);
                setIsCheckingUsername(false);
            }
        }, 1000);

        return () => clearTimeout(delayDebounce);
    }, [username]);

    const setUsernameAndCheck = (newUsername:string) => {
        setUsername(newUsername);
    };

    return { setUsernameAndCheck, isUsernameValid, isCheckingUsername };
};

export default useUsernameCheck;
