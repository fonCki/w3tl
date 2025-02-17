import { auth, db } from '@services/firebase/config/firebaseConfig';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { IUserProfileService } from '@interfaces/IUserProfileService';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { User } from '@models/user/user';

/**
 * A service class for handling user profile operations in Firebase Firestore.
 */
export class firebaseUserProfileService implements IUserProfileService {

    async updateProfile(user: User, token: string): Promise<{ success: boolean; user?: User; error?: any }> {
        try {
            const userDocRef = doc(db, 'users', user.userId);
            console.log('userRef', userDocRef);
            console.log('user', user);
            await updateDoc(userDocRef, { ...user });
            return { success: true, user };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async updateProfilePicture(userId: string, file: File, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any;
    }> {
        const storage = getStorage();
        const storagePath = `profilePictures/${userId}/${file.name}`;
        const imageRef = storageRef(storage, storagePath);

        try {
            const uploadTaskSnapshot = await uploadBytesResumable(imageRef, file);
            const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

            // Update the user's profile picture URL in Firestore
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { avatar: downloadURL });

            return { success: true, downloadURL }; // Return downloadURL on success
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async updateProfileBanner(userId: string, file: File, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any;
    }> {
        const storage = getStorage();
        const storagePath = `profileBanners/${userId}/${file.name}`;
        const imageRef = storageRef(storage, storagePath);

        try {
            const uploadTaskSnapshot = await uploadBytesResumable(imageRef, file);
            const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

            // Update the user's profile banner URL in Firestore
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { background: downloadURL });

            return { success: true, downloadURL }; // Include downloadURL in the return
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async deleteProfile(userId: string, token: string): Promise<{ success: boolean; error?: any }> {
        try {
            // Delete from Firestore
            const userDocRef = doc(db, 'users', userId);
            await deleteDoc(userDocRef);

            // Delete from Firebase Authentication
            const user = await auth.currentUser;
            if (user && user.uid === userId) {
                await deleteUser(user);
            }

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    createProfile(user: User, token: string): Promise<{ success: boolean; user?: User; error?: any }> {
        return Promise.resolve({ success: true, user });
    }

    updateProfileBannerFromPath(userId: string, path: string, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any
    }> {
        return Promise.resolve({ success: true, downloadURL: path });
    }

    updateProfilePictureFromPath(userId: string, path: string, token: string): Promise<{
        success: boolean;
        downloadURL?: string;
        error?: any
    }> {
        return Promise.resolve({ success: true, downloadURL: path });
    }
}