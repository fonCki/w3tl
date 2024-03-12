import { Message } from '@models/message'; // Adjust the import path as necessary

const messagesMock: Message[] = [
    // Add mock data according to your needs. Example:
    {
        id: '1',
        sender: 'user1',
        receiver: 'user2',
        content: 'Hello from user1 to user2',
        read: false,
        date: '2024-03-15T09:00:00Z',
    },
    {
        id: '2',
        sender: 'user2',
        receiver: 'user1',
        content: 'Hello from user2 to user1',
        read: false,
        date: '2024-03-15T10:00:00Z',
    },
    // Add more as needed
];

export const messageService = {
    getMessagesByUserId(userId: string) { // Assuming userId should be a string to match Message model
        return messagesMock.filter(message =>
            message.sender === userId || message.receiver === userId
        );
    },

    getMessageById(messageId: string) { // messageId should be a string to match Message model
        return messagesMock.find(message => message.id === messageId);
    }
};
