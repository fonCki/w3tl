// src/models/tweet.ts
import { BaseEntity } from '@models/post/base';

/**
 * Represents a Tweet.
 * @interface Tweet
 * @extends BaseEntity
 */
export interface Tweet extends BaseEntity {
    mediaUrl?: string;
    mediaType?: string;
    thumbnail?: string | null;
    retweets: number;
    comments: number;
}
