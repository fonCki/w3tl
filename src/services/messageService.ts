import messagesMock from '@data/messagesMock.json';

export const messageService = {
    getMessagesByUserId(userId: number) {
        return messagesMock.filter(message =>
            message.sender.id === userId || message.receiver.id === userId
        );
    },

    getMessageById(messageId: number) {
        return messagesMock.find(message => message.id === messageId);
    }
};
