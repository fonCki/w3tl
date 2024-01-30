// src/services/firebase/FirebaseUserService.ts
import { db } from '@services/firebase/config/firebaseConfig';
import { collection, query as firebaseQuery, where, getDocs, doc, getDoc, limit } from 'firebase/firestore';
import { IUserService } from '@interfaces/IUserService';
import { User } from '@models/user/user';

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

    async getAllUsers(): Promise<User[]> {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        return querySnapshot.docs.map(doc => doc.data() as User);
    }

    async searchUsers(searchQuery: string): Promise<User[]> {
        const usersRef = collection(db, 'users');
        const q = firebaseQuery(usersRef, where('username', '>=', searchQuery), where('username', '<=', searchQuery + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as User);
    }

    async searchUsersWithLimit(searchQuery: string, limitCount: number): Promise<User[]> {
        const usersRef = collection(db, 'users');
        const q = firebaseQuery(usersRef, where('username', '>=', searchQuery), where('username', '<=', searchQuery + '\uf8ff'), limit(limitCount));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as User);
    }

    async getFollowers(userId: string): Promise<User[]> {
        // Assuming you have a structure for followers in your database
        // This method would need a suitable database structure to work properly
        throw new Error('Method not implemented.');
    }

    async getFollowing(userId: string): Promise<User[]> {
        // Similar to getFollowers, requires a specific database structure
        throw new Error('Method not implemented.');
    }

    async getUserProfile(userId: string): Promise<User | undefined> {
        // Assuming the user's profile is stored in the 'users' collection
        return this.getUserById(userId);
    }

    async getUserDetails(userId: string): Promise<User | undefined> {
        // Assuming you want to return the same data as getUserById
        return this.getUserById(userId);
    }

    async getTreandingUsers(top: number): Promise<User[]> {
        // This would require a specific structure or metric to determine "trending"
        // For simplicity, returning the first 'top' users
        const usersRef = collection(db, 'users');
        const q = firebaseQuery(usersRef, limit(top));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as User);
    }

    async getTopTenTreandingUsers(): Promise<User[]> {
        return this.getTreandingUsers(10);
    }
}

