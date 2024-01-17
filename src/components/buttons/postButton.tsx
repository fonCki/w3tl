import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { toggleCreatePostModal } from '@store/slices/menuSlice';

export const PostButton = () => {
    const dispatch = useDispatch();

    return (
        <Button
            className="w-full mt-4"
            color="blue"
            size="large"
            style={{ borderRadius: '9999px' }}
            onClick={() => dispatch(toggleCreatePostModal())}
        >
            Post
        </Button>
    );
};
