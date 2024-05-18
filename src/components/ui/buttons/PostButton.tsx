import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { toggleCreatePostModal } from '@store/slices/menuSlice';
import { FaPencilAlt } from 'react-icons/fa';

/**
 * Represents the properties for the PostButton component.
 *
 * @interface PostButtonProps
 */
interface PostButtonProps {
    isFAB?: boolean;
}

/**
 * Represents a button for creating a post.
 * @param {Object} props - The properties of the component.
 * @param {boolean} props.isFAB - Determines if the button should be rendered as a floating action button (FAB).
 * @returns {ReactElement} The rendered button component.
 */
export const PostButton: React.FC<PostButtonProps> = ({ isFAB = false }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleCreatePostModal());
    };

    if (isFAB) {
        return (
            <Button
                icon
                circular
                size='massive'
                color="blue"
                onClick={handleClick}
                style={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    zIndex: 1000,
                    transition: 'transform 0.3s ease-in-out',
                }}>
                <FaPencilAlt />
            </Button>
        );
    }

    return (
        <Button
            className="w-full mt-4"
            color="blue"
            size="large"
            style={{ borderRadius: '9999px' }}
            onClick={handleClick}
        >
            Post
        </Button>
    );
};
