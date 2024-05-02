import { IUserService } from '@interfaces/IUserService';
import { User } from '@models/user/user';
import { BACKEND_URL } from '@constants/constants';

export class OnionUserService implements IUserService {
    async getAllUsers(token: string): Promise<User[]> {
        const response = await this.fetchWithAuth('users', token);
        const users = await response.json() as any[];
        return Promise.all(users.map(this.mapUser));
    }

    async getUserById(uid: string, token: string): Promise<User | undefined> {
        const response = await this.fetchWithAuth(`users/uid/${uid}`, token);
        const user = await response.json();
        return this.mapUser(user);
    }

    async getUserByUsername(username: string, token: string): Promise<User | undefined> {
        const response = await this.fetchWithAuth(`users/username/${username}`, token);
        const user = await response.json();
        return this.mapUser(user);
    }

    async searchUsers(query: string, token: string, limit?: number): Promise<User[]> {
        const response = await this.fetchWithAuth(`users/search?q=${query}&limit=${limit}`, token);
        const users = await response.json() as any[];
        return Promise.all(users.map(this.mapUser));
    }

    async userExists(username: string, token: string): Promise<boolean> {
        return false;
        // try {
        //     const user = await this.getUserByUsername(username, token);
        //     return user !== undefined;
        // } catch (error) {
        //     console.error("Error checking if user exists:", error);
        //     return false;
        // }
    }

    async getTrendingUsers(token: string, top: number): Promise<User[]> {
        const response = await this.fetchWithAuth(`users/trending?top=${top}`, token);
        const users = await response.json() as any[];
        return Promise.all(users.map(this.mapUser));
    }

    private async fetchWithAuth(endpoint: string, token: string, method: 'GET' | 'PUT' | 'POST' | 'DELETE' = 'GET', body?: any): Promise<Response> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const config: RequestInit = {
            method,
            headers,
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(`${BACKEND_URL}/${endpoint}`, config);
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${endpoint}`);
        }
        return response;
    }

    private async mapUser(responseData: any): Promise<User> {
        if (responseData.user && responseData.user.createdAt) {
            responseData.user.banner = responseData.user.background;
            const date = new Date(parseInt(responseData.user.createdAt) * 1000);
            responseData.user.createdAt = date.toISOString();
        }
        return responseData.user as User;
    }
}