// UserProfileDropdown.tsx
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

interface UserProfileTabsProps {
    activeTab: string;
    handleTabClick: (tab: string) => void;
    tabList: string[];
}

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
