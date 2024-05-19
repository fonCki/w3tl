import { User } from '@models/user/user';

/**
 * Represents a service for managing user profiles.
 *
 * @interface
 */
export interface IUserProfileService {
    createProfile(user: User, token: string): Promise<{ success: boolean; user?: User; error?: any }>;

    updateProfile(user: User, token: string): Promise<{ success: boolean; user?: User; error?: any }>;

    updateProfilePicture(userId: string, file: File, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any;
    }>;

    updateProfileBanner(userId: string, file: File, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any;
    }>;

    deleteProfile(username: string, token: string): Promise<{ success: boolean; error?: any }>;
}