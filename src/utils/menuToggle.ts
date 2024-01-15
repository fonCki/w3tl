import { Dispatch } from 'redux';
import { setVisible, toggleVisibility } from '@store/slices/menuSlice';
import { TOGGLE_DELAY_SECONDS } from '@constants/constants';

// Variable to keep track of the timeout ID
let timeoutId: NodeJS.Timeout | null = null;

export const handleToggleWithDelay = (dispatch: Dispatch) => {
    const screenWidth = window.innerWidth;

    // Clear any existing timeout
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    if (screenWidth < 640) {
        // Set a new timeout and store its ID
        timeoutId = setTimeout(() => {
            dispatch(setVisible(false));
            timeoutId = null;
        }, TOGGLE_DELAY_SECONDS * 1000);
    }
};
