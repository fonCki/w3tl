// src/services/firebase/FirebaseTweetService.ts
import { db } from '@services/firebase/config/firebaseConfig';
import {
    collection,
    query as firebaseQuery,
    where,
    getDocs,
    doc,
    getDoc,
    limit
} from 'firebase/firestore';
import { ITweetService } from '@interfaces/ITweetService';
import { Tweet } from '@models/tweet';
import { firebaseUserService } from '@services/firebase/firebaseUserService';

import { types } from 'sass';
import Error = types.Error;

export class firebaseTweetService implements ITweetService {
    private userService: firebaseUserService;

    constructor() {
        this.userService = new firebaseUserService();
    }

    async getTweetsByUserId(userId: string): Promise<Tweet[]> {
        const tweetsRef = collection(db, 'tweets');
        const q = firebaseQuery(tweetsRef, where('user.id', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Tweet);
    }

    async getTweetsByUserNickname(userNickname: string): Promise<Tweet[]> {
        const user = await this.userService.getUserByUsername(userNickname);
        if (!user) {
            throw new Error('User not found');
        }
        return this.getTweetsByUserId(user.id);
    }

    async getAllTweets(): Promise<Tweet[]> {
        const tweetsRef = collection(db, 'tweets');
        const querySnapshot = await getDocs(tweetsRef);
        return querySnapshot.docs.map(doc => doc.data() as Tweet);
    }

    async searchTweets(query: string): Promise<Tweet[]> {
        // Implement a basic text search (limited capabilities)
        const tweetsRef = collection(db, 'tweets');
        const q = firebaseQuery(tweetsRef, where('content', '>=', query), where('content', '<=', query + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Tweet);
    }

    async searchTweetsWithLimit(query: string, limitNumber: number): Promise<Tweet[]> {
        const tweetsRef = collection(db, 'tweets');
        const q = firebaseQuery(tweetsRef, where('content', '>=', query), where('content', '<=', query + '\uf8ff'), limit(limitNumber));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Tweet);
    }

    async getTweetById(tweetId: string): Promise<Tweet | null> {
        const tweetDocRef = doc(db, 'tweets', tweetId);
        const tweetDoc = await getDoc(tweetDocRef);
        if (tweetDoc.exists()) {
            return tweetDoc.data() as Tweet;
        }
        return null;
    }

    async getTweetsWithMedia(): Promise<Tweet[]> {
        // Assume tweets with media have non-empty 'image' or 'video' fields
        const tweetsRef = collection(db, 'tweets');
        const qImage = firebaseQuery(tweetsRef, where('image', '!=', ''));
        const qVideo = firebaseQuery(tweetsRef, where('video', '!=', ''));
        const querySnapshotImage = await getDocs(qImage);
        const querySnapshotVideo = await getDocs(qVideo);
        const tweetsWithImage = querySnapshotImage.docs.map(doc => doc.data() as Tweet);
        const tweetsWithVideo = querySnapshotVideo.docs.map(doc => doc.data() as Tweet);
        return [...tweetsWithImage, ...tweetsWithVideo];
    }

    // ... other methods related to user interaction with tweets (likes, retweets, comments, etc.) ...

    // You'll need to implement these methods based on how you're storing this data in Firestore.
    // For example, if you have fields in each tweet document for likes and retweets,
    // you can query those fields to implement the methods below.

    async isTweetLikedByUser(tweetId: string, userId: string): Promise<boolean> {
        // Implementation depends on your database schema
        throw new Error('Method not implemented.');
    }

    async isTweetRetweetedByUser(tweetId: string, userId: string): Promise<boolean> {
        // Implementation depends on your database schema
        throw new Error('Method not implemented.');
    }

    getAllRepliesByTweetId(tweetId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    getAllRepliesByUserId(userId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    getAllTweetsThatUserComments(userId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    getAllTweetsThatUserHighlights(userId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    getAllTweetsThatUserLikes(userId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    getAllTweetsThatUserRetweets(userId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    getHowManyRepliesByTweetId(tweetId: string): Promise<number> {
        return Promise.resolve(0);
    }

    getReplyById(replyId: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    isTweetCommentedByUser(tweetId: string, userId: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    isTweetHighlightedByUser(tweetId: string, userId: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    // ... other methods ...
}
