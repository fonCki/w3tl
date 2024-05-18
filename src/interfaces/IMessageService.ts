import { Message } from '@models/message';

/**
 * Represents a service for handling messages.
 */
export interface IMessageService {
    getMessagesByUserId(userId: string): Promise<Message[]>;

    getMessageById(messageId: string): Promise<Message | undefined>;

    getMessagesByusername(username: string): Promise<Message[]>;

    getMessages(limit: number): Promise<Message[]>;
}