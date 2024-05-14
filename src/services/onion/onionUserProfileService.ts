import { IUserProfileService } from '@interfaces/IUserProfileService';
import { User } from '@models/user/user';
import { BACKEND_URL } from '@constants/constants';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable } from 'firebase/storage';

export class OnionUserProfileService implements IUserProfileService {
    async createProfile(user: User, token: string): Promise<{ success: boolean; user?: User; error?: any }> {
        try {
            const responseData = await this.sendRequest(`${BACKEND_URL}/user/create`, 'POST', token, {
                userId: user.userId,
                userName: user.username,
                firstName: user.name,
                lastName: user.lastname,
                email: user.email,
                pub: '5gliUjV94G45jBKc6LQEeF2jf3d2k8PNMr8UbOUngot=',
            });
            return { success: true, user: responseData };
        } catch (error) {
            return { success: false, error };
        }
    }

    async updateProfile(user: User, token: string): Promise<{ success: boolean; user?: User; error?: any }> {
        try {
            console.log('Updating user:', user);
            const responseData = await this.sendRequest(`${BACKEND_URL}/user/update`, 'PUT', token, {
                userId: user.userId,
                userName: user.username,
                firstName: user.name,
                lastName: user.lastname,
                bio: user.bio,
                location: user.location,
                website: user.website,
            });
            return { success: true, user: responseData };
        } catch (error) {
            return { success: false, error };
        }
    }

    async updateProfileBannerFromPath(userId: string, path: string, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any
    }> {
        try {
            await this.sendRequest(`${BACKEND_URL}/user/update/banner`, 'PATCH', token, {
                userId: userId,
                banner: path,
            });
            return { success: true, downloadURL: path };
        } catch (error) {
            return { success: false, error };
        }
    }

    async updateProfileBanner(userId: string, file: File, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any
    }> {
        try {
            const downloadURL = await this.uploadFileAndGetURL(userId, file, 'profileBanners');
            await this.sendRequest(`${BACKEND_URL}/user/update/banner`, 'PATCH', token, {
                userId: userId,
                banner: downloadURL,
            });
            return { success: true, downloadURL };
        } catch (error) {
            return { success: false, error };
        }
    }

    async updateProfilePictureFromPath(userId: string, path: string, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any
    }> {
        try {
            await this.sendRequest(`${BACKEND_URL}/user/update/avatar`, 'PATCH', token, {
                userId: userId,
                avatar: path,
            });
            return { success: true, downloadURL: path };
        } catch (error) {
            return { success: false, error };
        }
    }

    async updateProfilePicture(userId: string, file: File, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any
    }> {
        try {
            const downloadURL = await this.uploadFileAndGetURL(userId, file, 'profilePictures');
            await this.sendRequest(`${BACKEND_URL}/user/update/avatar`, 'PATCH', token, {
                userId: userId,
                avatar: downloadURL,
            });
            return { success: true, downloadURL };
        } catch (error) {
            return { success: false, error };
        }
    }

    async deleteProfile(username: string, token: string): Promise<{ success: boolean; error?: any }> {
        throw new Error('Method not implemented.');
    }

    private async sendRequest(url: string, method: 'POST' | 'PUT' | 'PATCH', token: string, body: any): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const response = await fetch(url, { method, headers, body: JSON.stringify(body) });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to ${method} data: ${errorData.message}`);
        }
        return response.json();
    }

    private async uploadFileAndGetURL(userId: string, file: File, folder: string): Promise<string> {
        const storage = getStorage();
        const storagePath = `${folder}/${userId}/${file.name}`;
        const imageRef = storageRef(storage, storagePath);
        const uploadTaskSnapshot = await uploadBytesResumable(imageRef, file);
        return getDownloadURL(uploadTaskSnapshot.ref);
    }
}
