import messagesMock from '@data/Json/messagesMock.json';

export const messageService = {
    getMessagesByusername(username: number) {
        return messagesMock.filter(message =>
            message.sender.id === username || message.receiver.id === username
        );
    },

    getMessageById(messageId: number) {
        return messagesMock.find(message => message.id === messageId);
    }
};
