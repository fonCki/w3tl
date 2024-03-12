// src/models/tweet.ts
import { BaseEntity } from './base';

export interface Tweet extends BaseEntity {
    mediaUrl?: string;
    mediaType?: string;
    thumbnail?: string | null;
    retweets: number;
    comments: number;
}
