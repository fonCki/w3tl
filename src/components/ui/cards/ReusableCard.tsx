import React, { ReactNode, useState } from 'react';
import { Icon } from 'semantic-ui-react';

/**
 * Interface for the props of the ReusableCard component.
 */
interface ReusableCardProps {
    title: string;
    onActionClick: () => void;
    onShowMoreClick: () => void;
    children: ReactNode;
}

/**
 * ReusableCard component is a reusable card element with a title, action button, and additional content.
 *
 * @component
 * @category Components
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {Function} props.onActionClick - The function to be called when the action button is clicked.
 * @param {Function} props.onShowMoreClick - The function to be called when the "Show more" button is clicked.
 * @param {ReactNode} props.children - The content to be displayed inside the card.
 *
 * @returns {JSX.Element} The rendered ReusableCard component.
 */
const ReusableCard: React.FC<ReusableCardProps> = ({ title, onActionClick, onShowMoreClick, children }) => {
    const [showAd, setShowAd] = useState(true);

    if (!showAd) return null;

    return (
        <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4 mb-4 relative border border-gray-300 text-gray-600 min-w-72">
            <button className="absolute top-0 right-0 hover:text-gray-700" onClick={() => setShowAd(false)}>
                <Icon name="close" className="pt-4 pr-4 text-gray-600" />
            </button>
            <div className="p-0 m-0">
                <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
                <div onClick={onActionClick} className="cursor-pointer hover:bg-gray-100 rounded transition duration-200 ease-in-out filter grayscale brightness-10">
                    {children}
                </div>
                <div className="text-center mt-4">
                    <button className="hover:underline text-sm font-semibold" onClick={onShowMoreClick}>
                        Show more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReusableCard;
