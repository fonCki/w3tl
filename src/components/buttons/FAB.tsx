// FloatingActionButton.tsx
import React from 'react';
import { Button } from 'semantic-ui-react';
import { FaPencilAlt } from 'react-icons/fa';

interface FloatingActionButtonProps {
    onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <Button
            icon
            circular
            size={'massive'}
            color="blue"
            onClick={onClick}
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
};

export default FloatingActionButton;
