import { User } from '@models/user/user';

export interface IUserService {
    getUserById(uid: string, token: string): Promise<User | undefined>;

    getUserByUsername(username: string, token: string): Promise<User | undefined>;

    userExists(username: string, token: string): Promise<boolean>;

    getAllUsers(token: string): Promise<User[]>;

    searchUsers(query: string, token: string, limit?: number): Promise<User[]>;

    getTrendingUsers(token: string, top: number): Promise<User[]>;
}
