// src/models/comment.ts
import { BaseEntity } from './base';

export interface Comment extends BaseEntity {
    parentTweetId: string; // ID of the parent tweet to which this is a reply
}
