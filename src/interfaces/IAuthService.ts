// src/interfaces/IAuthService.ts
import { UserFull } from '@models/user/userFull';

export interface IAuthService {
    createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<{ success: boolean; newUser?: UserFull; error?: any }>;
    getCurrentUser(): Promise<UserFull | undefined>;
    authenticate(username: string, password: string): Promise<{ success: boolean; user?: UserFull; error?: any }>;
    isAuthenticated(): boolean;
    logout(): void;
}
