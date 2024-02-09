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
import { UserRelations } from '@models/user/userRelations';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { ServiceFactory } from '@services/serviceFactory';

export class FirebaseTweetActionService implements ITweetActionService {

    // Method to ensure that the user relations document exists
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
    async postTweet(newTweet:any, additionalData: any = {}): Promise<{ success: boolean; tweetId?: string; error?: string }> {
        try {
            // First, add the document without the ID
            const tweetRef = await addDoc(collection(db, 'tweets'), newTweet);
            // Then, update the document to include its ID
            await updateDoc(tweetRef, { id: tweetRef.id });
            return { success: true, tweetId: tweetRef.id };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async likeTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }> {
        const tweetService = ServiceFactory.getTweetService();
        try {
            await this.ensureUserRelationsDocExists(userId);
        } catch (error: any) {
            return { success: false, error: error.message };
        }
        const batch = writeBatch(db);
        try {

            const tweetRef = doc(db, 'tweets', tweetId);
            const userRelationsRef = doc(db, 'userRelations', userId);

            // Get current state of the tweet
            const tweetSnap = await getDoc(tweetRef);
            if (!tweetSnap.exists()) {
                throw new Error('Tweet not found');
            }
            const tweet = tweetSnap.data() as Tweet;
            console.log('tweet', tweet);

            // Check if the user already liked the tweet
            const isLiked = await tweetService.isTweetLikedByUser(userId, tweetId);
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


    async retweet(tweetId: string): Promise<{ success: boolean; error?: string }> {
        // Similar to likeTweet, implement retweet logic based on your data model
        throw new Error('Method not implemented.');
    }

    async commentOnTweet(comment:any): Promise<{ success: boolean; replyId?: string; error?: string }> {
        try {
            // Create a reference to the 'replies' subcollection under the specific tweet
            const repliesRef = await addDoc(collection(db, 'comments', comment.tweetId), comment);
            await updateDoc(repliesRef, { id: repliesRef.id });
            //update the tweet in th field comment +1
            const tweetRef = doc(db, 'tweets', comment.tweetId);
            const docSnap = await getDoc(tweetRef);
            if (docSnap.exists()) {
                const tweet = docSnap.data() as Tweet;
                const newCommentsCount = tweet.comments + 1;
                await updateDoc(tweetRef, { comments: newCommentsCount });
            }

            return { success: true, replyId: repliesRef.id };
        } catch (error: any) {
            console.error('Error posting comment:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteTweet(tweetId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const tweetRef = doc(db, 'tweets', tweetId);
            await deleteDoc(tweetRef);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async highlightTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }> {
        const tweetService = ServiceFactory.getTweetService();

        const batch = writeBatch(db);
        try {
            const userRelationsRef = doc(db, 'userRelations', userId);

            // Check if the user already highlighted the tweet
            const isHighlighted = await tweetService.isTweetHighlightedByUser(userId, tweetId);

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
