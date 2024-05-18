import React from 'react';

/**
 * Represents the properties for UserProfileTabs component.
 */
interface UserProfileTabsProps {
    activeTab: string;
    handleTabClick: (tab: string) => void;
    tabList: string[];
}

/**
 * A mapping of tabs to their corresponding icon names.
 *
 * @type {Object.<string, string>}
 * @property {string} - The name of the tab.
 * @property {string} - The name of the corresponding icon.
 *
 * @example
 *
 * // Usage:
 * const tabIconMapping = {
 *   'Posts': 'article',
 *   'Replies': 'forum', // Changed to 'forum' which suggests conversation
 *   'Media': 'movie', // Changed to 'movie' for a more multimedia representation
 *   'Likes': 'favorite',
 *   // Add other tabs and their corresponding icons here
 * };
 *
 * // Accessing the tab icon:
 * const postsIcon = tabIconMapping['Posts']; // Output: 'article'
 * const repliesIcon = tabIconMapping['Replies']; // Output: 'forum'
 */
const tabIconMapping: { [key: string]: string } = {
    'Posts': 'article',
    'Replies': 'forum', // Changed to 'forum' which suggests conversation
    'Media': 'movie', // Changed to 'movie' for a more multimedia representation
    'Likes': 'favorite',
    // Add other tabs and their corresponding icons here
};

/**
 * `UserProfileTabs` is a functional component that renders a list of tabs for a user profile.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.activeTab - The active tab
 * @param {function} props.handleTabClick - The function to handle tab click event
 * @param {Array} props.tabList - The list of tabs
 * @returns {JSX.Element} - The rendered component
 */
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
