// src/services/firebase/FirebaseTweetActionService.ts
import { db } from '@services/firebase/config/firebaseConfig';
import {
    doc,
    addDoc,
    deleteDoc,
    collection,
    getDoc,
    arrayUnion,
    arrayRemove,
    writeBatch,
    updateDoc, setDoc,
} from 'firebase/firestore';
import { ITweetActionService } from '@interfaces/ITweetsActionService';
import { Tweet } from '@models/tweet';
import store, { RootState } from '@store/store';
import { UserRelations } from '@models/user/userRelations';

export class FirebaseTweetActionService implements ITweetActionService {

    private async ensureUserRelationsDocExists(userId: string): Promise<void> {
        const userRelationsRef = doc(db, 'userRelations', userId);
        const docSnapshot = await getDoc(userRelationsRef);
        if (!docSnapshot.exists()) {
            // Initialize empty user relations
            const newUserRelations: UserRelations = {
                id: userId,
                followers: [],
                following: [],
                blockedUsers: [],
                mutedUsers: [],
                reportedUsers: [],
                likedTweetIds: [],
                retweetedTweetIds: [],
                highlightedTweetIds: []
            };
            await setDoc(userRelationsRef, newUserRelations);
        }
    }
    async isTweetLikedByUser(userId: string, tweetId: string): Promise<boolean> {
        const userRelationsRef = doc(db, 'userRelations', userId);
        const docSnap = await getDoc(userRelationsRef);
        if (docSnap.exists()) {
            const userRelations = docSnap.data();
            return userRelations.likedTweetIds && userRelations.likedTweetIds.includes(tweetId);
        }
        return false;
    }

    async getTweetLikesCount(tweetId: string): Promise<number> {
        const tweetRef = doc(db, 'tweets', tweetId);
        const docSnap = await getDoc(tweetRef);
        if (docSnap.exists()) {
            const tweet = docSnap.data() as Tweet;
            return tweet.likes;
        }
        return 0;
    }

    async likeTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }> {
        try {
            await this.ensureUserRelationsDocExists(userId);
        } catch (error: any) {
            return { success: false, error: error.message };
        }
        const batch = writeBatch(db);
        try {
            console.log('likeTweet');
            const tweetRef = doc(db, 'tweets', tweetId);
            const userRelationsRef = doc(db, 'userRelations', userId!);

            // Get current state of the tweet
            const tweetSnap = await getDoc(tweetRef);
            if (!tweetSnap.exists()) {
                throw new Error('Tweet not found');
            }
            const tweet = tweetSnap.data() as Tweet;
            console.log('tweet', tweet);

            // Check if the user already liked the tweet
            const isLiked = await this.isTweetLikedByUser(userId, tweetId);
            console.log('isLiked', isLiked);
            const newLikesCount = isLiked ? tweet.likes - 1 : tweet.likes + 1;
            console.log('newLikesCount', newLikesCount);

            // Update tweet's like count
            batch.update(tweetRef, { likes: newLikesCount });

            //Update user's liked tweets list
            if (isLiked) {
                batch.update(userRelationsRef, { likedTweetIds: arrayRemove(tweetId) });
            } else {
                batch.update(userRelationsRef, { likedTweetIds: arrayUnion(tweetId) });
            }

            // Commit the batch
            await batch.commit();
            return { success: true };
        } catch (error: any) {
            console.error('Error liking tweet:', error);
            return { success: false, error: error.message };
        }
    }

    isTweetRetweetedByUser(userId: string, tweetId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    isTweetCommentedByUser(userId: string, tweetId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async isTweetHighlightedByUser(userId: string, tweetId: string): Promise<boolean> {
        const userRelationsRef = doc(db, 'userRelations', userId);
        const docSnap = await getDoc(userRelationsRef);
        if (docSnap.exists()) {
            const userRelations = docSnap.data();
            return userRelations.highlightedTweetIds && userRelations.highlightedTweetIds.includes(tweetId);
        }
        return false;
    }
    async  postTweet(content: string, additionalData: any = {}): Promise<{ success: boolean; tweetId?: string; error?: string }> {
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

            // First, add the document without the ID
            const tweetRef = await addDoc(collection(db, 'tweets'), newTweet);

            // Then, update the document to include its ID
            await updateDoc(tweetRef, { id: tweetRef.id });

            return { success: true, tweetId: tweetRef.id };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async retweet(tweetId: string): Promise<{ success: boolean; error?: string }> {
        // Similar to likeTweet, implement retweet logic based on your data model
        throw new Error('Method not implemented.');
    }

    async commentOnTweet(tweetId: string, comment: string): Promise<{ success: boolean; error?: string }> {
        // Implement commenting logic, possibly involving a separate 'comments' collection in Firestore
        throw new Error('Method not implemented.');
    }

    async deleteTweet( tweetId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const tweetRef = doc(db, 'tweets', tweetId);
            await deleteDoc(tweetRef);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async highlightTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }> {
        const batch = writeBatch(db);
        try {
            const userRelationsRef = doc(db, 'userRelations', userId);

            // Check if the user already highlighted the tweet
            const isHighlighted = await this.isTweetHighlightedByUser(userId, tweetId);

            // Update user's highlighted tweets list
            if (isHighlighted) {
                batch.update(userRelationsRef, { highlightedTweetIds: arrayRemove(tweetId) });
            } else {
                batch.update(userRelationsRef, { highlightedTweetIds: arrayUnion(tweetId) });
            }

            // Commit the batch
            await batch.commit();
            return { success: true };
        } catch (error: any) {
            console.error('Error highlighting tweet:', error);
            return { success: false, error: error.message };
        }
    }
}

export default FirebaseTweetActionService;
