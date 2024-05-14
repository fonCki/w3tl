import { User } from '@models/user/user';

export interface IUserService {
    getUserById(uid: string): Promise<User | undefined>;

    getUserByUsername(username: string): Promise<User | undefined>;

    userExists(username: string): Promise<boolean>;

    getAllUsers(): Promise<User[]>;

    searchUsers(query: string, limit?: number): Promise<User[]>;

    getTrendingUsers(top: number): Promise<User[]>;
}
