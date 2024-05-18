import { BaseEntity } from '@models/post/base';

/**
 * Represents a comment on a tweet.
 *
 * @interface
 * @extends BaseEntity
 */
export interface Comment extends BaseEntity {
    parentTweetId: string; // ID of the parent tweet to which this is a reply
}
