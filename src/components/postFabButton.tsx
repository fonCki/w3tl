import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { PostButton } from '@components/buttons/PostButton';

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