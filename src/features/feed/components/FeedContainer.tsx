import React, { ReactNode } from 'react';

/**
 * FeedContainerProps is a interface representing the props for the FeedContainer component.
 */
interface FeedContainerProps {
    children: ReactNode;
    decoration?: boolean;
}

/**
 * FeedContainer is a functional component that wraps its children and applies styling and decoration.
 * It is used to create a container for feed items.
 *
 * @param {Object} props - The properties of the FeedContainer component.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the container.
 * @param {boolean} [props.decoration=true] - Specifies whether to apply decoration to the container. Default value is true.
 *
 * @returns {React.FC<FeedContainerProps>}
 */
const FeedContainer: React.FC<FeedContainerProps> = ({ children, decoration = true }) => {
    return (
        <div
            className={`bg-white  w-full max-w-screen-xl shadow rounded-t-lg mx-auto ${decoration ? 'mb-4 rounded-b-lg' : 'mb-1'}`}>
            {children}
        </div>
    );
};

export default FeedContainer;
