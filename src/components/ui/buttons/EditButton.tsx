import React, { useState } from 'react';
import UpdateUserModal from '@components/ui/forms/UpdateUserModal';
import { User } from '@models/user/user';

/**
 * Represents the properties for the EditButton component.
 *
 * @interface EditButtonProps
 */
interface EditButtonProps {
    user: User;
}

/**
 * EditButton component
 *
 * A component that renders a button for editing a user's profile.
 * This component utilizes a modal component, UpdateUserModal, to display a form for updating the user's information.
 *
 * @component
 * @example
 * // Renders a button for editing the user's profile
 * <EditButton user={currentUser} />
 *
 * @param {Object} props - The component props
 * @param {User} props.user - The user object
 * @returns {JSX.Element} The JSX element representing the EditButton component
 */
const EditButton: React.FC<EditButtonProps> = ({ user }) => {
    const [open, setOpen] = useState(false);


    const handleEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateUser = async (updatedUser: User) => {
        handleClose(); // Close the modal after updating
    };

    return (
        <div>
            <button
                className="bg-button-green hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 w-18 sm:w-32 text-sm sm:text-base"
                onClick={handleEdit}>
                Edit profile
            </button>
            <UpdateUserModal
                isOpen={open}
                onClose={handleClose}
                user={user!}
                onUpdateUser={handleUpdateUser}
            />
        </div>
    );
};

export default EditButton;
