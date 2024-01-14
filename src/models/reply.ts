// src/models/reply.ts
import { User } from '@models/user/user';

export interface Reply {
    id: number;
    user: User;
    parentTweetId: number; // ID of the parent tweet to which this is a reply
    content: string;
    createdAt: Date;
}
