import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import FloatingActionButton from '@components/buttons/FAB';
import { toggleCreatePostModal } from '@store/slices/menuSlice';

const  postFabButton= () => {
    const { isCompactMode, isVisible, activeTab } = useSelector((state: RootState) => state.menu);
    const dispatch = useDispatch();
    return (
        <div>
            {isCompactMode && !isVisible && (
                <div>
                    <FloatingActionButton onClick={() => dispatch(toggleCreatePostModal())} />
                </div>
            )}
        </div>
    );
};

export default postFabButton;