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
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { IAuthService } from '@interfaces/IAuthService';
import { User } from '@models/user/user';
import { ResponseType } from '@models/responseType';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

type enumProvider = 'google' | 'github';

export class firebaseAuthService implements IAuthService {

    async createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<ResponseType> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await this.generateAndStoreKeys(userCredential.user);
            const newUser = await this.createUserInFirestore(userCredential.user, {
                username,
                name,
                lastname,
                verified: Math.random() < 0.5,
            });
            return {
                success: true,
                user: newUser,
                token: await userCredential.user.getIdToken(),
            };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async sendPasswordResetEmail(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error;
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
            const decodedToken = await auth.currentUser?.getIdTokenResult();
            if (decodedToken?.claims.priv) {
                console.log('User has private key in custom claims', decodedToken.claims.priv);
            } else {
                console.log('User does not have private key in custom claims');
                await this.generateAndStoreKeys(result.user);
            }

            const userDetails = await this.createUserInFirestore(result.user);
            const token = await result.user.getIdToken();
            return { success: true, user: userDetails, token };
        } catch (error: any) {
            console.error('Error during sign-in with provider:', error);
            return { success: false, error: error.message };
        }
    }

    async getCurrentUser(): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userDetails = await this.createUserInFirestore(user);
                    resolve(userDetails);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    async authenticate(email: string, password: string): Promise<ResponseType> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDetails = await this.createUserInFirestore(userCredential.user);
            const token = await userCredential.user.getIdToken();
            return { success: true, user: userDetails, token };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    private async generateAndStoreKeys(firebaseUser: FirebaseUser): Promise<void> {
        const keyPair = nacl.box.keyPair();
        const publicKey = naclUtil.encodeBase64(keyPair.publicKey);
        const privateKey = naclUtil.encodeBase64(keyPair.secretKey);

        // Store the public key in the user's document
        const userRef = doc(db, 'users', firebaseUser.uid);
        await setDoc(userRef, { pub: publicKey }, { merge: true });

        // Store the private key in the user's privateData subcollection
        const privateDataRef = doc(db, `users/${firebaseUser.uid}/privateData/privateKey`);
        await setDoc(privateDataRef, { priv: privateKey }, { merge: true });
    }

    isAuthenticated(): Promise<boolean> {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                resolve(!!user);
            });
        });
    }

    private async createUserInFirestore(firebaseUser: FirebaseUser, additionalData: Partial<User> = {}): Promise<User> {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnapshot = await getDoc(userRef);
        let user: User;
        console.log('User snapshot:', userSnapshot.exists());
        console.log(firebaseUser);
        if (!userSnapshot.exists()) {
            user = {
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
            };
            await setDoc(userRef, user);
        } else {
            user = userSnapshot.data() as User;
        }
        console.log('User:', user);
        return user;
    }

    logout(): void {
        signOut(auth).then(() => {
            console.log('User successfully logged out');
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    }
}
