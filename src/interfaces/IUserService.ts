import { UserFull } from '@models/user/userFull';

export interface IUserService {
    getUserById(username: string): Promise<UserFull | undefined>;
    getUserByUsername(username: string): Promise<UserFull | undefined>;
    getAllUsers(): Promise<UserFull[]>;
    searchUsers(query: string): Promise<UserFull[]>;
    searchUsersWithLimit(query: string, limit: number): Promise<UserFull[]>;
    getFollowers(username: string): Promise<UserFull[]>;
    getFollowing(username: string): Promise<UserFull[]>;
    getUserProfile(username: string): Promise<UserFull | undefined>;
    getUserDetails(username: string): Promise<UserFull | undefined>;
    getTreandingUsers(top: number): Promise<UserFull[]>;
    getTopTenTreandingUsers(): Promise<UserFull[]>;
}
