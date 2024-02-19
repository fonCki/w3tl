import { User } from '@models/user/user';

export interface IUserService {
    //TODO handle errors
    getUserById(username: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    userExists(username: string): Promise<boolean>;
    getAllUsers(): Promise<User[]>;
    searchUsers(query: string, limit?: number): Promise<User[]>;
    getTreandingUsers(top: number): Promise<User[]>;
}
