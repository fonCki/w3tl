// src/interfaces/IUserRelations.ts

import { UserRelations } from '@models/user/userRelations';
import { User } from '@models/user/user';

/**
 * Represents a class that provides methods for managing user relations.
 */
export interface IUserRelations {
    getUserRelations(userId: string): Promise<{ relations: UserRelations | null; error?: any }>;
    getFollowers(userId: string): Promise<{ followers: string[]; error?: any }>;
    getFollowing(userId: string): Promise<{ following: string[]; error?: any }>;
    amIFollowing(followerId: string, followingId: string): Promise<{ following: boolean; error?: any }>;

    followUser(followerId: string, followingId: string, token: string): Promise<{ success: boolean; error?: any }>;

    unfollowUser(followerId: string, followingId: string, token: string): Promise<{ success: boolean; error?: any }>;

    blockUser(userId: string, blockedUserId: string, token: string): Promise<{ success: boolean; error?: any }>;

    unblockUser(userId: string, blockedUserId: string, token: string): Promise<{ success: boolean; error?: any }>;

    muteUser(userId: string, mutedUserId: string, token: string): Promise<{ success: boolean; error?: any }>;

    unmuteUser(userId: string, mutedUserId: string, token: string): Promise<{ success: boolean; error?: any }>;

    reportUser(reporterId: string, reportedUserId: string, token: string): Promise<{ success: boolean; error?: any }>;
    getFollowersAsUser(userId: string): Promise<User[]>;
    getFollowingAsUser(userId: string): Promise<User[]>;
}
