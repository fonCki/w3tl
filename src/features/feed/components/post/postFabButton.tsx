import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { PostButton } from '@components/ui/buttons/PostButton';

/**
 * postFabButton function
 *
 * This function renders a PostButton component based on the values of isCompactMode, isVisible, and activeTab from the Redux store.
 *
 * @returns {JSX.Element} - The rendered PostButton component
 */
const  postFabButton= () => {
    const { isCompactMode, isVisible, activeTab } = useSelector((state: RootState) => state.menu);
    return (
        <div>
            {isCompactMode && !isVisible && (
                <div>
                    <PostButton isFAB={true} />
                </div>
            )}
        </div>
    );
};

export default postFabButton;