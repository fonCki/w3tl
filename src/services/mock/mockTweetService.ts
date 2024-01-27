// src/services/mockTweetService.ts
import tweetsMock from '@data/tweetsMock';
import commentsMock from '@data/repliesMock';
import userRelationsMock from '@data/userRelationsMock';
import { ITweetService } from '@interfaces/ITweetService';

export const mockTweetService: ITweetService = {
    async getTweetsByUserId(userId: string) {
        return tweetsMock.filter(tweet => tweet.user.id === userId);
    },

    async getTweetsByUserNickname(userNickname: string): Promise<any[]> {
        return tweetsMock.filter(tweet => tweet.user.username === userNickname);
    },

    async getAllTweets() {
        return tweetsMock;
    },

    async searchTweets(query: string) {
        return tweetsMock.filter(tweet => tweet.content.toLowerCase().includes(query.toLowerCase()));
    },

    async searchTweetsWithLimit(query: string, limit: number) {
        const tweets = tweetsMock.filter(tweet => tweet.content.toLowerCase().includes(query.toLowerCase()));
        return tweets.slice(0, limit);
    },

    async getTweetById(tweetId: string) {
        return tweetsMock.find(tweet => tweet.id === tweetId);
    },

    async getTweetsWithMedia() {
        return tweetsMock.filter(tweet => tweet.image || tweet.video);
    },

    async getAllTweetsThatUserLikes(userId: string) {
        const userRelation = userRelationsMock.find(relation => relation.id === userId);
        return userRelation ? tweetsMock.filter(tweet => userRelation.likedTweetIds.includes(tweet.id)) : [];
    },

    async getAllTweetsThatUserRetweets(userId: string) {
        const userRelation = userRelationsMock.find(relation => relation.id === userId);
        return userRelation ? tweetsMock.filter(tweet => userRelation.retweetedTweetIds.includes(tweet.id)) : [];
    },

    async getAllTweetsThatUserComments(userId: string) {
        const userRelation = userRelationsMock.find(relation => relation.id === userId);
        return userRelation ? tweetsMock.filter(tweet => commentsMock.some(comment => comment.user.id === userId && comment.parentTweetId === tweet.id)) : [];
    },

    async getAllTweetsThatUserHighlights(userId: string) {
        const userRelation = userRelationsMock.find(relation => relation.id === userId);
        return userRelation ? tweetsMock.filter(tweet => userRelation.highlightedTweetIds.includes(tweet.id)) : [];
    },

    async isTweetLikedByUser(tweetId: string, userId: string) {
        const userRelation = userRelationsMock.find(relation => relation.id === userId);
        return userRelation ? userRelation.likedTweetIds.includes(tweetId) : false;
    },

    async isTweetRetweetedByUser(tweetId: string, userId: string) {
        const userRelation = userRelationsMock.find(relation => relation.id === userId);
        return userRelation ? userRelation.retweetedTweetIds.includes(tweetId) : false;
    },

    async isTweetCommentedByUser(tweetId: string, userId: string) {
        const userRelation = userRelationsMock.find(relation => relation.id === userId);
        return userRelation ? commentsMock.some(comment => comment.user.id === userId && comment.parentTweetId === tweetId) : false;
    },

    async isTweetHighlightedByUser(tweetId: string, userId: string) {
        const userRelation = userRelationsMock.find(relation => relation.id === userId);
        return userRelation ? userRelation.highlightedTweetIds.includes(tweetId) : false;
    },

    async getReplyById(replyId: string) {
        return commentsMock.find(reply => reply.id === replyId);
    },

    async getAllRepliesByTweetId(tweetId: string) {
        return commentsMock.filter(reply => reply.parentTweetId === tweetId);
    },

    async getHowManyRepliesByTweetId(tweetId: string) {
        return commentsMock.filter(reply => reply.parentTweetId === tweetId).length;
    },

    async getAllRepliesByUserId(userId: string) {
        return commentsMock.filter(reply => reply.user.id === userId);
    }
};

