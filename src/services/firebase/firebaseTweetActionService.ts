// src/services/firebase/FirebaseTweetActionService.ts
import { db } from '@services/firebase/config/firebaseConfig';
import { doc, updateDoc, deleteDoc, addDoc, collection, getDoc } from 'firebase/firestore';
import { ITweetActionService } from '@interfaces/ITweetsActionService';
import { Tweet } from '@models/tweet';
import  store  from '@store/store';

export class FirebaseTweetActionService implements ITweetActionService {
    async postTweet(content: string, additionalData: any = {}): Promise<{ success: boolean; tweetId?: string; error?: string }> {
        try {
            const currentUser = store.getState().auth.currentUser;
            if (!currentUser) {
                throw new Error('No authenticated user found');
            }

            const newTweet = {
                user: currentUser,
                content,
                ...additionalData, // includes image, video, etc.
                likes: 0,
                retweets: 0,
                comments: 0,
                createdAt: new Date().toISOString()
            };

            const tweetRef = await addDoc(collection(db, 'tweets'), newTweet);
            return { success: true, tweetId: tweetRef.id };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async likeTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const tweetRef = doc(db, 'tweets', tweetId);
            const tweetSnap = await getDoc(tweetRef);
            if (!tweetSnap.exists()) {
                throw new Error('Tweet not found');
            }
            const tweet = tweetSnap.data() as Tweet;
            await updateDoc(tweetRef, { likes: tweet.likes + 1 });
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async retweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }> {
        // Similar to likeTweet, implement retweet logic based on your data model
        throw new Error('Method not implemented.');
    }

    async commentOnTweet(userId: string, tweetId: string, comment: string): Promise<{ success: boolean; error?: string }> {
        // Implement commenting logic, possibly involving a separate 'comments' collection in Firestore
        throw new Error('Method not implemented.');
    }

    async deleteTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const tweetRef = doc(db, 'tweets', tweetId);
            await deleteDoc(tweetRef);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    // Additional methods can be implemented as needed
}

export default FirebaseTweetActionService;
