import { User } from '@models/user/user';
export interface Tweet {
    id: string;
    user: User;
    content: string;
    image?: string;
    video?: string;
    thumbnail?: string | null;
    likes: number;
    retweets: number;
    comments: number;
    createdAt: Date;
}