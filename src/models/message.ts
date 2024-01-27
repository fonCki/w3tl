import { User } from '@models/user/user';

export interface Message {
    id: string;
    sender: User;
    receiver: User;
    content: string;
    read: boolean;
    date: Date;
}
