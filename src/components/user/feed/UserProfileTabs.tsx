import React from 'react';

interface UserProfileTabsProps {
    activeTab: string;
    handleTabClick: (tab: string) => void;
    tabList: string[];
}

const tabIconMapping: { [key: string]: string } = {
    'Posts': 'article',
    'Replies': 'forum', // Changed to 'forum' which suggests conversation
    'Media': 'movie', // Changed to 'movie' for a more multimedia representation
    'Likes': 'favorite',
    // Add other tabs and their corresponding icons here
};

const UserProfileTabs: React.FC<UserProfileTabsProps> = ({ activeTab, handleTabClick, tabList }) => {
    return (
        <ul className="flex cursor-pointer justify-around">
            {tabList.map((tab) => (
                <li
                    key={tab}
                    className={`py-4 px-6 text-base sm:text-lg font-bold ${
                        activeTab === tab
                            ? 'border-b-2 border-custom-blue text-custom-blue'
                            : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                    }`}
                    onClick={() => handleTabClick(tab)}
                >
                    <span className="sm:hidden material-icons">
                        {tabIconMapping[tab]}
                    </span>
                    <span className="hidden sm:block">
                        {tab}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default UserProfileTabs;
