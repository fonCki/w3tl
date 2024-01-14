import { User } from '@models/user/user';

export interface Message {
    id: number;
    sender: User;
    receiver: User;
    content: string;
    read: boolean;
    date: Date;
}
