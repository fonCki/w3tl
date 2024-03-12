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
import { ServiceFactory } from '@services/serviceFactory';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable } from 'firebase/storage';

export class FirebaseTweetActionService implements ITweetActionService {

    // Method to ensure that the user relations document exists
    private async ensureUserRelationsDocExists(userId: string): Promise<void> {
        const userRelationsRef = doc(db, 'userRelations', userId);
        const docSnapshot = await getDoc(userRelationsRef);
        if (!docSnapshot.exists()) {
            // Initialize empty user relations
            const newUserRelations: UserRelations = {
                userId: userId,
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
    async postTweet(newTweet:any, additionalData: any = {}): Promise<{ success: boolean; postId?: string; error?: string }> {
        try {
            // First, add the document without the ID
            const tweetRef = await addDoc(collection(db, 'tweets'), newTweet);
            // Then, update the document to include its ID
            await updateDoc(tweetRef, { postId: tweetRef.id });
            return { success: true, postId: tweetRef.id };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async likeTweet(userId: string, postId: string): Promise<{ success: boolean; error?: string }> {
        const tweetService = ServiceFactory.getTweetService();
        try {
            await this.ensureUserRelationsDocExists(userId);
        } catch (error: any) {
            return { success: false, error: error.message };
        }
        const batch = writeBatch(db);
        try {

            const tweetRef = doc(db, 'tweets', postId);
            const userRelationsRef = doc(db, 'userRelations', userId);

            // Get current state of the tweet
            const tweetSnap = await getDoc(tweetRef);
            if (!tweetSnap.exists()) {
                throw new Error('Tweet not found');
            }
            const tweet = tweetSnap.data() as Tweet;
            console.log('tweet', tweet);

            // Check if the user already liked the tweet
            const isLiked = await tweetService.isTweetLikedByUser(userId, postId);
            console.log('isLiked', isLiked);
            const newLikesCount = isLiked ? tweet.likes - 1 : tweet.likes + 1;
            console.log('newLikesCount', newLikesCount);

            // Update tweet's like count
            batch.update(tweetRef, { likes: newLikesCount });

            //Update user's liked tweets list
            if (isLiked) {
                batch.update(userRelationsRef, { likedTweetIds: arrayRemove(postId) });
            } else {
                batch.update(userRelationsRef, { likedTweetIds: arrayUnion(postId) });
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

    async commentOnTweet(comment: any): Promise<{ success: boolean; postId?: string; error?: string }> {
        try {
            // Ensure the path to the nested 'comments' collection correctly references the parent tweet
            const commentsCollectionRef = collection(db, 'tweets', comment.parentTweetId, 'comments');

            // Add the comment document to the 'comments' subcollection under the specific tweet
            const commentDocRef = await addDoc(commentsCollectionRef, comment);

            // Optionally, update the comment document with its ID if needed
            // This step is not always necessary unless you specifically need the comment's ID stored within its document
            await updateDoc(commentDocRef, { postId: commentDocRef.id });

            // Update the parent tweet's comment count
            const tweetRef = doc(db, 'tweets', comment.parentTweetId); // Ensure this uses parentTweetId for consistency
            const tweetDocSnap = await getDoc(tweetRef);
            if (tweetDocSnap.exists()) {
                const tweet = tweetDocSnap.data();
                const newCommentsCount = tweet.comments ? tweet.comments + 1 : 1; // Handle case where 'comments' might not exist yet
                await updateDoc(tweetRef, { comments: newCommentsCount });
            }

            const userCommentsRef = collection(db, 'userComments');
            await addDoc(userCommentsRef, {
                userId: comment.userId,
                parentTweetId: comment.parentTweetId,
                commentId: commentDocRef.id, // Assuming commentDocRef is the reference to the newly added comment
            });

            return { success: true, postId: commentDocRef.id };
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

    async uploadMedia(file: File): Promise<{ success: boolean; downloadURL?: string; error?: string }> {
        const storage = getStorage();
        const storagePath = `media/${file.name}`;
        const imageRef = storageRef(storage, storagePath);

        try {
            const uploadTaskSnapshot = await uploadBytesResumable(imageRef, file);
            const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
            return { success: true, downloadURL };
        } catch (error: any) {
            console.error('Error uploading media:', error);
            return { success: false, error: error.message };
        }
    }
}

export default FirebaseTweetActionService;
