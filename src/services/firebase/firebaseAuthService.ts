import { auth, db } from '@services/firebase/config/firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { IAuthService } from '@interfaces/IAuthService';
import { User } from '@models/user/user';
import { sendPasswordResetEmail } from 'firebase/auth';


export class firebaseAuthService implements IAuthService {
    async sendPasswordResetEmail(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error;
        }
    }

    async createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<{
        success: boolean;
        newUser?: User;
        error?: string
    }> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            const newUser: User = {
                id: firebaseUser.uid,
                username,
                verified: false,
                email,
                name,
                lastname,
                createdAt: new Date().toISOString(),
                followersCount: 0,
                followingCount: 0,
                bio: '',
                location: '',
                website: '',
                avatar: '',
                background: '',

            };
            // Save user details to Firestore
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            await setDoc(userDocRef, newUser);
            return { success: true, newUser };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async getCurrentUser(): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userDetails = userDoc.data() as User;
                        resolve(userDetails);
                    } else {
                        reject('User data not found.');
                    }
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    async authenticate(email: string, password: string): Promise<{
        success: boolean;
        user?: User;
        token?: string;
        error?: string
    }> {
        console.log('authenticate');
        try {
            console.log('username', email);
            console.log('password', password);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            console.log('firebaseUser', firebaseUser);
            if (firebaseUser) {
                console.log('firebaseUser', firebaseUser);
                const token = await firebaseUser.getIdToken();
                console.log('token', token);
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userDetails = userDoc.data() as User;
                    return { success: true, user: userDetails, token };
                }
            }
            return { success: false, error: 'User details not found.' };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }


    isAuthenticated(): Promise<boolean> {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (firebaseUser) => {
                resolve(firebaseUser != null);
            });
        });
    }

    logout(): void {
        signOut(auth).then(() => {
            console.log('User successfully logged out');
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    }
}
