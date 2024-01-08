import { User } from '@models/user';
export interface Tweet {
    id: number;
    user: User;
    content: string;
    image?: string;
    video?: string;
    likes: number;
    retweets: number;
    comments: number;
    createdAt: Date;
}