import { User } from '@models/user';

export interface Message {
    id: number;
    sender: User;
    receiver: User;
    content: string;
    read: boolean;
    date: Date;
}
