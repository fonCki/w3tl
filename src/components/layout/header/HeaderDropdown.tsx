import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Img from '@components/tools/image/Img';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useAuth } from '@context/AuthContext';
import ConfirmationModal from '@components/ui/modals/ConfirmationModal';
import { setLoading } from '@store/slices/authSlice';

/**
 * HeaderDropdown component is a dropdown menu for user profile options in the header.
 * It provides options like profile, settings, appearance, help & feedback, and sign out.
 *
 * @returns {JSX.Element} - The rendered dropdown menu component.
 */
const HeaderDropdown = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);

    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const handleDeleteAccount = () => {
        setModalOpen(true);
    };

    const confirmDeleteAccount = () => {
        setLoading(true);
        setModalOpen(false); // Close modal after logout
        setTimeout(() => {
            setLoading(true);
            logout();
            alert('Your request to delete the account has been received. ' +
                'Your information may remain in the system for up to 30 days while we process your deletion request.');
        }, 100); // Set timeout for 3 seconds
        setLoading(false); // Deactivate loader after 3 seconds
    };


    return (
        <Dropdown
            trigger={
                <span className="inline-block p-2">
                    <Img userDetails={currentUser} onLoaded={() => {
                    }} />
            </span>
            }
            pointing="top right"
            icon={null}
            className="relative"
        >
            <Dropdown.Menu
                className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                style={{ minWidth: '16rem' }}>
                <div className="px-4 py-3 flex items-center cursor-pointer"
                     onClick={() => navigate(`/user/${currentUser?.username}`)}>
                    <Img userDetails={currentUser} size="micro" onLoaded={() => {
                    }} />
                    <span
                        className="ml-3 block text-xl font-bold truncate text-gray-900">@{currentUser?.username}</span>
                </div>
                <div className="border-t border-gray-200"></div>

                <div className="py-1">
                    <Dropdown.Item
                        text="Profile"
                        icon="user"
                        className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={() => navigate(`/user/${currentUser?.username}`)}
                    />
                    <Dropdown.Item
                        text="Settings"
                        icon="settings"
                        className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    />
                    <Dropdown.Item
                        text="Appearance"
                        icon="paint brush"
                        className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    />
                    <Dropdown.Item
                        text="Help & feedback"
                        icon="help circle"
                        className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    />
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="py-1">
                    <Dropdown.Item
                        text="Delete Account"
                        icon="trash"
                        className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={handleDeleteAccount}
                    />
                </div>
                <div className="py-1">
                    <Dropdown.Item
                        text="Sign Out"
                        icon="sign out"
                        className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={logout}
                    />
                </div>
                <ConfirmationModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={confirmDeleteAccount}
                    message="Are you sure you want to delete your account? This cannot be undone."
                    headerText="Confirm Account Deletion"
                    closeButtonText="Cancel"
                    confirmButtonText="Delete"
                />
            </Dropdown.Menu>
        </Dropdown>
    );
};
/**
 * @typedef {Object} Props - The properties passed to the HeaderDropdown component.
 * @property {string} title - The title text to be displayed in the dropdown.
 * @property {boolean} isOpen - Whether the dropdown is currently open or closed.
 * @property {Array<Object>} options - An array of objects representing the dropdown options.
 * @property {string} options.label - The label text to be displayed for the option.
 * @property {function} options.onClick - The callback function to be executed when the option is selected.
 */
HeaderDropdown.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }),
};

export default HeaderDropdown;
