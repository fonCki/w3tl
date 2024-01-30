// src/interfaces/IAuthService.ts
import { User } from '@models/user/user';
export interface IAuthService {
    createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<{ success: boolean; newUser?: User; error?: any }>;
    getCurrentUser(): Promise<User | undefined>;
    authenticate(username: string, password: string): Promise<{ success: boolean; user?: User; error?: any }>;
    isAuthenticated(): Promise<boolean>;
    logout(): void;
}
