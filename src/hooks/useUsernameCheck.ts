import { useState, useEffect } from 'react';
import { ServiceFactory } from '@services/serviceFactory';

/**
 * Represents a custom hook for checking if a username is valid.
 *
 * @returns {Object} An object containing methods and state variables related to username validation.
 * @typedef {Object} UseUsernameCheck
 *
 * @property {Function} setUsernameAndCheck - Sets the username and triggers the validation process.
 * @property {boolean} isUsernameValid - Indicates if the username is valid or not.
 * @property {boolean} isCheckingUsername - Indicates if the validation process is currently ongoing.
 */
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
