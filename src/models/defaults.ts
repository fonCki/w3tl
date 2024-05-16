import { User } from '@models/user/user';
import { LOCAL_DEFAULT_AVATAR_IMAGE } from '@constants/constants';
import { Tweet } from '@models/tweet';


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



// export const defaultComment: Comment = {
//     id: "0",
//     user: defaultUser,
//     parentTweetId: 0,
//     content: '',
//     createdAt: new Date(),
// };
//
// export const defaultDataItem: DataItem = {
//     id: "0",
//     category: '',
//     title: '',
// };
//
// export const defaultMessage: Message = {
//     id: "0",
//     sender: defaultUser,
//     receiver: defaultUser,
//     content: '',
//     read: false,
//     date: new Date(),
// };
//
// export const defaultNotification: Notification = {
//     id: "0",
//     user: 0,
//     title: '',
//     description: '',
//     read: false,
//     avatar: 'default-avatar.png',
//     date: new Date(),
// };
//
// export const defaultTrend: Trend = {
//     id:"0",
//     hashtag: '',
//     category: '',
//     tweetsCount: 0,
// };
//
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
    signature: '',
};
//
// export const defaultUserProfile: UserProfile = {
//     id: "0",
//     bio: '',
//     location: '',
//     website: '',
//     background: '',
// };
//
// export const defaultUserRelations: UserRelations = {
//     id: "0",
//     followers: [],
//     following: [],
//     likedTweetIds: [],
//     retweetedTweetIds: [],
//     highlightedTweetIds: [],
// };