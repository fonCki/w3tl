// src/interfaces/IAuthService.ts
import { ResponseType } from '@models/responseType';

/**
 * Represents an authentication service.
 *
 * @interface IAuthService
 */
export interface IAuthService {
    createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<ResponseType>;
    getCurrentUser(): Promise<ResponseType>;
    authenticate(username: string, password: string): Promise<ResponseType>;
    isAuthenticated(): Promise<boolean>;
    authenticateWithProvider(provider: string): Promise<ResponseType>;
    sendPasswordResetEmail(email: string): Promise<void>;
    logout(): void;

    getToken(): Promise<string>;
}
