import React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';

interface MySidebarProps {
    visible: boolean;
    onClose: () => void;
}
export const MySidebar: React.FC<MySidebarProps> = ({ visible, onClose }) => {
    return (
        <Sidebar
            as={Menu}
            animation='push'
            onHide={onClose}
            vertical
            visible={visible}
            className="h-full z-20"
            style={{ width: '250px', top: '4rem' }} // Custom width and top offset
        >
            <div className="flex flex-col">
                <Menu.Item as='a' className="hover:bg-gray-200 p-2">
                    <Icon name='home' />
                    Home
                </Menu.Item>
                <Menu.Item as='a' className="hover:bg-gray-200 p-2">
                    <Icon name='find' className="mr-2" />
                    Explore Communities
                </Menu.Item>
                <Menu.Item as='a' className="hover:bg-gray-200 py-4">
                    <Icon name='list' className="mr-2" />
                    List
                </Menu.Item>
                <Menu.Item as='a' className="hover:bg-gray-200 py-4">
                    <Icon name='bookmark' className="mr-2" />
                    Bookmarks
                </Menu.Item>
                <Menu.Item as='a' className="hover:bg-gray-200 py-4">
                    <Icon name='calendar' className="mr-2" />
                    Events
                </Menu.Item>
                <Menu.Item as='a' className="hover:bg-gray-200 py-4">
                    <Icon name='users' className="mr-2" />
                    Followers
                </Menu.Item>
        </div>
        </Sidebar>
    );
};
