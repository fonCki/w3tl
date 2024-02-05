// src/services/firebase/firebaseUserRelationsService.ts

import { db } from '@services/firebase/config/firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { IUserRelations } from '@interfaces/IUserRelations';
import { UserRelations } from '@models/user/userRelations';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';

export class firebaseUserRelationsService implements IUserRelations {

    private async ensureUserRelationsDocExists(userId: string): Promise<void> {
        const userRelationsRef = doc(db, 'userRelations', userId);
        const docSnapshot = await getDoc(userRelationsRef);
        if (!docSnapshot.exists()) {
            // Initialize empty user relations
            const newUserRelations: UserRelations = {
                id: userId,
                followers: [],
                following: [],
                blockedUsers: [],
                mutedUsers: [],
                reportedUsers: [],
                likedTweetIds: [],
                retweetedTweetIds: [],
                highlightedTweetIds: []
            };
            await setDoc(userRelationsRef, newUserRelations);
        }
    }


    private async updateRelations(userId: string, field: keyof UserRelations, value: string, add: boolean): Promise<{ success: boolean; error?: any }> {
        try {
            await this.ensureUserRelationsDocExists(userId);
        } catch (error: any) {
            return { success: false, error: error.message };
        }
        try {
            const userRelationsRef = doc(db, 'userRelations', userId);
            await updateDoc(userRelationsRef, {
                [field]: add ? arrayUnion(value) : arrayRemove(value)
            });
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
    async getUserRelations(userId: string): Promise<{ relations: UserRelations | null; error?: any }> {
        try {
            const userRelationsRef = doc(db, 'userRelations', userId);
            const docSnapshot = await getDoc(userRelationsRef);
            if (docSnapshot.exists()) {
                return { relations: docSnapshot.data() as UserRelations };
            }
            return { relations: null };
        } catch (error) {
            return { error, relations: null };
        }
    }
    async getFollowers(userId: string): Promise<{ followers: string[]; error?: any }> {
        const response = await this.getUserRelations(userId);
        if (response.error) {
            return { followers: [], error: response.error };
        }
        return { followers: response.relations?.followers || [] };
    }

    // Similarly, optimize getFollowing method
    async getFollowing(userId: string): Promise<{ following: string[]; error?: any }> {
        const response = await this.getUserRelations(userId);
        if (response.error) {
            return { following: [], error: response.error };
        }
        return { following: response.relations?.following || [] };
    }

    amIFollowing(myId: string, followingId: string): Promise<{ following: boolean; error?: any; }> {
        return new Promise(async (resolve) => {
            const response = await this.getFollowing(myId);
            if (response.error) {
                resolve({ following: false, error: response.error });
            }
            resolve({ following: response.following.includes(followingId) });
        });
    }
    async followUser(myId: string, followUserId: string): Promise<{ success: boolean; error?: any }> {
        console.log('Updating following for', myId);
        const response = await this.updateRelations(myId, 'following', followUserId, true);
        console.log('response', response);
        if (response.success) {
            console.log('Updating followers for', followUserId);
            await this.updateRelations(followUserId, 'followers', myId, true);
            console.log('Updated followers for', followUserId);
        }
        return response;
    }

    async unfollowUser(myId: string, unfollowUserId: string): Promise<{ success: boolean; error?: any }> {
        const response = await this.updateRelations(myId, 'following', unfollowUserId, false);
        if (response.success) {
            await this.updateRelations(unfollowUserId, 'followers', myId, false);
        }
        return response;
    }

    async blockUser(userId: string, blockUserId: string): Promise<{ success: boolean; error?: any }> {
        return this.updateRelations(userId, 'blockedUsers', blockUserId, true);
    }

    async unblockUser(userId: string, unblockUserId: string): Promise<{ success: boolean; error?: any }> {
        return this.updateRelations(userId, 'blockedUsers', unblockUserId, false);
    }

    async muteUser(userId: string, muteUserId: string): Promise<{ success: boolean; error?: any }> {
        return this.updateRelations(userId, 'mutedUsers', muteUserId, true);
    }

    async unmuteUser(userId: string, unmuteUserId: string): Promise<{ success: boolean; error?: any }> {
        return this.updateRelations(userId, 'mutedUsers', unmuteUserId, false);
    }

    async reportUser(userId: string, reportUserId: string): Promise<{ success: boolean; error?: any }> {
        return this.updateRelations(userId, 'reportedUsers', reportUserId, true);
    }

    async getFollowersAsUser(userId: string): Promise<User[]> {
        if (!userId) {
            console.error('Invalid userId in getFollowersAsUser:', userId);
            return [];
        }
        const userService = ServiceFactory.getUserService();
        const userRelationsRef = doc(db, 'userRelations', userId);
        const docSnap = await getDoc(userRelationsRef);

        if (docSnap.exists()) {
            const userRelations = docSnap.data();
            return Promise.all(userRelations.followers.map((followerId: string) => userService.getUserById(followerId)));
        }
        return [];
    }

    async getFollowingAsUser(userId: string): Promise<User[]> {
        if (!userId) {
            console.error('Invalid userId in getFollowingAsUser:', userId);
            return [];
        }

        const userService = ServiceFactory.getUserService();
        const userRelationsRef = doc(db, 'userRelations', userId);
        const docSnap = await getDoc(userRelationsRef);

        if (docSnap.exists()) {
            const userRelations = docSnap.data();
            return Promise.all(userRelations.following.map((followingId: string) => userService.getUserById(followingId)));
        }
        return [];
    }

}
