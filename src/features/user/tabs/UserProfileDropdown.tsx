// UserProfileDropdown.tsx
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

/**
 * Represents the props for the UserProfileTabs component.
 *
 * @typedef {Object} UserProfileTabsProps
 * @property {string} activeTab - The currently active tab.
 * @property {function(string): void} handleTabClick - The function to be called when a tab is clicked, which receives the clicked tab as a parameter.
 * @property {string[]} tabList - The list of tabs to be displayed.
 */
interface UserProfileTabsProps {
    activeTab: string;
    handleTabClick: (tab: string) => void;
    tabList: string[];
}

/**
 * UserProfileDropdown component displays a dropdown menu with a list of tabs for the user profile.
 *
 * @component
 * @category Components
 *
 * @param {object} props - The component props.
 * @param {string} props.activeTab - The currently active tab.
 * @param {function} props.handleTabClick - The function to be called when a tab is clicked.
 * @param {Array<string>} props.tabList - The list of tabs to be displayed in the dropdown menu.
 *
 * @returns {JSX.Element} The rendered UserProfileDropdown component.
 */
const UserProfileDropdown: React.FC<UserProfileTabsProps> = ({ activeTab, handleTabClick, tabList }) => {
    return (
        <Dropdown
            text={activeTab}
            icon="bars"
            floating
            labeled
            button
            className="icon w-full text-right"

            style={{ color: 'custom-gray', backgroundColor: 'custom-gray' }}
        >
            <Dropdown.Menu>
                {tabList.map((tab) => (
                    <Dropdown.Item
                        key={tab}
                        text={tab}
                        active={activeTab === tab}
                        onClick={() => handleTabClick(tab)}
                    />
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserProfileDropdown;
