// src/interfaces/IUserRelations.ts

import { UserRelations } from '@models/user/userRelations';
import { User } from '@models/user/user';

export interface IUserRelations {
    getUserRelations(userId: string): Promise<{ relations: UserRelations | null; error?: any }>;
    followUser(followerId: string, followingId: string): Promise<{ success: boolean; error?: any }>;
    amIFollowing(followerId: string, followingId: string): Promise<{ following: boolean; error?: any }>;
    unfollowUser(followerId: string, followingId: string): Promise<{ success: boolean; error?: any }>;
    blockUser(userId: string, blockedUserId: string): Promise<{ success: boolean; error?: any }>;
    unblockUser(userId: string, blockedUserId: string): Promise<{ success: boolean; error?: any }>;
    muteUser(userId: string, mutedUserId: string): Promise<{ success: boolean; error?: any }>;
    unmuteUser(userId: string, mutedUserId: string): Promise<{ success: boolean; error?: any }>;
    reportUser(reporterId: string, reportedUserId: string): Promise<{ success: boolean; error?: any }>;
    getFollowers(userId: string): Promise<{ followers: string[]; error?: any }>;
    getFollowing(userId: string): Promise<{ following: string[]; error?: any }>;
    getFollowersAsUser(userId: string): Promise<User[]>;
    getFollowingAsUser(userId: string): Promise<User[]>;
}
