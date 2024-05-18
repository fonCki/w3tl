import { User } from '@models/user/user';

/**
 * Represents the base entity data structure.
 */
export interface BaseEntity {
    postId: string;
    userId: User['userId'];
    content: string;
    likes: number;
    createdAt: string;
    signature: string;
}

