import React from 'react';
import { Dropdown, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';


// URL to a random user avatar image
const userAvatar = 'https://i.pravatar.cc/150?img=3';

const DropdownExampleDropdown = () => (
    <Dropdown
        trigger={
            <span className="inline-block">
                <Image src={userAvatar} avatar style={{'font-size':24}} />
                {/*<Icon name="dropdown" className="text-gray-700" />*/}
            </span>
        }
        pointing="top right"
        icon={null}
        className="relative"
    >
        <Dropdown.Menu
            className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            style={{ minWidth: '16rem' }}>
            <div className="px-4 py-3 flex items-center">
                <Image src={userAvatar} avatar />
                <span className="ml-3 block text-xl font-bold truncate text-gray-900">@alfonsoridao</span>
            </div>
            <div className="border-t border-gray-200"></div>

            <div className="py-1">
                <Dropdown.Item
                    text="Your Channel"
                    icon="user"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
                <Dropdown.Item
                    text="Purchases and Memberships"
                    icon="credit card"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
                <Dropdown.Item
                    text="YouTube Studio"
                    icon="video camera"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
                <Dropdown.Item
                    text="Switch Account"
                    icon="exchange"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />

            </div>
            <div className="border-t border-gray-200"></div>
            <div className="py-1">
                <Dropdown.Item
                    text="Appearance: Device theme"
                    icon="paint brush"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
                <Dropdown.Item
                    text="Language: English"
                    icon="globe"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
                <Dropdown.Item
                    text="Settings"
                    icon="settings"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
                <Dropdown.Item
                    text="Your data in YouTube"
                    icon="database"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
            </div>
            <div className="border-t border-gray-200"></div>
            <div className="py-1">
                <Dropdown.Item
                    text="Help"
                    icon="help circle"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
                <Dropdown.Item
                    text="Sign Out"
                    icon="sign out"
                    className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                />
            </div>
        </Dropdown.Menu>
    </Dropdown>
);

DropdownExampleDropdown.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }),
};

export default DropdownExampleDropdown;
