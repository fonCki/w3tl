import { auth, db } from '@services/firebase/config/firebaseConfig';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { IUserProfileService } from '@interfaces/IUserProfileService';
import { User } from '@models/user/user';


export class firebaseUserProfileService implements IUserProfileService {
    async updateProfile(user: User): Promise<{ success: boolean; user?: User; error?: any }> {
        try {
            const userDocRef = doc(db, 'users', user.id);
            await updateDoc(userDocRef, {...user});
            return { success: true, user };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
    async deleteProfile(userId: string): Promise<{ success: boolean; error?: any }> {
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
}