import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store'; // Adjust the import path as necessary

/**
 * ReduxStateDisplay is a React functional component that displays the current state of Redux store.
 *
 * @function ReduxStateDisplay
 * @returns {React.Element} The Redux state display component.
 */
export const ReduxStateDisplay: React.FC = () => {
    const userState = useSelector((state: RootState) => state.auth);
    const menuState = useSelector((state: RootState) => state.menu);
    const loadingState = useSelector((state: RootState) => state.loading);
    const searchState = useSelector((state: RootState) => state.search);
    const notificationsState = useSelector((state: RootState) => state.notifications);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 100 });

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            setPosition({
                x: position.x + e.movementX,
                y: position.y + e.movementY,
            });
        }
    };
    return (
        <div
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '10px',
                zIndex: 9999,
                cursor: isDragging ? 'grabbing' : 'grab',
                overflow: 'auto',
                maxHeight: '400px', // Adjust as needed
                resize: 'both', // Enables resizing
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp} // To stop dragging when the mouse leaves the component
            onMouseMove={onMouseMove}
        >
            <h3>Redux State Display</h3>
            <pre>User State: {JSON.stringify(userState, null, 2)}</pre>
            {/*<pre>Menu Statine: {JSON.stringify(menuState, null, 2)}</pre>*/}
            {/*<pre>Loading State: {JSON.stringify(loadingState, null, 2)}</pre>*/}
            {/*<pre>Search State: {JSON.stringify(searchState, null, 2)}</pre>*/}
            {/*<pre>Notifications State: {JSON.stringify(notificationsState, null, 2)}</pre>*/}
            {/* Display other states here if needed */}
        </div>
    );
};
