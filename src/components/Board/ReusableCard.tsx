import React, { useState, ReactNode } from 'react';
import { Icon } from 'semantic-ui-react';

// Define an interface for your component's props
interface ReusableCardProps {
    title: string;
    onActionClick: () => void;
    onShowMoreClick: () => void;
    children: ReactNode;
}

const ReusableCard: React.FC<ReusableCardProps> = ({ title, onActionClick, onShowMoreClick, children }) => {
    const [showAd, setShowAd] = useState(true);

    if (!showAd) return null;

    return (
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg pl-4 pr-4 mb-4 pt-1 relative border border-gray-300 text-gray-600 min-w-72">
            <button className="absolute top-0 right-0 hover:text-gray-700" onClick={() => setShowAd(false)}>
                <Icon name="close" className="pt-4 pr-4 text-gray-600" />
            </button>
            <div className="p-0 m-0">
                <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
                <div onClick={onActionClick} className="cursor-pointer hover:bg-gray-100 rounded transition duration-200 ease-in-out filter grayscale">
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
