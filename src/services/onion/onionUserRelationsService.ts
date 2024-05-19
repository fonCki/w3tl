import { IUserRelations } from '@interfaces/IUserRelations';
import { UserRelations } from '@models/user/userRelations';
import { BACKEND_URL } from '@constants/constants';
import { User } from '@models/user/user';

export class OnionUserRelationsService implements IUserRelations {

    async amIFollowing(followerId: string, followingId: string): Promise<{ following: boolean; error?: any }> {
        try {
            const following = await this.getFollowing(followerId);
            if (!following || !following.following || !Array.isArray(following.following)) {
                throw new Error('Invalid following data structure');
            }

            // Check if the followingId is included in the array of objects under the 'value' key
            const response = following.following.some(f => f.value === followingId);
            return { following: response };
        } catch (error) {
            return { following: false, error: error };
        }
    }

    async blockUser(userId: string, blockedUserId: string, token: string): Promise<{ success: boolean; error?: any }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/block/${blockedUserId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to block user');
        }
        return { success: true };
    }

    async followUser(followerId: string, followingId: string, token: string): Promise<{
        success: boolean;
        error?: any
    }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/follow/${followingId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to follow user');
        }
        return { success: true };
    }

    async getFollowers(userId: string): Promise<{ followers: string[]; error?: any }> {
        const response = await this.sendGetRequest(`${BACKEND_URL}/user/${userId}/followers`);
        if (!response.followers) {
            throw new Error('Failed to get followers');
        }
        return { followers: response.followers };
    }

    async getFollowersAsUser(userId: string): Promise<User[]> {
        const followers = await this.getFollowers(userId);
        if (!followers || !followers.followers || !Array.isArray(followers.followers)) {
            throw new Error('Invalid followers data structure');
        }

        // Map over the followers array and retrieve each user asynchronously
        const usersPromises = followers.followers.map(async (followObject) => {
            const user = await this.sendGetRequest(`${BACKEND_URL}/user/uid/${followObject.value}`);
            return user;
        });

        // Wait for all promises to resolve and return the array of users
        const users = await Promise.all(usersPromises);
        return users.map((user) => {
            return user.user as User;
        });
    }

    async getFollowing(userId: string): Promise<{ following: string[]; error?: any }> {
        const response = await this.sendGetRequest(`${BACKEND_URL}/user/${userId}/following`);
        if (!response.following) {
            throw new Error('Failed to get following');
        }
        return { following: response.following };
    }

    async getFollowingAsUser(userId: string): Promise<User[]> {
        const following = await this.getFollowing(userId);
        if (!following || !following.following || !Array.isArray(following.following)) {
            throw new Error('Invalid following data structure');
        }

        // Ensure that each map iteration returns a promise of a user object
        const userPromises = following.following.map(async (followObject) => {
            // Ensure that the URL and endpoint correctly target the user ID stored in followObject.value
            return this.sendGetRequest(`${BACKEND_URL}/user/uid/${followObject.value}`);
        });

        // Wait for all user promises to resolve before returning
        const users = await Promise.all(userPromises);
        return users.map((user) => {
            return user.user as User;
        });
    }


    async getUserRelations(userId: string): Promise<{ relations: UserRelations | null; error?: any }> {
        const response = await this.sendGetRequest(`${BACKEND_URL}/user/${userId}/relations`);
        if (!response.success) {
            throw new Error('Failed to get user relations');
        }
        return { relations: response.relations };
    }

    async muteUser(userId: string, mutedUserId: string, token: string): Promise<{ success: boolean; error?: any }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/mute/${mutedUserId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to mute user');
        }
        return { success: true };
    }


    async reportUser(reporterId: string, reportedUserId: string, token: string): Promise<{
        success: boolean;
        error?: any
    }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/report/${reportedUserId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to report user');
        }
        return { success: true };
    }

    async unblockUser(userId: string, blockedUserId: string, token: string): Promise<{
        success: boolean;
        error?: any
    }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/unblock/${blockedUserId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to unblock user');
        }
        return { success: true };
    }

    async unfollowUser(followerId: string, followingId: string, token: string): Promise<{
        success: boolean;
        error?: any
    }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/unfollow/${followingId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to unfollow user');
        }
        return { success: true };
    }

    async unmuteUser(userId: string, mutedUserId: string, token: string): Promise<{ success: boolean; error?: any }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/unmute/${mutedUserId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to unmute user');
        }
        return { success: true };
    }


    private async sendRequest(url: string, method: 'POST' | 'PUT' | 'PATCH', token: string, body?: string): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const response = await fetch(url, { method, headers, body });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to ${method} data: ${errorData.message}`);
        }
        return response.json();
    }

    private async sendGetRequest(url: string): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
        };
        const response = await fetch(url, { method: 'GET', headers });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch data: ${errorData.message}`);
        }
        return response.json();
    }
}