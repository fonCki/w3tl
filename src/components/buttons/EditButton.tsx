import React, { useState } from 'react';
import UpdateUserModal from '@components/UpdateUserModal';
import { User } from '@models/user/user';

interface EditButtonProps {
    user: User;
}

const EditButton: React.FC<EditButtonProps> = ({ user }) => {
    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateUser = async (updatedUser: User) => {
        // Implement the update logic here
        // Example: await userService.updateUser(updatedUser);
        console.log('User updated:', updatedUser);
        handleClose(); // Close the modal after updating
    };

    const buttonStyle = "bg-button-green hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 w-18 sm:w-32 text-sm sm:text-base";

    return (
        <div>
            <button
                className={`${buttonStyle}`}
                onClick={handleEdit}>
                Edit profile
            </button>
            <UpdateUserModal
                isOpen={open}
                onClose={handleClose}
                user={user}
                onUpdateUser={handleUpdateUser}
            />
        </div>
    );
};

export default EditButton;
