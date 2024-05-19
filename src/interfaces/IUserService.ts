import { User } from '@models/user/user';

/**
 * Interface representing a User Service.
 * @interface
 */
export interface IUserService {
    getUserById(username: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    userExists(username: string): Promise<boolean>;
    getAllUsers(): Promise<User[]>;
    searchUsers(query: string, limit?: number): Promise<User[]>;
    getTrendingUsers(top: number): Promise<User[]>;
}
