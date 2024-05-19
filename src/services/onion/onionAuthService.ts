import { IAuthService } from '@interfaces/IAuthService';
import { random } from 'lodash';
import { ServiceFactory } from '@services/serviceFactory';
import { auth, db } from '@services/firebase/config/firebaseConfig';
import {
    AuthProvider,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User as FirebaseUser,
} from 'firebase/auth';
import { User } from '@models/user/user';
import { ResponseType } from '@models/responseType';
import { doc, getDoc } from 'firebase/firestore';

type enumProvider = 'google' | 'github';

export class OnionAuthService implements IAuthService {
    private randomBoolean: boolean = random(0, 1) === 1;
    private userProfileService = ServiceFactory.getUserProfileService();
    private userService = ServiceFactory.getUserService();

    async sendPasswordResetEmail(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error;
        }
    }

    async createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<ResponseType> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = await this.createUserWithFirebaseData(userCredential.user, {
                username,
                name,
                lastname,
                verified: this.randomBoolean,
            });

            const token = await userCredential.user.getIdToken();
            await this.userProfileService.createProfile(newUser, token);
            return {
                success: true,
                user: newUser,
                token: await userCredential.user.getIdToken(),
            };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async getCurrentUser(): Promise<ResponseType> {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userDetails = await this.createUserWithFirebaseData(user);
                    const privateKey = await this.getPrivateKey(user.uid);
                    resolve({ success: true, user: userDetails, privateKey: privateKey! });
                } else {
                    resolve({ success: false });
                }
            });
        });
    }


    async authenticate(email: string, password: string): Promise<ResponseType> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDetails = await this.createUserWithFirebaseData(userCredential.user);
            const token = await userCredential.user.getIdToken();
            const updatedUser = await this.updateUser(userDetails);
            return { success: true, user: updatedUser, token };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async authenticateWithProvider(provider: enumProvider): Promise<ResponseType> {
        let authProvider: AuthProvider;
        switch (provider) {
            case 'google':
                authProvider = new GoogleAuthProvider();
                break;
            case 'github':
                authProvider = new GithubAuthProvider();
                break;
            default:
                throw new Error('Invalid provider');
        }
        try {
            const result = await signInWithPopup(auth, authProvider);
            const userDetails = await this.createUserWithFirebaseData(result.user);
            const token = await result.user.getIdToken();
            await this.userProfileService.createProfile(userDetails, token);
            const updatedUser = await this.updateUser(userDetails);
            return { success: true, user: updatedUser, token };
        } catch (error: any) {
            console.error('Error during sign-in with provider:', error);
            return { success: false, error: error.message };
        }
    }


    async isAuthenticated(): Promise<boolean> {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                resolve(!!user);
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

    async getToken(): Promise<string> {
        const user = auth.currentUser;
        if (user) {
            return user.getIdToken();
        } else {
            return Promise.reject('No user logged in');
        }
    }

    private async getPrivateKey(userId: string): Promise<string | null> {
        const privateDataRef = doc(db, `users/${userId}/privateData/privateKey`);
        const privateDataSnap = await getDoc(privateDataRef);
        return privateDataSnap.exists() ? privateDataSnap.data()?.priv : null;
    }

    private async createUserWithFirebaseData(firebaseUser: FirebaseUser, additionalData: Partial<User> = {}): Promise<User> {
        return {
            userId: firebaseUser.uid,
            username: additionalData.username || firebaseUser.email!.split('@')[0],
            verified: firebaseUser.emailVerified,
            email: firebaseUser.email!,
            name: firebaseUser.displayName?.split(' ')[0] || '',
            lastname: firebaseUser.displayName?.split(' ')[1] || '',
            createdAt: new Date().toISOString(),
            followersCount: 0,
            followingCount: 0,
            bio: '',
            location: '',
            website: '',
            avatar: firebaseUser.photoURL || '',
            background: '',
            ...additionalData,
        } as User;
    }

    private async updateUser(userDetails: User) {
        const token = await this.getToken();
        const user = await this.userService.getUserById(userDetails.userId);
        if ((!user?.avatar) && (userDetails.avatar != null || userDetails.avatar != ''))
            await this.userProfileService.updateProfilePictureFromPath(userDetails.userId, userDetails.avatar!, token);
        if ((user?.background) && (userDetails.background != null || userDetails.background != ''))
            await this.userProfileService.updateProfileBannerFromPath(userDetails.userId, userDetails.background!, token);
        return user!;
    }
}