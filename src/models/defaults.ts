
import { User } from '@models/user/user';
import { UserFull } from '@models/user/userFull';
import { Reply } from '@models/reply';
import { DataItem } from '@models/dataItem';
import { Message } from '@models/message';
import { Notification } from '@models/notification';
import { Trend } from '@models/trend';
import { Tweet } from '@models/tweet';
import { UserProfile } from '@models/user/userProfile';
import { UserRelations } from '@models/user/userRelations';


export const defaultUser: User = {
    id: "0",
    verified: false,
    username: 'Unknown',
    avatar: 'unknown-avatar',
    email: 'unknown@example.com',
    name: 'Unknown',
    lastname: 'User',
    createdAt: new Date(),
};

export const defaultUserDetails: UserFull = {
    bio: '',
    location: '',
    website: '',
    background: '',
    followersCount: 0,
    followingCount: 0,
    id: "0",
    username: 'Unknown',
    verified: false,
    avatar: 'default-avatar.png',
    email: 'unknown@example.com',
    name: 'Unknown',
    lastname: 'User',
    createdAt: new Date(),
    pub: '',
};

export const defaultComment: Reply = {
    id: "0",
    user: defaultUser,
    parentTweetId: 0,
    content: '',
    createdAt: new Date(),
};

export const defaultDataItem: DataItem = {
    id: "0",
    category: '',
    title: '',
};

export const defaultMessage: Message = {
    id: "0",
    sender: defaultUser,
    receiver: defaultUser,
    content: '',
    read: false,
    date: new Date(),
};

export const defaultNotification: Notification = {
    id: "0",
    user: 0,
    title: '',
    description: '',
    read: false,
    avatar: 'default-avatar.png',
    date: new Date(),
};

export const defaultTrend: Trend = {
    id:"0",
    hashtag: '',
    category: '',
    tweetsCount: 0,
};

export const defaultTweet: Tweet = {
    id: "0",
    user: defaultUser,
    content: '',
    image: '',
    video: '',
    likes: 0,
    retweets: 0,
    comments: 0,
    createdAt: new Date(),
};

export const defaultUserProfile: UserProfile = {
    id: "0",
    bio: '',
    location: '',
    website: '',
    background: '',
};

export const defaultUserRelations: UserRelations = {
    id: "0",
    followers: [],
    following: [],
    likedTweetIds: [],
    retweetedTweetIds: [],
    highlightedTweetIds: [],
};