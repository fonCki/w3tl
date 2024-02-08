import React, { useState } from 'react';
import UpdateUserModal from '@components/UpdateUserModal';
import { User } from '@models/user/user';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';


const EditButton = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector((state: RootState) => state.auth.currentUser);

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
