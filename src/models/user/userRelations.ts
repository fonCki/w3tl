import { User } from '@models/user/user';
import { BaseEntity } from '@models/post/base';

/**
 * The UserRelations interface represents the relationship between a user and other users and tweets.
 */
export interface UserRelations {
    userId: string;                     // User's unique identifier
    followers: User['userId'][];            // Array of user IDs who are followers
    following: User['userId'][];            // Array of user IDs who the user is following
    blockedUsers: User['userId'][];         // Array of user IDs who are blocked
    mutedUsers: User['userId'][];           // Array of user IDs who are muted
    reportedUsers: User['userId'][];         // Array of user IDs who are reported
    likedTweetIds: BaseEntity['postId'][];       // Array of tweet IDs that the user has liked
    retweetedTweetIds: BaseEntity['postId'][]; // Array of tweet IDs that the user has retweeted
    highlightedTweetIds: BaseEntity['postId'][];  // Array of tweet IDs that the user has highlighted
}
