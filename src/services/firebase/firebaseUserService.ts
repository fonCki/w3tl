// src/services/firebase/FirebaseUserService.ts
import { db } from '@services/firebase/config/firebaseConfig';
import { collection, doc, getDoc, getDocs, limit, query as firebaseQuery, where } from 'firebase/firestore';
import { IUserService } from '@interfaces/IUserService';
import { User } from '@models/user/user';


/**
 * A class that provides user-related operations using Firebase.
 * @implements {IUserService}
 */
export class firebaseUserService implements IUserService {

    async getUserById(userId: string): Promise<User | undefined> {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data() as User;
        }
        return undefined;
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        const usersRef = collection(db, 'users');
        const q = firebaseQuery(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data() as User;
        }
        return undefined;
    }

    userExists(username: string): Promise<boolean> {
        const usersRef = collection(db, 'users');
        const q = firebaseQuery(usersRef, where('username', '==', username));
        return new Promise((resolve, reject) => {
            getDocs(q).then(querySnapshot => {
                resolve(!querySnapshot.empty);
            }).catch(err => {
                reject(err);
            });
        });
    }

    async getAllUsers(): Promise<User[]> {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        return querySnapshot.docs.map(doc => doc.data() as User);
    }

    async searchUsers(searchQuery: string, limitCount: number = 10): Promise<User[]> {
        searchQuery = searchQuery.toLowerCase();
        const usersRef = collection(db, 'users');

        // Define a set to store unique user IDs to avoid duplicate results
        const uniqueUserIds = new Set<string>();
        const users: User[] = [];

        // Define fields to search across
        const fieldsToSearch = ['username', 'name', 'lastname', 'email'];

        for (const field of fieldsToSearch) {
            const q = firebaseQuery(usersRef, where(field, '>=', searchQuery), where(field, '<=', searchQuery + '\uf8ff'), limit(limitCount));
            const querySnapshot = await getDocs(q);

            for (const doc of querySnapshot.docs) {
                const user = doc.data() as User;
                // Check if we've already added this user based on their ID
                if (!uniqueUserIds.has(user.userId)) {
                    users.push(user);
                    uniqueUserIds.add(user.userId);
                }
                // Early exit if we've reached the limit
                if (users.length >= limitCount) break;
            }
            // Early exit if we've reached the limit
            if (users.length >= limitCount) break;
        }

        return users;
    }


    async getTrendingUsers(top: number): Promise<User[]> {
        // This would require a specific structure or metric to determine "trending"
        // For simplicity, returning the first 'top' users
        const usersRef = collection(db, 'users');
        const q = firebaseQuery(usersRef, limit(top));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as User);
    }
}

