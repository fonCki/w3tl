// src/services/firebase/FirebaseTweetService.ts
import { db } from '@services/firebase/config/firebaseConfig';
import {
    collection,
    collectionGroup,
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
import { UserRelations } from '@models/user/userRelations';
import user from '@components/user/profile/User';




export class firebaseTweetService implements ITweetService {
    private userService: firebaseUserService;

    constructor() {
        this.userService = new firebaseUserService();
    }


    async getTweetsByUserId(userId: string): Promise<Tweet[]> {
        const tweetsRef = collection(db, 'tweets');
        const q = firebaseQuery(tweetsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Tweet);
    }

    async getTweetsByUserNickname(userNickname: string): Promise<Tweet[]> {
        const user = await this.userService.getUserByUsername(userNickname);
        if (!user) {
            throw new Error('User not found');
        }
        return this.getTweetsByUserId(user.userId);
    }

    async getAllTweets(): Promise<Tweet[]> {
        const tweetsRef = collection(db, 'tweets');
        // Create a query against the collection, ordering by createdAt descending
        const q = firebaseQuery(tweetsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }) as Tweet);
    }

    async searchTweets(query: string): Promise<Tweet[]> {
        const tweetsRef = collection(db, 'tweets');
        const querySnapshot = await getDocs(tweetsRef);
        const allTweets = querySnapshot.docs.map(doc => doc.data() as Tweet);
        // Filter tweets based on the query string
        const filteredTweets = allTweets.filter(tweet => tweet.content.toLowerCase().includes(query.toLowerCase()));
        return filteredTweets;
    }


    async searchTweetsWithLimit(query: string, limitNumber: number): Promise<Tweet[]> {
        const tweetsRef = collection(db, 'tweets');
        const querySnapshot = await getDocs(tweetsRef);
        const allTweets = querySnapshot.docs.map(doc => doc.data() as Tweet);
        // Filter tweets based on the query string, then apply the limit
        const filteredTweets = allTweets.filter(tweet => tweet.content.toLowerCase().includes(query.toLowerCase())).slice(0, limitNumber);
        return filteredTweets;
    }


    async getTweetById(postId: string): Promise<Tweet | null> {
        console.log('postId', postId);
        const tweetDocRef = doc(db, 'tweets', postId);
        console.log('tweetDocRef', tweetDocRef);
        const tweetDoc = await getDoc(tweetDocRef);
        console.log('tweetDoc', tweetDoc);
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

    async getAllTweetsThatUserComments(userId: string): Promise<any[]> {
        // Use collectionGroup to query all comments across tweets made by the user
        const commentsRef = collectionGroup(db, 'userComments');
        const commentsQuery = firebaseQuery(commentsRef, where('userId', '==', userId));
        const commentSnapshots = await getDocs(commentsQuery);
        console.log(`Found ${commentSnapshots.docs.length} comments by the user.`);

        // Extract unique parentTweetIds from comments
        const uniqueTweetIds = new Set<string>();
        commentSnapshots.forEach(doc => {
            const commentData = doc.data();
            uniqueTweetIds.add(commentData.parentTweetId);
        });

        // Fetch each unique tweet
        const tweetsPromises = Array.from(uniqueTweetIds).map(async (tweetId) => {
            const tweetRef = doc(db, 'tweets', tweetId);
            const tweetDoc = await getDoc(tweetRef);
            return tweetDoc.exists() ? tweetDoc.data() : null;
        });

        // Resolve all tweet fetch promises
        const tweets = await Promise.all(tweetsPromises);

        // Filter out any null values (in case some tweets weren't found)
        return tweets.filter(tweet => tweet !== null);
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

    async isTweetRetweetedByUser(userId: string, tweetId: string): Promise<boolean> {
        // Implementation depends on your database schema
        throw new Error('Method not implemented.');
    }

    async isTweetCommentedByUser(userId: string, tweetId: string): Promise<boolean> {
        try {
            const commentsCollectionRef = collection(db, 'tweets', tweetId, 'comments');
            const querySnapshot = await getDocs(firebaseQuery(commentsCollectionRef, where('userId', '==', userId)));

            console.log(`Querying comments for tweetId: ${tweetId}, userId: ${userId}`);
            console.log(`Found ${querySnapshot.docs.length} comments by the user.`);

            querySnapshot.docs.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
            });

            return !querySnapshot.empty;
        } catch (error: any) {
            console.error('Error checking if user commented on tweet:', error);
            throw new Error(error.message);
        }
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



    async getTweetLikesCount(tweetId: string): Promise<number> {
        const tweetRef = doc(db, 'tweets', tweetId);
        const docSnap = await getDoc(tweetRef);
        if (docSnap.exists()) {
            const tweet = docSnap.data() as Tweet;
            return tweet.likes;
        }
        return 0;
    }


    async getAllCommentsByTweetId(tweetId: string): Promise<any[]> {
        const commentsRef = collection(db, 'tweets', tweetId, 'comments');
        // Query comments sorted by the 'createdAt' field in ascending order
        const q = firebaseQuery(commentsRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }


    async getAllCommentsByUserId(userId: string): Promise<any[]> {
        const commentsRef = collectionGroup(db, 'comments'); // Use collectionGroup to query across all 'comments' collections in the database
        const q = firebaseQuery(commentsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }


    getAllTweetsThatUserRetweets(userId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    getCommentById(replyId: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getHowManyCommentsByTweetId(tweetId: string): Promise<number> {
        const tweetRef = doc(db, 'tweets', tweetId);
        const docSnap = await getDoc(tweetRef);
        if (docSnap.exists()) {
            const tweet = docSnap.data() as Tweet;
            return tweet.comments;
        }
        return 0;
    }

}
