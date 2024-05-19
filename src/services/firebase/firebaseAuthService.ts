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
import { collection, doc, getDoc, getDocs, limit, query, runTransaction, setDoc } from 'firebase/firestore';
import { IAuthService } from '@interfaces/IAuthService';
import { User } from '@models/user/user';
import { ResponseType } from '@models/responseType';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import { starterNotification } from '@constants/notificationsStarters';

/**
 * enumProvider is a type that represents different providers for enums.
 * Currently, the supported providers are 'google' and 'github'.
 */
type enumProvider = 'google' | 'github';

/**
 * @class firebaseAuthService
 * @implements {IAuthService}
 * @description A class that provides authentication services using Firebase.
 */
export class firebaseAuthService implements IAuthService {

    async createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<ResponseType> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userDetails = await this.createUserInFirestore(userCredential.user, {
                username,
                name,
                lastname,
                verified: Math.random() < 0.5,
            });
            const token = await userCredential.user.getIdToken();
            const privateKey = await this.getPrivateKey(userCredential.user.uid);
            return { success: true, user: userDetails, token, privateKey: privateKey! };
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
            // Sign in with the provider
            const result = await signInWithPopup(auth, authProvider);

            // Retrieve or create the user details in Firestore
            const userDetails = await this.createUserInFirestore(result.user);

            // Get the ID token
            const token = await result.user.getIdToken();

            // Retrieve the private key
            const privateKey = await this.getPrivateKey(result.user.uid);

            return { success: true, user: userDetails, token, privateKey: privateKey! };
        } catch (error: any) {
            alert('Please check your browser\'s popup settings and try again.');
            return { success: false, error: error.message };
        }
    }

    async getCurrentUser(): Promise<ResponseType> {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userDetails = await this.createUserInFirestore(user);
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
            const userDetails = await this.createUserInFirestore(userCredential.user);
            const token = await userCredential.user.getIdToken();
            const privateKey = await this.getPrivateKey(userCredential.user.uid);
            return { success: true, user: userDetails, token, privateKey: privateKey! };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    private async generateAndStoreKeys(firebaseUser: FirebaseUser): Promise<string> {
        const keyPair = nacl.sign.keyPair(); // Use nacl.sign.keyPair() for signing
        const publicKey = naclUtil.encodeBase64(keyPair.publicKey);
        const privateKey = naclUtil.encodeBase64(keyPair.secretKey);

        // Store the public key in the user's document
        const userRef = doc(db, 'users', firebaseUser.uid);
        await setDoc(userRef, { pub: publicKey }, { merge: true });

        // Store the private key in the user's privateData subcollection
        const privateDataRef = doc(db, `users/${firebaseUser.uid}/privateData/privateKey`);
        await setDoc(privateDataRef, { priv: privateKey }, { merge: true });

        return privateKey;
    }

    private async getPrivateKey(userId: string): Promise<string | null> {
        const privateDataRef = doc(db, `users/${userId}/privateData/privateKey`);
        const privateDataSnap = await getDoc(privateDataRef);
        return privateDataSnap.exists() ? privateDataSnap.data()?.priv : null;
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
            await this.generateAndStoreKeys(firebaseUser);  // Generate keys for new users
        } else {
            user = userSnapshot.data() as User;

            // Check for public key
            if (!user.pub) {
                const publicKey = naclUtil.encodeBase64(nacl.sign.keyPair().publicKey);
                await setDoc(userRef, { pub: publicKey }, { merge: true });
            }

            // Check for private key
            const privateKey = await this.getPrivateKey(firebaseUser.uid);
            if (!privateKey) {
                await this.generateAndStoreKeys(firebaseUser);
            }
        }
        // await this.checkAndCreateNotifications(firebaseUser);
        return user;
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

    private async checkAndCreateNotifications(firebaseUser: FirebaseUser): Promise<void> {
        const notificationsRef = collection(db, 'users', firebaseUser.uid, 'notifications');

        // Run the transaction
        await runTransaction(db, async (transaction) => {
            // Create a query for the notifications collection
            const notificationsQuery = query(notificationsRef, limit(1)); // Limit to 1 to check for existence
            const querySnapshot = await getDocs(notificationsQuery);

            // Check if the notifications collection is empty
            if (querySnapshot.empty) {
                // Notifications do not exist, prepare and set new notifications
                starterNotification.forEach(notification => {
                    const newNotificationRef = doc(notificationsRef); // Create a new document reference
                    transaction.set(newNotificationRef, {
                        ...notification,
                        user: firebaseUser.uid,
                        date: notification.date.toISOString(), // Ensure date is formatted correctly
                    });
                });
            }
        });
    }


}
