import { User } from '@models/user/user';

export interface IUserService {
    getUserById(username: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    getAllUsers(): Promise<User[]>;
    searchUsers(query: string): Promise<User[]>;
    searchUsersWithLimit(query: string, limit: number): Promise<User[]>;
    getFollowers(username: string): Promise<User[]>;
    getFollowing(username: string): Promise<User[]>;
    getUserProfile(username: string): Promise<User | undefined>;
    getUserDetails(username: string): Promise<User | undefined>;
    getTreandingUsers(top: number): Promise<User[]>;
    getTopTenTreandingUsers(): Promise<User[]>;
}
