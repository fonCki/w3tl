import { User } from '@models/user';

export interface Comment {
    id: number;
    user: User;
    tweetId: number;
    content: string;
    date: Date;
}
