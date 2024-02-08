import { User } from '@models/user/user';

export interface IUserProfileService {
    updateProfile(user:User): Promise<{ success: boolean; user?: User; error?: any }>;
    updateProfilePicture(userId: string, file: File): Promise<{ success: boolean; downloadURL?: string; error?: any; }>
    updateProfileBanner(userId: string, file: File): Promise<{ success: boolean; downloadURL?: string; error?: any; }>;
    deleteProfile(username: string): Promise<{ success: boolean; error?: any }>;
}