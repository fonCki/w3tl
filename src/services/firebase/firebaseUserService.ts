// src/services/firebase/FirebaseUserService.ts
import { db } from '@services/firebase/config/firebaseConfig';
import { collection, query as firebaseQuery, where, getDocs, doc, getDoc, limit } from 'firebase/firestore';
import { IUserService } from '@interfaces/IUserService';
import { User } from '@models/user/user';
import usersMock from '@data/usersNewMock';

export class firebaseUserService implements IUserService {
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
        //TODO implement
        return usersMock.sort(() => Math.random() - 0.5).slice(0, 5);
    }

    async getFollowing(userId: string): Promise<User[]> {
        //TODO implement
        return usersMock.sort(() => Math.random() - 0.5).slice(0, 5);
    }

    async getTreandingUsers(top: number): Promise<User[]> {
        // This would require a specific structure or metric to determine "trending"
        // For simplicity, returning the first 'top' users
        const usersRef = collection(db, 'users');
        const q = firebaseQuery(usersRef, limit(top));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as User);
    }

}

