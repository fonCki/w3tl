import { ITweetService } from '@interfaces/ITweetService';

import { BACKEND_URL } from '@constants/constants';
import { Tweet } from '@models/post/tweet';
import { Comment } from '@models/post/comment';

export class OnionTweetService implements ITweetService {


    async getAllTweets(): Promise<Tweet[]> {
        const response = await this.fetchWithAuth('posts');
        const tweets = await response.json();
        return tweets.posts.map(this.mapTweet);
    }

    async getTweetsByUserId(userId: string): Promise<Tweet[]> {
        const response = await this.fetchWithAuth(`posts/user/id/${userId}`);
        const tweets = await response.json();
        return tweets.posts.map(this.mapTweet);
    }

    async getTweetsByUserNickname(userNickname: string): Promise<Tweet[]> {
        const response = await this.fetchWithAuth(`posts/user/username/${userNickname}`);
        const tweets = await response.json();
        return tweets.posts.map(this.mapTweet);
    }

    async getTweetById(postId: string): Promise<Tweet> {
        const response = await this.fetchWithAuth(`posts/${postId}`);
        const tweet = await response.json();
        return this.mapTweet(tweet.post);
    }

    async getAllTweetsThatUserComments(userId: string): Promise<Tweet[]> {
        return Promise.resolve([]);
    }

    async getAllTweetsThatUserHighlights(userId: string): Promise<Tweet[]> {
        const response = await this.fetchWithAuth(`user/${userId}/relations`);
        const relations = await response.json();
        const highlights = relations.interactions.highlightedTweetIds as string[];
        const tweets = highlights.map((tweetId: string) => this.getTweetById(tweetId));
        return Promise.all(tweets);
    }

    async getAllTweetsThatUserLikes(userId: string): Promise<Tweet[]> {
        const response = await this.fetchWithAuth(`user/${userId}/relations`);
        const relations = await response.json();
        const likes = relations.interactions.likedTweetIds as string[];
        const tweets = likes.map((tweetId: string) => this.getTweetById(tweetId));
        return Promise.all(tweets);

    }

    async getAllTweetsThatUserRetweets(userId: string): Promise<Tweet[]> {
        const response = await this.fetchWithAuth(`user/${userId}/relations`);
        const relations = await response.json();
        const retweets = relations.interactions.retweetedTweetIds as string[];
        const tweets = retweets.map((tweetId: string) => this.getTweetById(tweetId));
        return Promise.all(tweets);
    }

    async getTweetLikesCount(tweetId: string): Promise<number> {
        const tweet = await this.getTweetById(tweetId);
        return tweet.likes;
    }

    async getTweetsWithMedia(): Promise<Tweet[]> {
        return await this.getAllTweets().then(tweets => {
            return tweets.filter(tweet => tweet.mediaUrl !== null);
        });
    }

    async isTweetCommentedByUser(userId: string, tweetId: string): Promise<boolean> {
        return await this.getAllTweetsThatUserComments(userId)
            .then(tweets => tweets.some(tweet => tweet.postId === tweetId));
    }

    async isTweetHighlightedByUser(userId: string, tweetId: string): Promise<boolean> {
        return await this.getAllTweetsThatUserHighlights(userId)
            .then(tweets => tweets.some(tweet => tweet.postId === tweetId));
    }

    async isTweetLikedByUser(userId: string, tweetId: string): Promise<boolean> {
        return await this.getAllTweetsThatUserLikes(userId)
            .then(tweets => tweets.some(tweet => tweet.postId === tweetId));
    }

    async isTweetRetweetedByUser(userId: string, tweetId: string): Promise<boolean> {
        return await this.getAllTweetsThatUserRetweets(userId)
            .then(tweets => tweets.some(tweet => tweet.postId === tweetId));
    }

    async searchTweets(query: string): Promise<Tweet[]> {
        return Promise.resolve([]);
    }

    async searchTweetsWithLimit(query: string, limit: number): Promise<Tweet[]> {
        return Promise.resolve([]);
    }

    async getCommentById(replyId: string): Promise<any> {
        const response = await this.fetchWithAuth(`comments/${replyId}`);
        const comment = await response.json();
        return this.mapComment(comment);
    }

    async getAllCommentsByTweetId(tweetId: string): Promise<any[]> {
        const response = await this.fetchWithAuth(`comments/post/${tweetId}`);
        const comments = await response.json();
        return comments.comments.map(this.mapComment);
    }

    async getHowManyCommentsByTweetId(tweetId: string): Promise<number> {
        const response = await this.fetchWithAuth(`comments/post/count/${tweetId}`);
        const count = await response.json();
        //convert to number
        return parseInt(count.count);
    }

    async getAllCommentsByUserId(userId: string): Promise<any[]> {
        const response = await this.fetchWithAuth(`comments/user/${userId}`);
        const comments = await response.json();
        return comments.comments.map(this.mapComment);
    }

    private mapComment(responseData: any): any {
        if (responseData && responseData.createdAt) {
            const date = new Date(parseInt(responseData.createdAt) * 1000);
            responseData.createdAt = date.toISOString();
        }
        return responseData as Comment;
    }

    private async fetchWithAuth(endpoint: string): Promise<Response> {
        try {
            const response = await fetch(`${BACKEND_URL}/${endpoint}`, { method: 'GET' });
            if (!response.ok)
                throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
            return response;
        } catch (error) {
            console.error('Error fetching from', endpoint, error);
            throw error;
        }
    }

    private mapTweet(responseData: any): Tweet {
        if (responseData && responseData.createdAt) {
            const date = new Date(parseInt(responseData.createdAt) * 1000);
            responseData.createdAt = date.toISOString();
        }
        return responseData as Tweet;
    }

}