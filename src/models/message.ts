import { User } from '@models/user/user';

/**
 * Represents a message.
 *
 * @interface Message
 */
export interface Message {
    id: string;
    sender: User['userId']
    receiver: User['userId']
    content: string;
    read: boolean;
    date: string;
}
