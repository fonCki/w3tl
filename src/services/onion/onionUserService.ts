import { IUserService } from '@interfaces/IUserService';
import { User } from '@models/user/user';
import { BACKEND_URL } from '@constants/constants';

export class OnionUserService implements IUserService {
    async getAllUsers(): Promise<User[]> {
        const response = await this.fetchWithAuth('users');
        const users = await response.json() as any;
        return Promise.all(users.users.map(this.mapUser));
    }

    async getUserById(uid: string): Promise<User | undefined> {
        const response = await this.fetchWithAuth(`user/uid/${uid}`);
        const user = await response.json();
        return this.mapUser(user.user);
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        const response = await this.fetchWithAuth(`user/username/${username}`);
        const user = await response.json();
        return this.mapUser(user.user);
    }

    async searchUsers(query: string, limit?: number): Promise<User[]> {
        const response = await this.fetchWithAuth(`users/search?q=${query}&limit=${limit}`);
        const users = await response.json() as any[];
        return Promise.all(users.map(this.mapUser));
    }

    async userExists(username: string): Promise<boolean> {
        return false;
        //TODO: Implement this
        // const response = await this.getUserByUsername(username);
        // //if response is NotFound
        // return !!response;
    }

    async getTrendingUsers(top: number): Promise<User[]> {
        return await this.getAllUsers();
    }

    private async fetchWithAuth(endpoint: string, token?: string, method: 'GET' | 'PUT' | 'POST' | 'DELETE' = 'GET', body?: any): Promise<Response> {
        const headers = {
            'Content-Type': 'application/json',
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
        if (responseData && responseData.createdAt) {
            responseData.banner = responseData.background;
            const date = new Date(parseInt(responseData.createdAt) * 1000);
            responseData.createdAt = date.toISOString();
        }
        return responseData as User;
    }
}