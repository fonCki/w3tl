import { Message } from '@models/message';
import { IMessageService } from '@interfaces/IMessageService'; // Adjust the import path as necessary

/**
 * Represents a mock implementation of a message service.
 *
 * @type {Message[]}
 */
const messagesMock: Message[] = [];

/**
 * Represents a service for managing messages.
 * @implements {IMessageService}
 */
export class MessageService implements IMessageService {
    getMessageById(messageId: string): Promise<Message | undefined> {
        const message = messagesMock.find((msg) => msg.id === messageId);
        return Promise.resolve(message);
    }

    getMessages(limit: number): Promise<Message[]> {
        return Promise.resolve(messagesMock.slice(0, limit));
    }

    getMessagesByUserId(userId: string): Promise<Message[]> {
        return Promise.resolve([]);
    }

    getMessagesByusername(username: string): Promise<Message[]> {
        return Promise.resolve([]);
    }

}
