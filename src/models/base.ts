// src/models/base.ts
import { User } from '@models/user/user';

export interface BaseEntity {
    postId: string;
    userId: User['userId'];
    content: string;
    likes: number;
    createdAt: string;
}

