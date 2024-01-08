// src/services/userService.ts
import usersMock from '@data/usersMock.json';

const getUserById = async (userId: number) => {
    // Replace with actual API call when ready
    return usersMock.find(user => user.id === userId);
};

export const userService = {
    getUserById,
};
