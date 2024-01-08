import { User } from '@models/user';

export interface Notification {
    id: number;
    title: string;
    description: string;
    read: boolean;
    avatar: String;
    date: Date;
}