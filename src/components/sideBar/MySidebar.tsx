import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

//create Interface for MySidebar
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
            width='thin'
            labeled
            className="h-full z-20"
        >

            <Menu.Item as='a'>
                <Icon name='home' />
                Home
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='gamepad' />
                Games
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='camera' />
                Channels
            </Menu.Item>
            {/* Add more menu items as needed */}
        </Sidebar>
    );
};
