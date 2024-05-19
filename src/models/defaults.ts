import { User } from '@models/user/user';
import { LOCAL_DEFAULT_AVATAR_IMAGE } from '@constants/constants';
import { Tweet } from '@models/post/tweet';


/**
 * Represents the default user object.
 *
 * @typedef {Object} User
 * @property {string} userId - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} name - The name of the user.
 * @property {string} lastname - The last name of the user.
 * @property {string} email - The email of the user.
 * @property {string} avatar - The URL or path to the user's avatar image.
 * @property {string} bio - The bio or description of the user.
 * @property {string} location - The location of the user.
 * @property {string} website - The website of the user.
 * @property {boolean} verified - Whether the user is verified or not.
 * @property {string} createdAt - The date and time when the user was created in ISO 8601 format.
 * @property {number} followersCount - The number of followers the user has.
 * @property {number} followingCount - The number of users the user is following.
 * @property {string} background - The URL or path to the user's background image.
 * @property {string} pub - The public information about the user.
 */
export const defaultUser: User = {
    userId: "0",
    username: 'default',
    name: 'unknown',
    lastname: 'user',
    email: 'unknown@example.com',
    avatar: LOCAL_DEFAULT_AVATAR_IMAGE,
    bio: '',
    location: '',
    website: '',
    verified: false,
    createdAt: new Date().toISOString(),
    followersCount: 0,
    followingCount: 0,
    background: LOCAL_DEFAULT_AVATAR_IMAGE,
    pub: '',
};

/**
 * Represents the default tweet object.
 *
 * @typedef {object} Tweet
 * @property {string} postId - The unique identifier of the post.
 * @property {string} userId - The user ID of the tweet author.
 * @property {string} content - The content of the tweet.
 * @property {number} likes - The number of likes the tweet has.
 * @property {string} mediaUrl - The URL of the media attached to the tweet.
 * @property {string} mediaType - The type of media attached to the tweet.
 * @property {number} retweets - The number of retweets the tweet has.
 * @property {number} comments - The number of comments the tweet has.
 * @property {string} createdAt - The timestamp of when the tweet was created.
 * @property {string} signature - The signature of the tweet.
 *
 * @constant {Tweet}
 * @default
 */
export const defaultTweet: Tweet = {
    postId: "0",
    userId: defaultUser.userId,
    content: '',
    likes: 0,
    mediaUrl: '',
    mediaType: '',
    retweets: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
    signature: '3fa7b8c16da242dfb517c7da264349feda291112baba6dcb12fd234567890abc3fa7b8c16da242dfb517c7da264349feda291112baba6dcb12fd234567890abc',

};
