import { User } from '@models/user/user';

export interface IUserProfileService {
    updateProfile(user:User): Promise<{ success: boolean; user?: User; error?: any }>;
    deleteProfile(username: string): Promise<{ success: boolean; error?: any }>;
}