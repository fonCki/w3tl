import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useCurrentUser } from '@hooks/useCurrentUser';
import Img from '@components/tools/image/Img';
import { useNavigate } from 'react-router-dom';


const HeaderDropdown = () => {
    const navigate = useNavigate();


    const currentUser = useCurrentUser(); // Using the hook
    return (
        <Dropdown
            trigger={
                <span className="inline-block">
                    <Img userDetails={currentUser} size={24} />
            </span>
            }
            pointing="top right"
            icon={null}
            className="relative"
        >
            <Dropdown.Menu
                className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                style={{ minWidth: '16rem' }}>
                <div className="px-4 py-3 flex items-center cursor-pointer" onClick={()=>navigate(`/user/${currentUser.username}`)}>
                    <Image src={currentUser.avatar} avatar />
                    <span className="ml-3 block text-xl font-bold truncate text-gray-900">@{currentUser.username}</span>
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
};
    HeaderDropdown.propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
        }),
    };

    export default HeaderDropdown;
