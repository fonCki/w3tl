// src/interfaces/IAuthService.ts
import { User } from '@models/user/user';
import { ResponseType } from '@models/responseType';

export interface IAuthService {
    createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<{ success: boolean; newUser?: User; error?: any }>;
    getCurrentUser(): Promise<User | undefined>;

    authenticate(username: string, password: string): Promise<ResponseType>;
    isAuthenticated(): Promise<boolean>;

    authenticateWithProvider(provider: string): Promise<ResponseType>;
    sendPasswordResetEmail(email: string): Promise<void>;
    logout(): void;
}
