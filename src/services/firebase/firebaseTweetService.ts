// src/services/firebase/FirebaseTweetService.ts
import { db } from '@services/firebase/config/firebaseConfig';
import {
    collection,
    query as firebaseQuery,
    orderBy,
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
import { UserRelations } from '@models/user/userRelations';

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
        // Create a query against the collection, ordering by createdAt descending
        const q = firebaseQuery(tweetsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Tweet);
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

    async  getAllTweetsThatUserHighlights(userId: string): Promise<Tweet[]> {
        const userRelationsRef = doc(db, 'userRelations', userId);
        const userDoc = await getDoc(userRelationsRef);


        if (!userDoc.exists()) {
            console.log('No such document!');
            return [];
        }

        const userRelations = userDoc.data() as UserRelations;
        const highlightedTweetIds = userRelations.highlightedTweetIds;
        console.log('highlightedTweetIds', highlightedTweetIds);

        const allHighlightedTweets: Tweet[] = [];

        for (const tweetId of highlightedTweetIds) {
            const tweet = await this.getTweetById(tweetId);
            if (tweet) {
                allHighlightedTweets.push(tweet);
            }
        }


        return allHighlightedTweets;
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

    async getAllTweetsThatUserLikes(userId: string): Promise<Tweet[]> {
        const userRelationsRef = doc(db, 'userRelations', userId);
        const userDoc = await getDoc(userRelationsRef);
        if (!userDoc.exists()) {
            console.log('No such document for user relations!');
            return [];
        }

        const userRelations = userDoc.data() as UserRelations;
        const likedTweetIds = userRelations.likedTweetIds;
        console.log('likedTweetIds', likedTweetIds);

        const likedTweets: Tweet[] = [];
        for (const tweetId of likedTweetIds) {
            const tweet = await this.getTweetById(tweetId);
            if (tweet) {
                likedTweets.push(tweet);
            }
        }

        return likedTweets;
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

    async getTweetLikesCount(tweetId: string): Promise<number> {
        const tweetRef = doc(db, 'tweets', tweetId);
        const docSnap = await getDoc(tweetRef);
        if (docSnap.exists()) {
            const tweet = docSnap.data() as Tweet;
            return tweet.likes;
        }
        return 0;
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
}
