// src/models/tweet.ts
import { BaseEntity } from './base';

export interface Tweet extends BaseEntity {
    image?: string;
    video?: string;
    thumbnail?: string | null;
    retweets: number;
    comments: number;
}
