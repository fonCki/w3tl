// src/services/messageService.ts
import messagesMock from '@data/messagesMock.json';
import { userService } from '@services/userService';

const getMessages = async () => {
    // Replace with actual API call when ready
    const messagesWithUserDetails = await Promise.all(messagesMock.map(async (msg) => {
        const senderDetails = await userService.getUserById(msg.sender.id);
        return {
            ...msg,
            sender: senderDetails || msg.sender
        };
    }));
    return messagesWithUserDetails;
};

export const messageService = {
    getMessages,
};
