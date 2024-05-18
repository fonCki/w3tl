import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store'; // Import an icon

/**
 * Interface representing the properties of a FeedTitle component.
 */
interface FeedTitleProps {
    title?: string;
    showUser?: boolean;
}

/**
 * FeedTitle is a functional component that displays a title with an optional user icon and username.
 *
 * @param {Object} props - The properties of the FeedTitle component.
 * @param {string} props.title - The title to be displayed.
 * @param {boolean} [props.showUser=true] - Determines whether to show the user icon and username.
 * @returns {JSX.Element} The rendered FeedTitle component.
 */
const FeedTitle: React.FC<FeedTitleProps> = ({ title, showUser = true }) => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    return (
        <div className="flex items-center justify-start align-middle p-1 m-1">
                <p className="text-3xl font-bold text-gray-600">
                    {title}
                    {showUser && (
                        <>
                            {/*<span className="text-gray-500 mx-2">·</span> */}
                            <br />
                            {/*<FaUser className="inline text-xl text-gray-500 mr-1" /> /!* User icon *!/*/}
                            <span className="italic text-gray-500 text-xl">@{currentUser?.username}</span>
                        </>
                    )}
                </p>
            </div>
    );
};

export default FeedTitle;
